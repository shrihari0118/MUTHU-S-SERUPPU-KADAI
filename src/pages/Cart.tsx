
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muthu-warm-white">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-lg">Loading cart...</p>
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-muthu-dark-brown mb-4">
                Shopping Cart
              </h1>
              <p className="text-lg text-muthu-dark-brown/70">
                Review your selected items
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muthu-dark-brown/60 mb-8">
                  Your cart is empty
                </p>
                <Button 
                  onClick={() => navigate('/shop')}
                  className="bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <Card key={`${item.product_id}-${item.selected_size}-${item.selected_color}`} className="border-muthu-beige">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="w-20 h-20 object-cover rounded cursor-pointer"
                            onClick={() => handleProductClick(item.product_id)}
                          />
                          
                          <div className="flex-1">
                            <h3 
                              className="text-lg font-semibold text-muthu-dark-brown cursor-pointer hover:text-muthu-brown transition-colors"
                              onClick={() => handleProductClick(item.product_id)}
                            >
                              {item.products.name}
                            </h3>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-muthu-brown font-medium">
                                ₹{item.products.price}
                              </p>
                              {item.selected_size && item.selected_size !== 'One Size' && (
                                <span className="text-sm text-muthu-dark-brown/60">
                                  Size: {item.selected_size}
                                </span>
                              )}
                              {item.selected_color && item.selected_color !== 'Default' && (
                                <span className="text-sm text-muthu-dark-brown/60">
                                  Color: {item.selected_color}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.selected_size || undefined, item.selected_color || undefined)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 border-muthu-brown"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="text-lg font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.selected_size || undefined, item.selected_color || undefined)}
                              className="h-8 w-8 border-muthu-brown"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-muthu-dark-brown">
                              ₹{(item.products.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.product_id, item.selected_size || undefined, item.selected_color || undefined)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-muthu-beige">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-semibold text-muthu-dark-brown">
                        Total: ₹{total.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/shop')}
                        className="flex-1 border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                      >
                        Continue Shopping
                      </Button>
                      <Button className="flex-1 bg-muthu-brown hover:bg-muthu-dark-brown text-white">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
