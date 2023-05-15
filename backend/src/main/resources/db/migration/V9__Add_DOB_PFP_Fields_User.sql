BEGIN;

ALTER TABLE dev."user"
    ADD COLUMN date_of_birth TEXT,
    ADD COLUMN profile_picture_url TEXT;

COMMIT;
