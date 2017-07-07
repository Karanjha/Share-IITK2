package models

import slick.jdbc.PostgresProfile.api._
//import slick.driver.PostgresDriver.api._

	final case class Resource(
		MD5: String,
		User: String,
		Course: String,
		Year: String,
		Sem: Int,
		Id: Long,
		Res_Type: String,
		Path: String)

	final class ResourceTable(tag: Tag) extends Table[Resource](tag, "resources") {

		def MD5			= column[String]("MD5", O.PrimaryKey)
		def User		= column[String]("User")
		def Course		= column[String]("Course")
		def Year		= column[String]("Year")
		def Sem 		= column[Int]("Sem")
		def Id			= column[Long]("Id", O.AutoInc)
		def Res_Type	= column[String]("Res_Type")
		def Path		= column[String]("Path")

		def * = (MD5, User, Course, Year, Sem, Id, Res_Type, Path).mapTo[Resource]
	}
