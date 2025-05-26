CREATE TABLE "meteorite_landing" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"datasetId" integer NOT NULL,
	"name" varchar NOT NULL,
	"nametype" varchar,
	"recclass" varchar,
	"mass" varchar,
	"fall" varchar,
	"year" varchar,
	"reclat" varchar,
	"reclong" varchar,
	"geolocation" varchar
);
