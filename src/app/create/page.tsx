'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ImagePlus, X } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateListing() {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [listingTypes, setListingTypes] = useState({
    forSale: false,
    forTrade: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Form submitted', {
      listingTypes,
      selectedImages,
      // ... other form data
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
              {/* Image Upload */}
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
                        <span className="text-sm text-gray-500 mt-2">Add Photo</span>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="christmas">Christmas Series</SelectItem>
                    <SelectItem value="halloween">Halloween Series</SelectItem>
                    <SelectItem value="animal">Animal Series</SelectItem>
                    <SelectItem value="fruit">Fruit Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter Sonny Angel name" />
              </div>

              {/* Price/Value */}
              <div className="space-y-2">
                <Label htmlFor="price">Price/Value</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input id="price" type="number" min="0" step="0.01" className="pl-7" placeholder="0.00" />
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
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        setListingTypes(prev => ({ ...prev, forSale: checked === true }))
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
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        setListingTypes(prev => ({ ...prev, forTrade: checked === true }))
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

              {/* Color Picker */}
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input type="color" id="color" className="h-10 w-20" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about your Sonny Angel..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full"
                disabled={!listingTypes.forSale && !listingTypes.forTrade}
              >
                Create Listing
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 