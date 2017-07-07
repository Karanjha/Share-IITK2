CREATE TABLE "resources" (
	"MD5"		VARCHAR NOT NULL,
	"User"		VARCHAR NOT NULL,
	"Course"	VARCHAR NOT NULL,
	"Year"		VARCHAR,
	"Sem"		INTEGER,
	"Id"		BIGSERIAL,
	"Res_Type"	VARCHAR,
	"Path"		VARCHAR
	);
