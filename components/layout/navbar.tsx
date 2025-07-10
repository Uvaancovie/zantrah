"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, User, LogOut, Plus, ShoppingBag, Briefcase, Settings, Home, Globe } from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { useLanguage } from "@/context/LanguageContext"

export default function Navbar() {
  const { profile, hasProfile, clearProfile } = useProfile()
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Language options based on vendor countries
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", countries: ["Nigeria", "Kenya", "Ghana", "UAE"] },
    { code: "ar", name: "العربية", flag: "🇸🇦", countries: ["Saudi Arabia", "Qatar", "Kuwait", "Oman", "UAE"] },
    { code: "fr", name: "Français", flag: "🇫🇷", countries: ["Morocco"] },
    { code: "pt", name: "Português", flag: "🇵🇹", countries: ["Angola", "Cape Verde"] },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪", countries: ["Kenya"] },
  ]

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    clearProfile()
    setUserMenuOpen(false)
    router.push("/")
  }

  const handleProfileClick = () => {
    setUserMenuOpen(false)
    router.push("/profile")
  }

  const isVendor = profile?.role && ["small_business", "entrepreneur", "corporation"].includes(profile.role)

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md border-b border-orange-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/LOGO.jpg" 
                alt="Zantra Logo" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Navigation items - always visible */}
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="text-white hover:text-orange-500 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                {t('nav.home')}
              </Link>
              <Link href="/marketplace" className="text-white hover:text-orange-500 transition-colors">
                {t('nav.marketplace')}
              </Link>
              <Link href="/dashboard" className="text-white hover:text-orange-500 transition-colors flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                {t('nav.dashboard')}
              </Link>
              <Link href="/orders" className="text-white hover:text-orange-500 transition-colors flex items-center">
                <ShoppingBag className="w-4 h-4 mr-1" />
                {t('nav.orders')}
              </Link>
              <Link
                href="/products/add"
                className="text-white hover:text-orange-500 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                {t('nav.addProduct')}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm font-medium hidden sm:block">
                  {languages.find(lang => lang.code === currentLanguage)?.name || "English"}
                </span>
                <span className="text-2xl">{languages.find(lang => lang.code === currentLanguage)?.flag || "🇺🇸"}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLanguage(language.code as any)
                        setLanguageMenuOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center justify-between transition-colors ${
                        currentLanguage === language.code ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <div className="text-white text-sm font-medium">{language.name}</div>
                          <div className="text-gray-400 text-xs">
                            {language.countries.join(", ")}
                          </div>
                        </div>
                      </div>
                      {currentLanguage === language.code && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {hasProfile ? (
              <div className="relative">
                {/* Clickable Profile Section */}
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors group"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-bold">
                      {profile?.first_name?.charAt(0)}
                      {profile?.last_name?.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-white text-sm font-medium group-hover:text-orange-500 transition-colors">
                      {profile?.first_name} {profile?.last_name}
                    </div>
                    <div className="text-orange-500 text-xs capitalize">{profile?.role?.replace("_", " ")}</div>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </button>

                {/* Quick Actions Dropdown */}
                <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                    <Link
                      href="/profile"
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t('nav.profile')}
                    </Link>
                    {isVendor && (
                      <>
                        <Link
                          href="/dashboard"
                          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center transition-colors"
                        >
                          <Briefcase className="w-4 h-4 mr-2" />
                          {t('nav.dashboard')}
                        </Link>
                        <Link
                          href="/products/add"
                          className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t('nav.addProduct')}
                        </Link>
                      </>
                    )}
                    <Link
                      href="/orders"
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t('nav.orders')}
                    </Link>
                    <hr className="border-gray-700 my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/register"
                className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-400 transition-colors"
              >
                {t('nav.joinZantra')}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-orange-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-orange-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4 mr-2" />
                {t('nav.home')}
              </Link>
              <Link
                href="/marketplace"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.marketplace')}
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                {t('nav.dashboard')}
              </Link>
              <Link
                href="/orders"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t('nav.orders')}
              </Link>
              <Link
                href="/products/add"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('nav.addProduct')}
              </Link>
              
              <hr className="border-gray-700 my-2" />
              
              {/* Language Switcher in Mobile */}
              <div className="px-3 py-2">
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Language</div>
                <div className="space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLanguage(language.code as any)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                        currentLanguage === language.code ? "bg-gray-800 text-orange-500" : "text-white hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="text-sm font-medium">{language.name}</div>
                          <div className="text-xs text-gray-400">
                            {language.countries.slice(0, 2).join(", ")}
                            {language.countries.length > 2 && "..."}
                          </div>
                        </div>
                      </div>
                      {currentLanguage === language.code && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-700 my-2" />
              
              <Link
                href="/profile"
                className="block px-3 py-2 text-white hover:text-orange-500 transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('nav.signOut')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
