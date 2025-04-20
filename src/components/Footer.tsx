import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#768bb5] border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About SonnySwap</h3>
            <p className="text-sm text-gray-100">
              Your premier destination for trading and collecting Sonny Angel figures. Join our community of collectors and enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-100 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-100 hover:text-white">
                  Community Events
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-gray-100 hover:text-white">
                  Sell Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-100 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-100 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-100 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-100 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p className="text-sm text-gray-100">
            © {new Date().getFullYear()} SonnySwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 