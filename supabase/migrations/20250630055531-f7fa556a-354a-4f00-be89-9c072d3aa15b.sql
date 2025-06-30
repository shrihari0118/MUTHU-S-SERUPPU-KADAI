
-- Add new columns to products table for colors and multiple images
ALTER TABLE public.products 
ADD COLUMN colors jsonb DEFAULT '[]'::jsonb,
ADD COLUMN images jsonb DEFAULT '[]'::jsonb;

-- Update existing products to have default structure
UPDATE public.products 
SET 
  colors = CASE 
    WHEN colors IS NULL OR colors = '[]'::jsonb 
    THEN '[{"name": "Default", "hex": "#000000"}]'::jsonb 
    ELSE colors 
  END,
  images = CASE 
    WHEN images IS NULL OR images = '[]'::jsonb 
    THEN jsonb_build_array(
      jsonb_build_object(
        'url', COALESCE(image_url, '/placeholder.svg'),
        'alt', name || ' - Main Image',
        'color', 'Default'
      )
    )
    ELSE images 
  END;

-- Add new columns to cart_items table for size and color tracking
ALTER TABLE public.cart_items 
ADD COLUMN selected_size text,
ADD COLUMN selected_color text DEFAULT 'Default';

-- Update existing cart items to have default values
UPDATE public.cart_items 
SET 
  selected_size = COALESCE(selected_size, 'One Size'),
  selected_color = COALESCE(selected_color, 'Default');
