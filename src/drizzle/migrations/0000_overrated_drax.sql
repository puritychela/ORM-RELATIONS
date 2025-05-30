CREATE TABLE "car" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" varchar(255),
	"manufacturer" varchar(255),
	"year" integer,
	"color" varchar(100),
	"rental_rate" numeric(10, 2),
	"availability" boolean
);
