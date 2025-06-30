import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sizes: string[];
  colors: ProductColor[];
}

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'men');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const categories = [
    { id: 'men', name: "Men's Collection" },
    { id: 'women', name: "Women's Heels" },
    { id: 'kids', name: "Kids' Footwear" },
    { id: 'sneakers', name: "Trendy Sneakers" }
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Cast the Json types to proper TypeScript types with proper type conversion
      const productsData: Product[] = (data || []).map(product => ({
        ...product,
        colors: (product.colors as unknown as ProductColor[]) || [],
        sizes: product.sizes || []
      }));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update active category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = products.filter(product => product.category === activeCategory);
  const categoryCount = (categoryId: string) => products.filter(p => p.category === categoryId).length;

  const handleAddToCart = async (productId: string, productName: string) => {
    // For shop page, add with default values - user can modify in product details
    const product = products.find(p => p.id === productId);
    const defaultSize = product?.sizes?.[0] || 'One Size';
    const defaultColor = product?.colors?.[0]?.name || 'Default';
    
    await addToCart(productId, defaultSize, defaultColor);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muthu-warm-white">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-lg">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muthu-warm-white">
      <Header />
      
      <div className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-muthu-dark-brown mb-4">
                Our Shop
              </h1>
              <p className="text-lg text-muthu-dark-brown/70 max-w-2xl mx-auto">
                Discover our complete collection of premium footwear for every style and occasion.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                      : "border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                  }`}
                >
                  {category.name} ({categoryCount(category.id)})
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-muthu-beige"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        onClick={() => handleProductClick(product.id)}
                      />
                      <div className="absolute top-4 right-4 bg-muthu-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{product.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 
                        className="text-xl font-playfair font-bold text-muthu-dark-brown mb-2 cursor-pointer hover:text-muthu-brown transition-colors"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-muthu-dark-brown/70 mb-4 text-sm">
                        {product.description}
                      </p>
                      
                      {/* Colors Preview */}
                      {product.colors && product.colors.length > 1 && (
                        <div className="mb-3">
                          <p className="text-xs text-muthu-dark-brown/60 mb-2">Colors:</p>
                          <div className="flex gap-1">
                            {product.colors.slice(0, 4).map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                            {product.colors.length > 4 && (
                              <span className="text-xs text-muthu-dark-brown/60 ml-1">
                                +{product.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <p className="text-sm text-muthu-dark-brown/60 mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <span 
                              key={size}
                              className="px-2 py-1 bg-muthu-beige text-muthu-dark-brown text-xs rounded"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                        onClick={() => handleAddToCart(product.id, product.name)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muthu-dark-brown/60">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
