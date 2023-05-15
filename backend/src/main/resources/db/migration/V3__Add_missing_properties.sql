INSERT INTO dev.product_image(product_id, image_url)
VALUES (
           (SELECT id FROM dev.product WHERE product_name = 'Formal Bugatti Shoe'),
           'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1600'
       );

