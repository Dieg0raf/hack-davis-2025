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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
// import Navbar from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

function CreateListingContent() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [listingTypes, setListingTypes] = useState({
    forSale: false,
    forTrade: false,
  });
  const [series, setSeries] = useState<Array<{ series: string; year: number }>>(
    []
  );
  const [products, setProducts] = useState<
    Array<{ id: string; name: string; series: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [name, setName] = useState("")
  const [color, setColor] = useState("#000000");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!selectedProduct) {
        throw new Error("Please select a product");
      }

      if (!description.trim()) {
        throw new Error("Please add a description");
      }

      // Create FormData for the request
      const formData = new FormData();
      formData.append("productId", selectedProduct);
      formData.append("listerId", "dummy-profile-id"); // Using the dummy profile ID
      formData.append("description", description);
      formData.append("price", price || "0.00");
      formData.append("status", "active");
      formData.append("colors", JSON.stringify([color]));

      // Add each image file to FormData
      selectedImages.forEach((file) => {
        formData.append(`images`, file);
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
      router.push(`/listings/${data.id}`);
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
          <p className="mt-4 text-gray-600">Loading series...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Series
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
            <CardDescription>
              Add your Sonny Angel details and photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="grid grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {previewUrls.length < 5 && (
                    <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center">
                      <label className="cursor-pointer flex flex-col items-center">
                        <ImagePlus className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">
                          Add Photo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                          multiple
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Series Selection */}
              <div className="space-y-2">
                <Label htmlFor="series">Series</Label>
                <Select
                  value={selectedSeries}
                  onValueChange={(value) => {
                    setSelectedSeries(value);
                    setSelectedProduct(""); // Reset product selection when series changes
                  }}
                >
                  <SelectTrigger>
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
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                  disabled={!selectedSeries}
                >
                  <SelectTrigger>
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
              </div>

              {/* Color Picker */}
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-20 p-1"
                  />
                  <span className="text-sm text-gray-500">{color}</span>
                </div>
              </div>

              {/* Listing Type */}
              <div className="space-y-2">
                <Label>Listing Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="forSale"
                      checked={listingTypes.forSale}
                      onCheckedChange={(checked) =>
                        setListingTypes((prev) => ({
                          ...prev,
                          forSale: checked === true,
                        }))
                      }
                    />
                    <label
                      htmlFor="forSale"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      For Sale
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="forTrade"
                      checked={listingTypes.forTrade}
                      onCheckedChange={(checked) =>
                        setListingTypes((prev) => ({
                          ...prev,
                          forTrade: checked === true,
                        }))
                      }
                    />
                    <label
                      htmlFor="forTrade"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      For Trade
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any additional details about your Sonny Angel..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Price Input */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  (!listingTypes.forSale && !listingTypes.forTrade) ||
                  submitting
                }
              >
                {submitting ? "Creating Listing..." : "Create Listing"}
              </Button>

              {submitError && (
                <div className="text-red-500 text-sm text-center">
                  {submitError}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function CreateListing() {
  return <CreateListingContent />;
}
