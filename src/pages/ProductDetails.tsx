
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, Truck, ShieldCheck, RotateCcw, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sizes: string[];
}

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const { addToCart } = useCart();

  // Mock reviews data - in real app, this would come from database
  const reviews: Review[] = [
    {
      id: '1',
      customer_name: 'Priya S.',
      rating: 5,
      comment: 'Excellent quality! Very comfortable and stylish. Highly recommend.',
      date: '2024-01-15'
    },
    {
      id: '2',
      customer_name: 'Rajesh K.',
      rating: 4,
      comment: 'Good product, fits well. Delivery was quick.',
      date: '2024-01-10'
    },
    {
      id: '3',
      customer_name: 'Anita M.',
      rating: 5,
      comment: 'Love these! Perfect for daily wear. Great value for money.',
      date: '2024-01-08'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize && product?.sizes.length > 0) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    if (product) {
      await addToCart(product.id);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize && product?.sizes.length > 0) {
      toast({
        title: "Please select a size",
        description: "Choose a size before proceeding",
        variant: "destructive",
      });
      return;
    }

    await handleAddToCart();
    navigate('/cart');
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryInfo('Delivery available in 2-3 business days');
    } else {
      setDeliveryInfo('Please enter a valid 6-digit pincode');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muthu-warm-white">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-muthu-warm-white">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-lg">Product not found</p>
            <div className="text-center mt-4">
              <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muthu-warm-white">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm text-muthu-dark-brown/60">
              <button onClick={() => navigate('/')} className="hover:text-muthu-brown">
                Home
              </button>
              <span className="mx-2">/</span>
              <button onClick={() => navigate('/shop')} className="hover:text-muthu-brown">
                Shop
              </button>
              <span className="mx-2">/</span>
              <span className="text-muthu-dark-brown">{product.name}</span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-playfair font-bold text-muthu-dark-brown mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm text-muthu-dark-brown/60">
                    ({reviews.length} reviews)
                  </span>
                </div>

                <div className="text-3xl font-bold text-muthu-brown mb-4">
                  ₹{product.price.toLocaleString()}
                </div>

                <Badge variant="secondary" className="mb-4">
                  {product.category}
                </Badge>
              </div>

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-muthu-dark-brown mb-3">Size:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size 
                          ? "bg-muthu-brown hover:bg-muthu-dark-brown" 
                          : "border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="flex-1 border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-muthu-brown hover:bg-muthu-beige"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Delivery Check */}
              <Card className="border-muthu-beige">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-muthu-dark-brown mb-3">
                    Delivery & Services
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-muthu-beige rounded-md"
                        maxLength={6}
                      />
                      <Button
                        onClick={checkDelivery}
                        variant="outline"
                        size="sm"
                        className="border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                      >
                        Check
                      </Button>
                    </div>
                    {deliveryInfo && (
                      <p className="text-sm text-muthu-dark-brown/70">{deliveryInfo}</p>
                    )}

                    <div className="space-y-2 text-sm text-muthu-dark-brown/70">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Free delivery on orders above ₹999</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>7 days return policy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>1 year warranty</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12">
            <Card className="border-muthu-beige">
              <CardContent className="p-6">
                <h2 className="text-2xl font-playfair font-bold text-muthu-dark-brown mb-4">
                  Product Description
                </h2>
                <p className="text-muthu-dark-brown/80 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-muthu-dark-brown mb-3">Features:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muthu-dark-brown/80">
                    <li>Premium quality materials</li>
                    <li>Comfortable fit for all-day wear</li>
                    <li>Durable construction</li>
                    <li>Easy to clean and maintain</li>
                    <li>Available in multiple sizes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <Card className="border-muthu-beige">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold text-muthu-dark-brown">
                    Customer Reviews
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(averageRating)}
                    </div>
                    <span className="text-lg font-semibold text-muthu-dark-brown">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muthu-dark-brown/60">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-muthu-beige pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muthu-brown rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {review.customer_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-muthu-dark-brown">
                              {review.customer_name}
                            </p>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muthu-dark-brown/60">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muthu-dark-brown/80 ml-13">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
