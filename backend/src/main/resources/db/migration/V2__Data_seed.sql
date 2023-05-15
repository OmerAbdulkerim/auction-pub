/* -- ADDRESS TABLE -- */

BEGIN;
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES(
          'Ulica zrtava genocida u Srebrenici 88',
          'Gradacac',
          '76250',
          'Bosnia and Herzegovina',
          'Federation of Bosnia and Herzegovina'
      );
INSERT INTO dev.address(street, city, zip_code, country)
VALUES(
          'Northants',
          'Brackley',
          'NN13 7BD',
          'United Kingdom'
      );
INSERT INTO dev.address(street, city, zip_code, country)
VALUES(
          'Bradbourne Drive',
          'Milton Keynes',
          'MK7 8BJ',
          'United Kingdom'
      );
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES(
          'Random generic st.',
          'City Town',
          '12345',
          'United States',
          'California'
      );
INSERT INTO dev.address(street, city, zip_code, country)
VALUES('24 Almond Avenue',
       'Perth',
       '2287',
       'Australia'
      );
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES('254 Clark Rd',
       'Monticello',
       '32344',
       'United States',
       'Florida'
      );
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES(
          '124-02 Roosevelt Ave',
          'New York',
          'NY 11368',
          'United States',
          'New York'
      );
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES(
          '750 5th Avenue and Central Park South',
          'New York',
          'NY 10019',
          'United States',
          'New York'
      );
INSERT INTO dev.address(street, city, zip_code, country, state)
VALUES(
          '6400 Oak Canyon, Suite 100',
          'Irvine',
          'CA 92618',
          'United States',
          'California'
      );
INSERT INTO dev.address(street, city, zip_code, country)
VALUES(
          'Narodni trg',
          'Split',
          '21000',
          'Croatia'
      );
SELECT * FROM dev.address;
COMMIT;



/* -- CARD TABLE -- */

BEGIN;
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Omer Mehanovic',
           '1234567812345678',
           100,
           12,
           2023
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Lewis Hamilton',
           '8765432187654321',
           321,
           1,
           2025
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Max Verstappen',
           '5525809891494568',
           873,
           3,
           2024
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'John Doe',
           '4929687783321510',
           446,
           12,
           2022
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Serena Williams',
           '348831589994671',
           756,
           8,
           2024
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Jessica Chastain',
           '5582853349709433',
           912,
           6,
           2025
       );
INSERT INTO dev.card(card_holder, card_number, cvv, expiration_month, expiration_year)
VALUES (
           'Blanka Vlasic',
           '4716685961011025',
           577,
           2,
           2026
       );
SELECT * FROM dev.card;
COMMIT;


/* -- PERMISSION TABLE -- */

BEGIN;
INSERT INTO dev.permission(description, permission_name)
VALUES (
           'Grants users full admin access over the panels.',
           'Full Access'
       );
INSERT INTO dev.permission(description, permission_name)
VALUES (
           'Allows users edit own personal information and items.',
           'Edit Own'
       );
INSERT INTO dev.permission(description, permission_name)
VALUES (
           'Allows users to add items.',
           'Add Item'
       );
INSERT INTO dev.permission(description, permission_name)
VALUES (
           'Allows users to add more images than initial limit.',
           'Bypass Picture Limit'
       );
INSERT INTO dev.permission(description, permission_name)
VALUES (
           'Allows users to view contact information of other users.',
           'View Contact Information'
       );
SELECT * FROM dev.permission;
COMMIT;



/** -- ROLE TABLE -- */

BEGIN;
INSERT INTO dev.role(role_name) VALUES ('Administrator');
INSERT INTO dev.role(role_name) VALUES ('User');
INSERT INTO dev.role(role_name) VALUES ('Trusted Seller');
INSERT INTO dev.role(role_name) VALUES ('Verified Shop');
SELECT * FROM dev.role;
COMMIT;



/* -- ROLE_PERMISSION TABLE -- */

BEGIN;
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Full Access'),
          (SELECT id FROM dev.role WHERE role_name = 'Administrator')
      );
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Edit Own'),
          (SELECT id FROM dev.role WHERE role_name = 'User')
      );
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Add Item'),
          (SELECT id FROM dev.role WHERE role_name = 'User')
      );
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Add Item'),
          (SELECT id FROM dev.role WHERE role_name = 'Trusted Seller')
      );
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Edit Own'),
          (SELECT id FROM dev.role WHERE role_name = 'Trusted Seller')
      );
