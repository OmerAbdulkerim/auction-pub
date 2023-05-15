BEGIN;


CREATE TABLE IF NOT EXISTS dev.refresh_token
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    token UUID NOT NULL,
    expiry_date timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS dev.refresh_token
    ADD CONSTRAINT refresh_token_user_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID;

UPDATE dev."user" SET password = '$2a$10$qdeuTaKBRIoadj9TGk6G5eoTC6B.6tVmxXzZ0zTcwD.9/e82mccCG' WHERE email = 'oamehanovic@gmail.com';
UPDATE dev."user" SET password = '$2a$10$v7mZuvrWA854OmJXQONFr.coT7DUcA8d9w7ibFtrPlFRcnp4UZlu2' WHERE email = 'lh44@f1-merc-amg.com';
UPDATE dev."user" SET password = '$2a$10$liha1poGgVtaXqfuIPpJbuCWOF76WkucVESYuWcMiSTncT5sO3/da' WHERE email = 'supermax33@red-bull-racing.com';
UPDATE dev."user" SET password = '$2a$10$8RbBHTeF/qidVTzpz2NRdOKLd.NO7xr/e818zL8WDaen982blbGxK' WHERE email = 'imaverage@forreal.com';
UPDATE dev."user" SET password = '$2a$10$r/x9nV4eUyzUDA0JTYjab.ZCX4C3LZoP1pB.IsX9RqGz3P5ivirc6' WHERE email = 'dannyricf1@uncertainfuture.com';
UPDATE dev."user" SET password = '$2a$10$l.UJi.6cUNdJBOdBgrAdfufC8FNztHnwF1rU/V51.S9.lTrxt7rO6' WHERE email = 'plainjane@gmail.com';
UPDATE dev."user" SET password = '$2a$10$gOuSJTKXXWvxHm2Dd8tWtu2GArTkI9ifPC72bs4Exxo4316qwpF86' WHERE email = 'alltimegreat@tennis.com';
UPDATE dev."user" SET password = '$2a$10$ZT2bs4be5JTBd2AcHb.kYOBObw3KZqMSNX/JSpO2jsgkUquAcTTDy' WHERE email = 'redridinghood@hollywood.com';
UPDATE dev."user" SET password = '$2a$10$wr2YDimJMzpbaMUBk7pmjOdGTY0Dd1nHCSHgAd0zeu9EQemdOr5u6' WHERE email = 'blanka.vlasic@skok.com';

COMMIT;
