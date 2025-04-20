"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
// import Navbar from "@/components/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

// Define common colors for Sonny Angel figurines
const commonColors = [
  "White",
  "Pink",
  "Blue",
  "Yellow",
  "Green",
  "Red",
  "Purple",
  "Black",
  "Orange",
  "Brown",
  "Clear/Transparent",
  "Gold",
  "Silver",
  "Pastel",
  "Multicolored",
];

const CreateListingContent = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [listingType, setListingType] = useState<string>("sale");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [series, setSeries] = useState<Array<{ series: string; year: number }>>(
    []
  );
  const [products, setProducts] = useState<
    Array<{ id: string; name: string; series: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState<string>("");
  const [tradePreferences, setTradePreferences] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const profileId = params.profileId as string;

  // Example image for the preview
  const dummyPreviewImage = "/api/placeholder/400/400";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seriesResponse, productsResponse] = await Promise.all([
          fetch("/api/products/series"),
          fetch("/api/products"),
        ]);

        if (!seriesResponse.ok) {
          throw new Error(
            `Failed to fetch series: ${seriesResponse.statusText}`
          );
        }

        if (!productsResponse.ok) {
          throw new Error(
            `Failed to fetch products: ${productsResponse.statusText}`
          );
        }

        const [seriesData, productsData] = await Promise.all([
          seriesResponse.json(),
          productsResponse.json(),
        ]);

        if (!Array.isArray(seriesData) || !Array.isArray(productsData)) {
          throw new Error("Invalid data format received from server");
        }

        setSeries(seriesData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected series
  const filteredProducts = products.filter(
    (product) => product.series === selectedSeries
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Function to toggle a color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!profileId) {
        throw new Error(
          "Profile ID is missing. Please try again from your profile page."
        );
      }

      if (!selectedProduct) {
        throw new Error("Please select a product");
      }

      if (!condition.trim()) {
        throw new Error("Please describe the item's condition");
      }

      if (selectedImages.length === 0) {
        throw new Error("Please upload at least one image");
      }

      if (selectedColors.length === 0) {
        throw new Error("Please select at least one color");
      }

      // Create FormData for the request
      const formData = new FormData();
      formData.append("productId", selectedProduct);
      formData.append("listerId", profileId);
      formData.append("description", condition);
      formData.append("price", price || "0.00");
      formData.append("status", "available");
      formData.append("colors", JSON.stringify(selectedColors));
      formData.append("forSale", (listingType === "sale").toString());
      formData.append("forTrade", (listingType === "trade").toString());

      if (listingType === "trade") {
        formData.append("tradePreferences", tradePreferences);
      }

      // Add each image file to FormData
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/listings", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create listing");
      }

      const data = await response.json();
      console.log("Listing created:", data);

      // Redirect to the listing page
      router.push(`/profile/${profileId}`);
    } catch (err) {
      console.error("Error creating listing:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to create listing"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto px-28 pt-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Create a listing</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Listing Type */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Choose listing type</h2>
                <RadioGroup
                  value={listingType}
                  onValueChange={setListingType}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sale" id="for-sale" />
                    <Label htmlFor="for-sale">For sale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trade" id="for-trade" />
                    <Label htmlFor="for-trade">For trade</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Upload Photos */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Upload photos</h2>
                <p className="text-sm text-gray-500">
                  Required pictures: Front, Back, Base Stamp
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200 rounded relative"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {previewUrls.length < 5 && (
                    <label className="aspect-square bg-gray-200 rounded flex items-center justify-center cursor-pointer">
                      <Plus className="h-8 w-8 text-gray-400" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        multiple
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Fill in details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Fill in details</h2>

                <div className="space-y-2">
                  <Label htmlFor="name-series">Name and series:</Label>
                  <Select
                    value={selectedSeries}
                    onValueChange={(value) => {
                      setSelectedSeries(value);
                      setSelectedProduct("");
                    }}
                  >
                    <SelectTrigger className="w-full bg-gray-200 border-0">
                      <SelectValue placeholder="Select a series" />
                    </SelectTrigger>
                    <SelectContent>
                      {series.map((item) => (
                        <SelectItem key={item.series} value={item.series}>
                          {item.series} ({item.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedSeries && (
                    <Select
                      value={selectedProduct}
                      onValueChange={setSelectedProduct}
                    >
                      <SelectTrigger className="w-full bg-gray-200 border-0 mt-2">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <Label>Colors (select all that apply):</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {commonColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className="text-sm cursor-pointer"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">
                    Describe the items condition:
                  </Label>
                  <Textarea
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="Mint condition, no box..."
                    className="bg-gray-200 border-0"
                  />
                </div>
              </div>

              {/* Set price (shown only if "For sale" is selected) */}
              {listingType === "sale" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">Set price</h2>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price:</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-gray-200 border-0 w-32"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}

              {/* Trading preferences (shown only if "For trade" is selected) */}
              {listingType === "trade" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">Trading preferences</h2>
                  <div className="space-y-2">
                    <Label htmlFor="trade-preferences">In search of:</Label>
                    <Textarea
                      id="trade-preferences"
                      value={tradePreferences}
                      onChange={(e) => setTradePreferences(e.target.value)}
                      placeholder="Butterfly series, halloween series..."
                      className="bg-gray-200 border-0"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="rounded-full w-full md:w-auto px-8"
                disabled={submitting}
              >
                {submitting ? "Listing..." : "List my angel"}
              </Button>

              {submitError && (
                <div className="text-red-500 text-sm">{submitError}</div>
              )}
            </form>
          </div>

          {/* Right Column - Preview */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Preview of listing</h1>
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="bg-gray-100 p-4">
                {previewUrls.length > 0 ? (
                  <img
                    src={previewUrls[0]}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <img
                    src={dummyPreviewImage}
                    alt="Preview placeholder"
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>

              {/* Thumbnail gallery */}
              <div className="flex p-2 gap-2 overflow-x-auto">
                {previewUrls.map((url, index) => (
                  <div key={index} className="w-16 h-16 flex-shrink-0">
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Color Preview */}
              {selectedColors.length > 0 && (
                <div className="p-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Colors:</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedColors.map((color) => (
                      <span
                        key={color}
                        className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function CreateListing() {
  return <CreateListingContent />;
}
