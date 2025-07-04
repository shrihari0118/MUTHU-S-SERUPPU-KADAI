-- Drop the existing unique constraint that only considers user_id and product_id
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_product_id_key;

-- Add a new unique constraint that includes size and color to allow same product with different variants
ALTER TABLE cart_items ADD CONSTRAINT cart_items_user_product_size_color_key UNIQUE (user_id, product_id, selected_size, selected_color);