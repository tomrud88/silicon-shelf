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
        // Optimistically update cart count without full refetch
        setCartItems((prev) => {
          const existing = prev.find((item) => item.productId === product.id);
          if (existing) {
            return prev.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId: string) => {
    // Optimistic update - remove immediately from UI
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity: 0, // quantity 0 = remove item
        }),
      });

      if (!response.ok) {
        // Revert on error
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Revert on error
      await fetchCart();
    }
  };

  // Update quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    console.log("updateQuantity called:", { itemId, quantity });

    // Optimistic update - update immediately in UI
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      });

      console.log("updateQuantity response:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("updateQuantity failed:", error);
        // Revert on error
        await fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Revert on error
      await fetchCart();
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
