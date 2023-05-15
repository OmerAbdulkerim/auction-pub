BEGIN;

ALTER TABLE dev.bid
    DROP COLUMN created_timestamp;

ALTER TABLE dev.bid
    ADD created_timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (now() AT TIME ZONE 'UTC');

DELETE FROM dev.bid;

INSERT INTO dev.bid(product_id, user_id, price, created_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat'),
          35.50,
          (LOCALTIMESTAMP - INTERVAL '2 hours 13 minutes')
      );
INSERT INTO dev.bid(product_id, user_id, price, created_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
          (SELECT id FROM dev."user" WHERE username = 'TennisLover'),
          36.00,
          (LOCALTIMESTAMP - INTERVAL '1 hour 34 minutes')
      );
INSERT INTO dev.bid(product_id, user_id, price, created_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
          (SELECT id FROM dev."user" WHERE username = 'SerLewis'),
          37.00,
          (LOCALTIMESTAMP - INTERVAL '1 hour 15 minutes')
      );
INSERT INTO dev.bid(product_id, user_id, price, created_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
          (SELECT id FROM dev."user" WHERE username = 'SuperMaxx'),
          39.50,
          (LOCALTIMESTAMP - INTERVAL '1 hour')
      );
INSERT INTO dev.bid(product_id, user_id, price, created_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Kangaroo Plushie'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat'),
          35.00, LOCALTIMESTAMP
      );

COMMIT;