INSERT INTO dev.role_permission(permission_id, role_id)
VALUES(
          (SELECT id FROM dev.permission WHERE permission_name = 'Bypass Picture Limit'),
          (SELECT id FROM dev.role WHERE role_name = 'Trusted Seller')
      );
SELECT * FROM dev.role_permission;
COMMIT;



/*  -- USER TABLE -- */

BEGIN;
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'SalkoBrat',
          'Omer',
          'Mehanovic',
          'oamehanovic@gmail.com',
          'pgadmin',
          '387-60-331-6459'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'SerLewis',
          'Lewis',
          'Hamilton',
          'lh44@f1-merc-amg.com',
          'somepassword',
          '077-5186-2681'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'SuperMaxx',
          'Max',
          'Verstappen',
          'supermax33@red-bull-racing.com',
          'dutchboi',
          '06-32226398'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'TopSeller',
          'John',
          'Doe',
          'imaverage@forreal.com',
          'nolifer',
          '08031-43-01-65'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'HoneyBadger',
          'Daniel',
          'Ricciardo',
          'dannyricf1@uncertainfuture.com',
          'downunder',
          '03-6256-8706'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'unknown',
          'Jane',
          'Doe',
          'plainjane@gmail.com',
          'drowssap',
          '650-838-4764'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'TennisLover',
          'Serena',
          'Williams',
          'alltimegreat@tennis.com',
          '_racket',
          '231-758-3043'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'Queen_Red',
          'Jessica',
          'Chastain',
          'redridinghood@hollywood.com',
          'mollyplaysgames',
          '407-408-2704'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'BlueHedgehog',
          'Sonic',
          'Hedgehog',
          'spikeyblue@sega.com',
          'gottagofast_123',
          '917-661-9564'
      );
INSERT INTO dev."user"(username, first_name, last_name, email, password, phone_number)
VALUES(
          'ha_skoc',
          'Blanka',
          'Vlasic',
          'blanka.vlasic@skok.com',
          '208isthenumber',
          '031-20-27-70'
      );
SELECT * FROM dev."user";
COMMIT;



/** -- USER_ROLE TABLE -- */

BEGIN;
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'Administrator'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'SerLewis')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'Trusted Seller'),
          (SELECT id FROM dev."user" WHERE username = 'SerLewis')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'SuperMaxx')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'HoneyBadger')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'Trusted Seller'),
          (SELECT id FROM dev."user" WHERE username = 'HoneyBadger')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'TopSeller')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'unknown')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'TennisLover')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'Queen_Red')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'BlueHedgehog')
      );
INSERT INTO dev.user_role(role_id, user_id)
VALUES(
          (SELECT id FROM dev.role WHERE role_name = 'User'),
          (SELECT id FROM dev."user" WHERE username = 'ha_skoc')
      );
SELECT * FROM dev.user_role;
COMMIT;



/* -- CATEGORY TABLE -- */

BEGIN;
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Fashion',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Accessories',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Jewelry',
           (SELECT id FROM dev.category WHERE category_name = 'Accessories')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Electronics',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Mobile',
           (SELECT id FROM dev.category WHERE category_name = 'Electronics')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Computers',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Sportswear',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Men',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Women',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Kids',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Home',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Art',
           NULL
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Bed & Bath',
           (SELECT id FROM dev.category WHERE category_name = 'Home')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Bags',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Bags',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Bags',
           (SELECT id FROM dev.category WHERE category_name = 'Kids')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Swimsuits',
           (SELECT id FROM dev.category WHERE category_name = 'Sportswear')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Swimsuits',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Swimsuits',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Shoes',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Shoes',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Shoes',
           (SELECT id FROM dev.category WHERE category_name = 'Sportswear')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'T-Shirts',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'T-Shirts',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'T-Shirts',
           (SELECT id FROM dev.category WHERE category_name = 'Kids')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Clothes',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Clothes',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Clothes',
           (SELECT id FROM dev.category WHERE category_name = 'Kids')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'T-Shirts',
           (SELECT id FROM dev.category WHERE category_name = 'Sportswear')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Toys',
           (SELECT id FROM dev.category WHERE category_name = 'Kids')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Accessories',
           (SELECT id FROM dev.category WHERE category_name = 'Men')
       );
