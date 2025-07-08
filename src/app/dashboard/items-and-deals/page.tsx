"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Calendar, DollarSign, Utensils, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Mock data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 18.99,
    category: "Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil on our signature wood-fired crust",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Grilled Salmon",
    price: 26.99,
    category: "Seafood",
    description: "Atlantic salmon with lemon herb butter, served with seasonal vegetables",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 14.99,
    category: "Salads",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and our house Caesar dressing",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Beef Tenderloin",
    price: 34.99,
    category: "Steaks",
    description: "8oz prime beef tenderloin with garlic mashed potatoes and red wine reduction",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const promotions = [
  {
    id: 1,
    message: "Happy Hour - 50% off all appetizers",
    active: true,
    createdAt: "2024-01-15",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: 2,
    message: "Weekend Special - Free dessert with main course",
    active: true,
    createdAt: "2024-01-10",
    startDate: "2024-01-12",
    endDate: "2024-01-31",
  },
  {
    id: 3,
    message: "Valentine's Day - Romantic dinner for two",
    active: false,
    createdAt: "2024-01-08",
    startDate: "2024-02-14",
    endDate: "2024-02-14",
  },
]

type MenuItem = {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
}

type Promotion = {
  id: number
  message: string
  active: boolean
  createdAt: string
  startDate: string
  endDate: string
}

export default function RestaurantDashboard() {
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false)
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null)
const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)

  const handleEditMenuItem = (item: MenuItem) => {
  setEditingMenuItem(item)
  setIsMenuDialogOpen(true)
}

const handleEditPromotion = (promotion: Promotion) => {
  setEditingPromotion(promotion)
  setIsPromotionDialogOpen(true)
}

  const resetMenuDialog = () => {
    setEditingMenuItem(null)
    setIsMenuDialogOpen(false)
  }

  const resetPromotionDialog = () => {
    setEditingPromotion(null)
    setIsPromotionDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Restaurant Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage your menu and promotions with ease</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total Menu Items</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Utensils className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{menuItems.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Active Promotions </CardTitle>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Megaphone className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{promotions.filter((p) => p.active).length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Avg. Price</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                ${(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Categories</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {new Set(menuItems.map((item) => item.category)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
            <TabsTrigger
              value="menu"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white text-slate-600 font-medium transition-all duration-300"
            >
              Menu Items
            </TabsTrigger>
            <TabsTrigger
              value="promotions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white text-slate-600 font-medium transition-all duration-300"
            >
              Promotions
            </TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800">Menu Items</h2>
              <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setEditingMenuItem(null)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800">
                      {editingMenuItem ? "Edit Menu Item" : "Add New Menu Item"}
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                      {editingMenuItem
                        ? "Update the menu item details below."
                        : "Fill in the details for your new menu item."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right text-slate-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={editingMenuItem?.name || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right text-slate-700">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        defaultValue={editingMenuItem?.price || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right text-slate-700">
                        Category
                      </Label>
                      <Select defaultValue={editingMenuItem?.category || ""}>
                        <SelectTrigger className="col-span-3 border-slate-200 focus:border-blue-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pizza">Pizza</SelectItem>
                          <SelectItem value="Seafood">Seafood</SelectItem>
                          <SelectItem value="Salads">Salads</SelectItem>
                          <SelectItem value="Steaks">Steaks</SelectItem>
                          <SelectItem value="Appetizers">Appetizers</SelectItem>
                          <SelectItem value="Desserts">Desserts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right text-slate-700">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        defaultValue={editingMenuItem?.description || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right text-slate-700">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        defaultValue={editingMenuItem?.image || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={resetMenuDialog}
                      className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button onClick={resetMenuDialog} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      {editingMenuItem ? "Update Item" : "Add Item"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-slate-800 text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">${item.price}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditMenuItem(item)}
                        className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800">Promotions</h2>
              <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setEditingPromotion(null)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Promotion
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800">
                      {editingPromotion ? "Edit Promotion" : "Add New Promotion"}
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                      {editingPromotion
                        ? "Update the promotion details below."
                        : "Create a new promotion for your restaurant."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="message" className="text-right text-slate-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        defaultValue={editingPromotion?.message || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="active" className="text-right text-slate-700">
                        Active
                      </Label>
                      <div className="col-span-3">
                        <Switch defaultChecked={editingPromotion?.active || false} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startDate" className="text-right text-slate-700">
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        defaultValue={editingPromotion?.startDate || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endDate" className="text-right text-slate-700">
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        defaultValue={editingPromotion?.endDate || ""}
                        className="col-span-3 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={resetPromotionDialog}
                      className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button onClick={resetPromotionDialog} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      {editingPromotion ? "Update Promotion" : "Add Promotion"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {promotions.map((promotion) => (
                <Card
                  key={promotion.id}
                  className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-slate-800 text-lg flex-1 pr-4">{promotion.message}</CardTitle>
                      <div className="flex items-center gap-2">
                        {promotion.active ? (
                          <ToggleRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                        )}
                        <Badge
                          variant={promotion.active ? "default" : "secondary"}
                          className={
                            promotion.active
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {promotion.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-700 font-medium">Created:</span>
                        <p className="text-slate-600">{new Date(promotion.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-slate-700 font-medium">Duration:</span>
                        <p className="text-slate-600">
                          {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                          {new Date(promotion.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPromotion(promotion)}
                        className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}