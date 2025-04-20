"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load initial cart count
    const count = localStorage.getItem('cartCount');
    setCartCount(count ? parseInt(count) : 0);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const newCount = localStorage.getItem('cartCount');
      setCartCount(newCount ? parseInt(newCount) : 0);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const removeItem = () => {
    if (cartCount > 0) {
      const newCount = cartCount - 1;
      setCartCount(newCount);
      localStorage.setItem('cartCount', newCount.toString());
      
      // Update cart items array
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (cartItems.length > 0) {
        cartItems.pop(); // Remove the last item
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
      
      // Dispatch event to update cart icon
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="text-lg space-y-4">
        {cartCount === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <p>You have {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={removeItem}
                className="border-gray-700"
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </Button>
              <span>Remove Item</span>
            </div>
          </>
        )}
        <div className="mt-8 flex gap-4">
          <Link href="/">
            <Button 
              variant="outline"
              className="border-gray-700 text-gray-700"
            >
              Continue Shopping
            </Button>
          </Link>
          {cartCount > 0 && (
            <Button 
              className="bg-[#FFA6BD] hover:bg-[#FF8CAB] text-white border-gray-700 flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 