BEGIN;

INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'New Balance Shoe'),
           (LOCALTIMESTAMP - INTERVAL '1 day'),
           (LOCALTIMESTAMP + INTERVAL '2 days')
       );

COMMIT;
