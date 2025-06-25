
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id UUID REFERENCES public.products NOT NULL,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Cart policies
CREATE POLICY "Users can manage own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, sizes) VALUES
('Classic Oxford Shoes', 'Premium leather Oxford shoes for formal occasions', 2999, 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop&crop=center', 'men', '{7,8,9,10,11}'),
('Casual Loafers', 'Comfortable leather loafers for everyday wear', 2499, 'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=400&h=300&fit=crop&crop=center', 'men', '{7,8,9,10,11}'),
('Formal Derby Shoes', 'Elegant derby shoes perfect for business meetings', 3499, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop&crop=center', 'men', '{7,8,9,10,11}'),
('Elegant High Heels', 'Stylish high heels for special occasions', 3299, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop&crop=center', 'women', '{5,6,7,8,9}'),
('Block Heel Pumps', 'Comfortable block heel pumps for office wear', 2799, 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=300&fit=crop&crop=center', 'women', '{5,6,7,8,9}'),
('Strappy Sandals', 'Trendy strappy sandals for summer outings', 2299, 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center', 'women', '{5,6,7,8,9}'),
('Colorful School Shoes', 'Durable and comfortable school shoes for kids', 1599, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop&crop=center', 'kids', '{1,2,3,4,5}'),
('Fun Character Boots', 'Waterproof boots with fun character designs', 1899, 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=300&fit=crop&crop=center', 'kids', '{1,2,3,4,5}'),
('Running Sneakers', 'High-performance running sneakers with cushioned sole', 3999, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center', 'sneakers', '{6,7,8,9,10,11}'),
('Casual Street Sneakers', 'Stylish street sneakers for casual outings', 2999, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop&crop=center', 'sneakers', '{6,7,8,9,10,11}'),
('High-Top Sneakers', 'Classic high-top sneakers with modern comfort', 3499, 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&crop=center', 'sneakers', '{6,7,8,9,10,11}');
