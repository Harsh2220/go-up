-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "auth_id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "image" VARCHAR,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "image" VARCHAR,
    "user_id" VARCHAR,
    "github" VARCHAR,
    "link" VARCHAR,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "comment" VARCHAR NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "project_id" UUID,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_auth_id_key" ON "profile"("auth_id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("auth_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
