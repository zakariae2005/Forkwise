"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Upload, Store, Palette, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RestaurantSetup() {
  const router = useRouter()
    const [formData, setFormData] = useState({
    restaurantName: "",
    slug: "",
    logo: null as File | null,
    bannerImage: null as File | null,
    phoneNumber: "",
    whatsappNumber: "",
    location: "",
    instagramUrl: "",
    welcomeMessage: "",
    primaryColor: "#3B82F6",
    layoutStyle: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Auto-generate slug from restaurant name
  useEffect(() => {
    if (formData.restaurantName) {
      const slug = formData.restaurantName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.restaurantName])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
try {
    const payload = {
        name: formData.restaurantName,
        slug: formData.slug,
        logo: formData.logo,
        bannerImage: formData.bannerImage,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        location: formData.location,
        instagramUrl: formData.instagramUrl,
        welcomeMessage: formData.welcomeMessage,
        primaryColor: formData.primaryColor,
        layoutStyle: formData.layoutStyle,
    }

    const res = await fetch('/api/restaurant', {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to create store")
    }

    const data = await res.json()
    console.log("Restaurant created:", data)
    router.push("/")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
} catch (error) {
    console.log(error);
    
}
    
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Created Successfully!</h2>
            <p className="text-gray-600 mb-6">Your restaurant has been created and is ready to go live.</p>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setIsSubmitted(false)}
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Account</span>
              </div>
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="ml-2 text-sm font-medium text-blue-600">Setup Restaurant</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">3</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Launch</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900">Step 2: Setup Your Restaurant</h1>
          <p className="text-center text-gray-600 mt-2">
            Tell us about your restaurant to create your digital presence
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Store className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName" className="text-sm font-medium text-gray-700">
                      Restaurant Name *
                    </Label>
                    <Input
                      id="restaurantName"
                      value={formData.restaurantName}
                      onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                      placeholder="Enter your restaurant name"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
                      URL Slug *
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="your-restaurant-url"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Your restaurant will be available at: yoursite.com/{formData.slug || "your-restaurant-url"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Images
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-white/30">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload your restaurant logo</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("logo", e.target.files?.[0] || null)}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById("logo-upload")?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Banner Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-white/30">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload banner image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("bannerImage", e.target.files?.[0] || null)}
                        className="hidden"
                        id="banner-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => document.getElementById("banner-upload")?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
                      WhatsApp Number
                    </Label>
                    <Input
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="123 Main Street, City, State 12345"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl" className="text-sm font-medium text-gray-700">
                      Instagram URL
                    </Label>
                    <Input
                      id="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                      placeholder="https://instagram.com/myrestaurant"
                      className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Branding & Content */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  Branding & Content
                </h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage" className="text-sm font-medium text-gray-700">
                      Welcome Message
                    </Label>
                    <Textarea
                      id="welcomeMessage"
                      value={formData.welcomeMessage}
                      onChange={(e) => handleInputChange("welcomeMessage", e.target.value)}
                      placeholder="Welcome to our restaurant! We're excited to serve you delicious food made with fresh, local ingredients."
                      className="min-h-[100px] bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor" className="text-sm font-medium text-gray-700">
                        Primary Brand Color
                      </Label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          id="primaryColor"
                          value={formData.primaryColor}
                          onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                          className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                          className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Layout Style</Label>
                      <Select
                        value={formData.layoutStyle}
                        onValueChange={(value) => handleInputChange("layoutStyle", value)}
                      >
                        <SelectTrigger className="h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
                          <SelectValue placeholder="Choose a layout style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Restaurant...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Store className="w-5 h-5 mr-2" />
                      Create Restaurant
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