INSERT INTO dev.category(category_name, parent_id)
VALUES (
           'Accessories',
           (SELECT id FROM dev.category WHERE category_name = 'Women')
       );
SELECT * FROM dev.category;
COMMIT;



/* -- PRODUCT TABLE -- */

BEGIN;
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Clothes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Women' AND parent_id IS NULL )),
           (SELECT id FROM dev."user" WHERE first_name = 'Omer'),
           'BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats',
           56.00,
           'Note: The Jackets is US standard size, Please choose size as your usual wear
           Material: 100% Polyester Detachable Liner Fabric: Warm Fleece. Detachable
           Functional Liner: Skin Friendly, Lightweigt and Warm.
           Stand Collar Liner jacket, keep you warm in cold weather.
           Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.
           Zippered Hand Pockets and Hidden Pocket keep your things secure.
           Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit.
           3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates.',
           'Small',
           'Blue'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Shoes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Lewis'),
           'New Balance Shoe',
           63.00,
           'Extremely comfortable and very stylish looking shoe.',
           '43',
           'Brown'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Jewelry' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Max'),
           'Bracelet',
           22.00,
           'Accesorise with these stylish looking, unisex and one size fits most bracelets.',
           'Medium',
           'Blue'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Bed & Bath' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Home' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'John'),
           'Stone Tile Cutter',
           234.99,
           'Brand new BRANDED stone tile cutter. Max tile size: 60cm. Can cut through up to 10cm thick tiles.',
           'Green'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Jewelry' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Daniel'),
           'Paper Bag', 25.00,
           'Show that you care about the environment and the koalas by purchasing this trendy paper bag.',
           'Large',
           'Beige'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Bags' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Women' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Jane'),
           'White LV Bag',
           500.00,
           'Original LV bag. White in color with black accents. Practical enough for everyday but it really shines as an eye catching accessory.',
           'Small',
           'White'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Toys' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Kids' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Serena'),
           'Kitchen Set',
           125.50,
           'Have your kid be immersed in hours of play with this cool set.'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Shoes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Jessica'),
           'Shoe Collection',
           400.25,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Shoes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Lewis'),
           'Formal Bugatti Shoe',
           199.90,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           '44',
           'Black'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Shoes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Lewis'),
           'Running Shoes',
           149.99,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           '43.5',
           'Green'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Shoes' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Women' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Lewis'),
           'Running Shoe',
           149.99,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           '35',
           'Green'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'T-Shirts' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Women' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Blanka'),
           'Womens T-Shirt',
           11.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'Small',
           'White'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Daniel'),
           'Large Warhammer',
           99.99,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'Large',
           'Gray'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Toys' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Kids' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Daniel'),
           'Kangaroo Plushie', 30.00,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.',
           'Medium',
           'Gray'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Toys' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Kids' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Serena'),
           'Wilson Tennis Racket',
           125.50,
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst.'
       );
INSERT INTO dev.product(subcategory_id, user_id, product_name, price, description, size, color)
VALUES (
           (SELECT id FROM dev.category WHERE category_name = 'Accessories' AND parent_id = (SELECT id FROM dev.category WHERE category_name = 'Men' AND parent_id IS NULL)),
           (SELECT id FROM dev."user" WHERE first_name = 'Jessica'),
           'Paper Bag XL', 35.00,
           'Show that you care about the environment and the koalas by purchasing this trendy paper bag.',
           'Extra Large',
           'Beige'
       );
SELECT * FROM dev.product;
COMMIT;



/* -- PRODUCT_AUCTION TABLE -- */

