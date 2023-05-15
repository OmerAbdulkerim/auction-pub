INSERT INTO dev.category (category_name, parent_id)
VALUES ('Accessories', (SELECT id FROM dev.category WHERE category_name = 'Fashion' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Belts', (SELECT id FROM dev.category WHERE category_name = 'Fashion' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Scarves', (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Gloves', (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Microwaves', (SELECT id FROM dev.category WHERE category_name = 'Electronics' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('TVs', (SELECT id FROM dev.category WHERE category_name = 'Electronics' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Laptops', (SELECT id FROM dev.category WHERE category_name = 'Computers' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Monitors', (SELECT id FROM dev.category WHERE category_name = 'Computers' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Tiles', (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Carpets', (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Tables', (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Chandeliers', (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('NFTs', (SELECT id FROM dev.category WHERE category_name = 'Art' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Digital', (SELECT id FROM dev.category WHERE category_name = 'Art' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Paintings', (SELECT id FROM dev.category WHERE category_name = 'Art' AND parent_id IS NULL));

INSERT INTO dev.category (category_name, parent_id)
VALUES ('Sculptures', (SELECT id FROM dev.category WHERE category_name = 'Art' AND parent_id IS NULL ));
