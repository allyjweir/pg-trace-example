CREATE TABLE IF NOT EXISTS "example_table" (
    "foo" varchar(30) NOT NULL,
    "bar" varchar(30) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);