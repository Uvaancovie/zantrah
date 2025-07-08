"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks/use-profile"
import Navbar from "@/components/layout/navbar"
import { Plus, Package, Users, DollarSign, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: string
  category: string
  status: "active" | "draft" | "sold"
  views: number
  inquiries: number
}

export default function DashboardPage() {
  const { profile } = useProfile()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Load mock products for demo
    setProducts([
      {
        id: 1,
        name: "Handwoven Basket",
        price: "R250",
        category: "Home & Garden",
        status: "active",
        views: 45,
        inquiries: 3,
      },
      {
        id: 2,
        name: "Traditional Jewelry Set",
        price: "R480",
        category: "Jewelry",
        status: "active",
        views: 67,
        inquiries: 8,
      },
      {
        id: 3,
        name: "Organic Skincare Kit",
        price: "R320",
        category: "Beauty",
        status: "draft",
        views: 12,
        inquiries: 1,
      },
    ])
  }, [])

  const stats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Views",
      value: products.reduce((sum, p) => sum + p.views, 0).toString(),
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Inquiries",
      value: products.reduce((sum, p) => sum + p.inquiries, 0).toString(),
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: "R1,250",
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {profile?.first_name}! Manage your products and track your business.
              </p>
            </div>
            <Link
              href="/products/add"
              className="mt-4 sm:mt-0 bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inquiries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : product.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.inquiries}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first product to the marketplace.</p>
              <Link
                href="/products/add"
                className="bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
