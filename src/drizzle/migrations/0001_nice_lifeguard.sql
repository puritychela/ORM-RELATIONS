CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"email" varchar(255),
	"phone_number" varchar(20),
	"address" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"rental_id" integer,
	"payment_date" date,
	"amount" numeric(10, 2),
	"payment_method" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "rental" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer,
	"customer_id" integer,
	"rental_start_date" date,
	"rental_end_date" date,
	"total_amount" numeric(10, 2)
);
--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_rental_id_rental_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rental"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental" ADD CONSTRAINT "rental_car_id_car_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental" ADD CONSTRAINT "rental_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;