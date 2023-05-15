BEGIN;
UPDATE dev.role SET role_name = 'ROLE_ADMIN' WHERE role_name = 'Administrator';
UPDATE dev.role SET role_name = 'ROLE_USER' WHERE role_name = 'User';
UPDATE dev.role SET role_name = 'ROLE_TRUSTED_SELLER' WHERE role_name = 'Trusted Seller';
UPDATE dev.role SET role_name = 'ROLE_VERIFIED_SHOP' WHERE role_name = 'Verified Shop';
COMMIT;
