"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks/use-profile"
import Navbar from "@/components/layout/navbar"
import { Package, Clock, CheckCircle, X, Eye } from "lucide-react"

interface Order {
  id: string
  productName: string
  vendor: string
  price: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  date: string
  image: string
}

export default function OrdersPage() {
  const { profile, hasProfile } = useProfile()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!hasProfile) {
      router.push("/")
      return
    }

    // Mock orders data
    setOrders([
      {
        id: "ORD-001",
        productName: "Handwoven Kente Cloth",
        vendor: "Akosua Textiles",
        price: "R450",
        status: "delivered",
        date: "2024-01-15",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "ORD-002",
        productName: "Organic Argan Oil",
        vendor: "Atlas Beauty",
        price: "R280",
        status: "shipped",
        date: "2024-01-18",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "ORD-003",
        productName: "Ethiopian Coffee Beans",
        vendor: "Highland Roasters",
        price: "R180",
        status: "pending",
        date: "2024-01-20",
        image: "/placeholder.svg?height=100&width=100",
      },
    ])
  }, [hasProfile, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Package className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!hasProfile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track your orders and purchase history</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                      src={order.image || "/placeholder.svg"}
                      alt={order.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{order.productName}</h3>
                      <p className="text-gray-600 text-sm">by {order.vendor}</p>
                      <p className="text-gray-500 text-sm">Order #{order.id}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="text-center md:text-right">
                      <p className="font-bold text-gray-900">{order.price}</p>
                      <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
              <button
                onClick={() => router.push("/marketplace")}
                className="bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors"
              >
                Browse Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
