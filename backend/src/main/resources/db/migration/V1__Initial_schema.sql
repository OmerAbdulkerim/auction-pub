BEGIN;

CREATE SCHEMA IF NOT EXISTS dev;

CREATE TABLE IF NOT EXISTS dev."user"
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT,
    shipping_address_id uuid,
    card_id uuid,
    PRIMARY KEY (id),
    CONSTRAINT username UNIQUE (username),
    CONSTRAINT email UNIQUE (email),
    CONSTRAINT phone_number UNIQUE (phone_number)
);

CREATE TABLE IF NOT EXISTS dev.card
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    card_holder TEXT NOT NULL,
    card_number TEXT NOT NULL,
    cvv integer NOT NULL,
    expiration_month integer NOT NULL,
    expiration_year integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (card_number)
);

CREATE TABLE IF NOT EXISTS dev.address
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dev."order"
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    order_address_id uuid NOT NULL,
    order_email TEXT,
    order_status TEXT NOT NULL,
    order_timestamp timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dev.product
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    product_name TEXT NOT NULL,
    price double precision NOT NULL,
    description TEXT,
    size TEXT,
    color TEXT,
    subcategory_id uuid NOT NULL DEFAULT gen_random_uuid(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dev.category
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    category_name TEXT NOT NULL,
    parent_id uuid,
    PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS dev.product_image
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    product_id uuid NOT NULL,
    image_url TEXT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS dev.wishlist
(
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS dev.bid
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    price double precision NOT NULL,
    created_timestamp time without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dev.role
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    role_name TEXT,
    PRIMARY KEY (id),
    UNIQUE (role_name)
);

CREATE TABLE IF NOT EXISTS dev.user_role
(
    role_id uuid NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (role_id, user_id)
);

CREATE TABLE IF NOT EXISTS dev.role_permission
(
    permission_id uuid NOT NULL,
    role_id uuid NOT NULL,
    PRIMARY KEY (permission_id, role_id)
);

CREATE TABLE IF NOT EXISTS dev.permission
(
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    permission_name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (id),
    UNIQUE (permission_name)
);

CREATE TABLE IF NOT EXISTS dev.product_auction
(
    product_id uuid,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    PRIMARY KEY (product_id)
);

ALTER TABLE IF EXISTS dev."user"
    ADD CONSTRAINT card_id_fk FOREIGN KEY (card_id)
        REFERENCES dev.card (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev."user"
    ADD CONSTRAINT shipping_address_id_fk FOREIGN KEY (shipping_address_id)
        REFERENCES dev.address (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev."order"
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev."order"
    ADD CONSTRAINT product_id_fk FOREIGN KEY (product_id)
        REFERENCES dev.product (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.product
    ADD CONSTRAINT seller_id_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.product
    ADD FOREIGN KEY (subcategory_id)
        REFERENCES dev.category (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.category
    ADD FOREIGN KEY (parent_id)
        REFERENCES dev.category (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.product_image
    ADD CONSTRAINT product_id_fk FOREIGN KEY (product_id)
        REFERENCES dev.product (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.wishlist
    ADD CONSTRAINT product_id_fk FOREIGN KEY (product_id)
        REFERENCES dev.product (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.wishlist
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.bid
    ADD CONSTRAINT product_id_fk FOREIGN KEY (product_id)
        REFERENCES dev.product (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.bid
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.user_role
    ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id)
        REFERENCES dev.role (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.user_role
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES dev."user" (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.role_permission
    ADD CONSTRAINT permission_id_fk FOREIGN KEY (permission_id)
        REFERENCES dev.permission (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.role_permission
    ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id)
        REFERENCES dev.role (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;


ALTER TABLE IF EXISTS dev.product_auction
    ADD FOREIGN KEY (product_id)
        REFERENCES dev.product (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID;

END;
