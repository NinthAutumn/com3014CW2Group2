CREATE TYPE "gender" AS ENUM (
  'male',
  'female',
  'others'
);

CREATE TYPE "user_pet_status" AS ENUM (
  'adopted',
  'pending',
  'not_approved',
  'dropped'
);

CREATE TABLE "users" (
  "id" int8 PRIMARY KEY,
  "email" varchar,
  "password" varchar,
  "phone_number" varchar,
  "gender" gender_enum,
  "created_at" timestamptz,
  "updated_at" timestamptz,
  "longtitude" numeric,
  "latitude" numeric
);

CREATE TABLE "user_shelters" (
  "shelter_id" int,
  "user_id" int
);

CREATE TABLE "shelters" (
  "id" int8 PRIMARY KEY,
  "name" varchar,
  "description" text,
  "email" varchar,
  "phone_number" varchar,
  "longtitude" numeric,
  "latitude" numeric,
  "address_id" int,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "addresses" (
  "id" int8 PRIMARY KEY,
  "city" varchar,
  "town" varchar,
  "line_one" varchar,
  "line_two" varchar,
  "province" varchar,
  "post_code" varchar,
  "longtitude" numeric,
  "latitude" numeric,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "pets" (
  "id" int8 PRIMARY KEY,
  "name" varchar,
  "description" text,
  "age" int,
  "troubling_history" bool,
  "animal_type" varchar,
  "animal_category" varchar,
  "male_only" bool,
  "female_only" bool,
  "inspection_required" bool,
  "shelter_id" int8,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "shelter_pets" (
  "pet_id" int,
  "shelter_id" int
);

CREATE TABLE "user_pets" (
  "id" int8 PRIMARY KEY,
  "pet_id" int8,
  "user_id" int,
  "rejected" bool,
  "status" user_pet_status,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "user_pets_chats" (
  "user_pets_id" int,
  "user_id" int8,
  "shelter_id" int8,
  "message" text,
  "created_at" timestamptz
);

ALTER TABLE "user_shelters" ADD FOREIGN KEY ("shelter_id") REFERENCES "shelters" ("id");

ALTER TABLE "user_shelters" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "shelters" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");

ALTER TABLE "pets" ADD FOREIGN KEY ("shelter_id") REFERENCES "pets" ("id");

ALTER TABLE "shelter_pets" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

ALTER TABLE "shelter_pets" ADD FOREIGN KEY ("shelter_id") REFERENCES "shelters" ("id");

ALTER TABLE "user_pets" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

ALTER TABLE "user_pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_pets_chats" ADD FOREIGN KEY ("user_pets_id") REFERENCES "user_pets" ("id");

ALTER TABLE "user_pets_chats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_pets_chats" ADD FOREIGN KEY ("shelter_id") REFERENCES "shelters" ("id");