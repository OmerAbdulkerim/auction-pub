BEGIN;
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Laptops' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Computers' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Jessica'),
           'Touch Navigation',
           231.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           '9"',
           'White'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Touch Navigation'),
           'https://images.pexels.com/photos/38271/ipad-map-tablet-internet-38271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Touch Navigation'),
           'https://images.pexels.com/photos/35969/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Touch Navigation'),
           (LOCALTIMESTAMP - INTERVAL '1 day'),
           (LOCALTIMESTAMP + INTERVAL '33 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Tables' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL) LIMIT 1),
           (SELECT id FROM dev."user" WHERE first_name = 'Jessica'),
           'Coffee',
           15.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'XL',
           'White'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Coffee'),
           'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Coffee'),
           'https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Coffee'),
           'https://images.pexels.com/photos/885021/pexels-photo-885021.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Coffee'),
           'https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Coffee'),
           (LOCALTIMESTAMP + INTERVAL '3 days'),
           (LOCALTIMESTAMP + INTERVAL '23 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Clothes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL) LIMIT 1),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Clothes Collection',
           125.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'L',
           'White'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Clothes Collection'),
           'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Clothes Collection'),
           'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Clothes Collection'),
           (LOCALTIMESTAMP - INTERVAL '2 days'),
           (LOCALTIMESTAMP + INTERVAL '65 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Sculptures' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Art' AND parent_id IS NULL) LIMIT 1),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Sculpture',
           125.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'L',
           'Gray'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Sculpture'),
           'https://images.pexels.com/photos/52718/angel-wings-love-white-52718.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Sculpture'),
           (LOCALTIMESTAMP - INTERVAL '2 days 10 hours'),
           (LOCALTIMESTAMP + INTERVAL '65 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'T-Shirts' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Various T-Shirts',
           34.50,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'L',
           'Gray'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Various T-Shirts'),
           'https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Various T-Shirts'),
           'https://images.pexels.com/photos/2112648/pexels-photo-2112648.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Various T-Shirts'),
           'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Various T-Shirts'),
           (LOCALTIMESTAMP - INTERVAL '10 hours'),
           (LOCALTIMESTAMP + INTERVAL '44 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Swimsuits' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Swimming Shorts',
           45.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'L',
           'Black'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Swimming Shorts'),
           'https://images.pexels.com/photos/2412715/pexels-photo-2412715.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Swimming Shorts'),
           'https://images.pexels.com/photos/1402299/pexels-photo-1402299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Swimming Shorts'),
           (LOCALTIMESTAMP + INTERVAL '11 hours'),
           (LOCALTIMESTAMP + INTERVAL '44 days')
       );

INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Bags' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Mens Bag',
           89.99,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'L',
           'Black'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Mens Bag'),
           'https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Mens Bag'),
           'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Mens Bag'),
           (LOCALTIMESTAMP + INTERVAL '11 hours'),
           (LOCALTIMESTAMP + INTERVAL '44 days')
       );

COMMIT;
