import models._
import DAO.Base._
import utils.MigrationConfig

import java.util.UUID
import java.security.{MessageDigest, DigestInputStream}
import java.io.{File, FileInputStream, FileOutputStream}
import java.nio.file.{Files, Path, StandardCopyOption}

import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.util.ByteString
import spray.json.DefaultJsonProtocol
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._
import SprayJsonSupport._


import akka.actor.ActorSystem
//import akka.http.scaladsl.Http._
import akka.http.scaladsl._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.server.Route
import akka.stream.scaladsl._
import akka.stream.scaladsl.Flow
import akka.stream.scaladsl.Source
import akka.http.scaladsl.model._
import akka.stream.scaladsl._
import HttpMethods._
import scala.concurrent.duration.Duration

import scala.concurrent.ExecutionContext
import scala.concurrent.{Await, Future}



trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val resourceFormat = jsonFormat8(Resource)
}


object Main extends App with JsonSupport with MigrationConfig {
  private implicit val system = ActorSystem()
  protected implicit val executor: ExecutionContext = system.dispatcher
  //protected val log: LoggingAdapter = Logging(system, getClass)
  protected implicit val materializer: ActorMaterializer = ActorMaterializer()


  def processFile(filePath: String, fileData: Multipart.FormData) = {
    val fileOutput = new FileOutputStream(filePath)
    fileData.parts.mapAsync(1) { bodyPart ⇒
      def writeFileOnLocal(array: Array[Byte], byteString: ByteString): Array[Byte] = {
        val byteArray: Array[Byte] = byteString.toArray
        fileOutput.write(byteArray)
        array ++ byteArray
      }
      bodyPart.entity.dataBytes.runFold(Array[Byte]())(writeFileOnLocal)
    }.runFold(0)(_ + _.length)
  }

  def computeHash(path: String): String = {
    val buffer = new Array[Byte](8192)
    val md5 = MessageDigest.getInstance("MD5")

    val dis = new DigestInputStream(new FileInputStream(new File(path)), md5)
    try { while (dis.read(buffer) != -1) { } } finally { dis.close() }
        
    md5.digest.map("%02x".format(_)).mkString
  }
  def deleteFile(path: String) = {
    val fileTemp = new File(path)
    if (fileTemp.exists) {
      fileTemp.delete()
    }
  }
  val route = 
		/* File should be first uploaded to a temporary folder and its md5 should be checked. If it exists, then file 
		should be discarded. Otherwise it should be uploaded to main folder with name as md5. And response should be sent 
		to client giving the file name and file path. And then another POST should be handled(giving the meta data). It has 
		to be implemented. 
		*/

	  pathPrefix("resources") {
			
	    path("upload") {
		  (post & entity(as[Multipart.FormData])) { formData => 
			//val actualFileName = formData.filename
			complete {
			  val fileName = UUID.randomUUID().toString
	          val temp = System.getProperty("java.io.tmpdir")
              val fileDir =  "/home/aps/uploadedFiles/"
	          val filePath = fileDir + fileName
	          processFile(filePath,formData).map { fileSize =>
                val md5_hash = computeHash(filePath)
                val check = checkIfMD5exists(md5_hash)
                val check1 = Await.result(check, Duration.Inf) 
                if(check1 == true) {
                  deleteFile(filePath)
                  HttpResponse(StatusCodes.OK, entity = s"File is already uploaded")
                }
                else {
                  val newPath = "/home/aps/uploadedFiles/MainFiles/" + md5_hash + "/"
                  var a = new File(filePath).toPath
                  var b = new File(newPath).toPath
                  Files.move(a,b,StandardCopyOption.REPLACE_EXISTING)
                  //new File(newPath+fileName,newPath+md5_hash)
                  //val finalPath = newPath+md5_hash
                  HttpResponse(StatusCodes.OK, entity = s"File successfully uploaded. File size is $fileSize. Path is $newPath")
                        
                }
	          }
            }
		  }
		} ~ 
		path("upload") {
		  (post & entity(as[Resource]) ) { resource =>
			complete {
			  create(resource).map(_.toJson)
			}
		  }
        } ~
		path("search") {
		  (get)  {
			print("Request received")
			complete {
			  returnWhole.map(_.toJson)

			}
		  }
		} ~
		path("download") {
          (get ) {
            parameters('fileMD5) { fileMD5  =>
                  
			  complete {
                val file1 = new File("/home/aps/uploadedFiles/MainFiles/"+fileMD5)
			    HttpEntity(MediaTypes.`application/octet-stream`, file1.length, FileIO.fromFile(file1, chunkSize = 100000))
              }
            }
		  }
	    }
      }
	reloadSchema()
	Http().bindAndHandle(route, interface = "localhost", port = 8080)
}
