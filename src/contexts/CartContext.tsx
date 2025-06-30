
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, selectedSize?: string, selectedColor?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => Promise<void>;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const fetchCartItems = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          selected_size,
          selected_color,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const addToCart = async (productId: string, selectedSize?: string, selectedColor?: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    const size = selectedSize || 'One Size';
    const color = selectedColor || 'Default';

    try {
      // Check if item with same product, size, and color already exists
      const existingItem = cartItems.find(item => 
        item.product_id === productId && 
        item.selected_size === size && 
        item.selected_color === color
      );
      
      if (existingItem) {
        await updateQuantity(productId, existingItem.quantity + 1, size, color);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
          selected_size: size,
          selected_color: color,
        });

      if (error) throw error;

      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });

      fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (!user || quantity < 1) return;

    const size = selectedSize || 'One Size';
    const color = selectedColor || 'Default';

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('selected_size', size)
        .eq('selected_color', color);

      if (error) throw error;
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string, selectedSize?: string, selectedColor?: string) => {
    if (!user) return;

    const size = selectedSize || 'One Size';
    const color = selectedColor || 'Default';

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('selected_size', size)
        .eq('selected_color', color);

      if (error) throw error;
      fetchCartItems();
      
      toast({
        title: "Removed from cart",
        description: "Product has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      fetchCartItems();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