BEGIN;
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
           (LOCALTIMESTAMP - INTERVAL '1 day'),
           (LOCALTIMESTAMP + INTERVAL '2 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Wilson Tennis Racket'),
           LOCALTIMESTAMP,
           (LOCALTIMESTAMP + INTERVAL '2 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Kangaroo Plushie'),
           (LOCALTIMESTAMP - INTERVAL '3 days'),
           (LOCALTIMESTAMP + INTERVAL '7 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Large Warhammer'),
           (LOCALTIMESTAMP - INTERVAL '7 days'),
           (LOCALTIMESTAMP + INTERVAL '14 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Womens T-Shirt'),
           (LOCALTIMESTAMP - INTERVAL '7 days 4 hours'),
           (LOCALTIMESTAMP + INTERVAL '14 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Running Shoe'),
           (LOCALTIMESTAMP - INTERVAL '7 days 5 hours'),
           (LOCALTIMESTAMP + INTERVAL '10 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Running Shoes'),
           (LOCALTIMESTAMP - INTERVAL '7 days 15 hours'),
           (LOCALTIMESTAMP + INTERVAL '8 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Formal Bugatti Shoe'),
           (LOCALTIMESTAMP - INTERVAL '7 days 1 hour'),
           (LOCALTIMESTAMP + INTERVAL '4 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Shoe Collection'),
           (LOCALTIMESTAMP - INTERVAL '7 days 50 minutes'),
           (LOCALTIMESTAMP + INTERVAL '10 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats'),
           (LOCALTIMESTAMP - INTERVAL '7 days 5 minutes'),
           (LOCALTIMESTAMP + INTERVAL '11 days 25 minutes')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Kitchen Set'),
           (LOCALTIMESTAMP - INTERVAL '6 days 5 hours'),
           (LOCALTIMESTAMP + INTERVAL '14 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'White LV Bag'),
           (LOCALTIMESTAMP - INTERVAL '7 days 5 hours'),
           (LOCALTIMESTAMP + INTERVAL '10 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Paper Bag'),
           (LOCALTIMESTAMP - INTERVAL '7 days 5 hours'),
           (LOCALTIMESTAMP + INTERVAL '10 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Bracelet'),
           (LOCALTIMESTAMP - INTERVAL '2 days 2 hours'),
           (LOCALTIMESTAMP + INTERVAL '7 days')
       );
INSERT INTO dev.product_auction(product_id, start_date, end_date)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Stone Tile Cutter'),
           (LOCALTIMESTAMP - INTERVAL '14 days 2 hours'),
           (LOCALTIMESTAMP - INTERVAL '2 days 20 minutes')
       );
SELECT * FROM dev.product_auction;
COMMIT;



/* -- ORDER TABLE -- */

BEGIN;
INSERT INTO dev.order(product_id, user_id, order_address_id, order_email, order_status, order_timestamp)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Stone Tile Cutter'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat'),
          (SELECT id FROM dev.address WHERE city = 'Gradacac'),
          (SELECT email FROM dev."user" WHERE username = 'SalkoBrat'),
          'CREATED',
          (LOCALTIMESTAMP - INTERVAL '2 days 10 minutes')
      );
SELECT * FROM dev.order;
COMMIT;



/* -- BID TABLE -- */

BEGIN;
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
SELECT * FROM dev.bid;
COMMIT;



/* -- WISHLIST TABLE -- */

BEGIN;
INSERT INTO dev.wishlist(product_id, user_id)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat')
      );
INSERT INTO dev.wishlist(product_id, user_id)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Kangaroo Plushie'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat')
      );
INSERT INTO dev.wishlist(product_id, user_id)
VALUES(
          (SELECT id FROM dev.product WHERE product_name = 'Large Warhammer'),
          (SELECT id FROM dev."user" WHERE username = 'SalkoBrat')
      );
SELECT * FROM dev.wishlist;
COMMIT;



/* -- IMAGE TABLE -- */

BEGIN;
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Running Shoes'),
           'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Running Shoe'),
           'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Womens T-Shirt'),
           'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats'),
           'https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'New Balance Shoe'),
           'https://images.pexels.com/photos/4932841/pexels-photo-4932841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Bracelet'),
           'https://images.pexels.com/photos/553236/pexels-photo-553236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Stone Tile Cutter'),
           'https://images.pexels.com/photos/7794425/pexels-photo-7794425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Paper Bag'),
           'https://images.pexels.com/photos/3987245/pexels-photo-3987245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'White LV Bag'),
           'https://images.pexels.com/photos/3689164/pexels-photo-3689164.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Kitchen Set'),
           'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Shoe Collection'),
           'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Shoe Collection'),
           'https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Shoe Collection'),
           'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Running Shoes'),
           'https://images.pexels.com/photos/3306490/pexels-photo-3306490.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Womens T-Shirt'),
           'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Large Warhammer'),
           'https://images.pexels.com/photos/909256/pexels-photo-909256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Kangaroo Plushie'),
           'https://images.pexels.com/photos/4260837/pexels-photo-4260837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Wilson Tennis Racket'),
           'https://images.pexels.com/photos/2996254/pexels-photo-2996254.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Paper Bag XL'),
           'https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );
SELECT * FROM dev.product_image;
COMMIT;


