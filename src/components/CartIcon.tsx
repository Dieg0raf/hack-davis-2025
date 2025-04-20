"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

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

  return (
    <SignedIn>
      <Button
        variant="outline"
        size="icon"
        className="relative border-gray-700"
        onClick={() => router.push('/cart')}
      >
        <ShoppingCart className="h-5 w-5 text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#FFA6BD] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>
    </SignedIn>
  );
} 