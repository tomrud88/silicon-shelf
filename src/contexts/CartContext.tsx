"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
}

interface CartItemResponse {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: {
      name: string;
    };
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      console.log("Cart API response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Cart data from API:", data);
        // Transform API response to CartItem format
        const items =
          data.items?.map((item: CartItemResponse) => ({
            id: item.id,
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            quantity: item.quantity,
            category: item.product.category.name,
          })) || [];
        console.log("Transformed cart items:", items);
        setCartItems(items);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Cart API error:", response.status, errorData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (product: Omit<CartItem, "quantity">) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart from server
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity: 0, // quantity 0 = remove item
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart from server
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart from server
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (response.ok) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
