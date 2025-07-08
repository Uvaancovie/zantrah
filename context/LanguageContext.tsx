"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar' | 'fr' | 'pt' | 'sw'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.dashboard': 'Dashboard',
    'nav.orders': 'My Orders',
    'nav.addProduct': 'Add Product',
    'nav.profile': 'Edit Profile',
    'nav.signOut': 'Sign Out',
    'nav.joinZantra': 'Join Zantra',
    
    // Main page
    'hero.connecting': 'Connecting Africa & the Middle East',
    'hero.title': 'Discover Amazing',
    'hero.titleHighlight': 'African Products',
    'hero.subtitle': 'From handcrafted textiles to organic beauty products - shop authentic items from verified vendors across Africa and the Middle East.',
    'hero.shopNow': 'Shop Now',
    'hero.sellWithUs': 'Start Selling',
    'hero.getStarted': 'Get Started',
    'hero.exploreMarketplace': 'Explore Marketplace',
    
    // Products
    'products.featured': 'Featured Products',
    'products.addToCart': 'Add to Cart',
    'products.viewDetails': 'View Details',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.totalViews': 'Total Views',
    'dashboard.totalInquiries': 'Total Inquiries',
    
    // Profile
    'profile.title': 'Profile Settings',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.country': 'Country',
    'profile.role': 'Role',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.marketplace': 'السوق',
    'nav.dashboard': 'لوحة التحكم',
    'nav.orders': 'طلباتي',
    'nav.addProduct': 'إضافة منتج',
    'nav.profile': 'تعديل الملف الشخصي',
    'nav.signOut': 'تسجيل الخروج',
    'nav.joinZantra': 'انضم لزانترا',
    
    // Main page
    'hero.connecting': 'ربط أفريقيا والشرق الأوسط',
    'hero.title': 'اكتشف منتجات',
    'hero.titleHighlight': 'أفريقية مذهلة',
    'hero.subtitle': 'من المنسوجات المصنوعة يدوياً إلى منتجات التجميل العضوية - تسوق من عناصر أصيلة من بائعين معتمدين عبر أفريقيا والشرق الأوسط.',
    'hero.shopNow': 'تسوق الآن',
    'hero.sellWithUs': 'ابدأ البيع',
    'hero.getStarted': 'ابدأ الآن',
    'hero.exploreMarketplace': 'استكشف السوق',
    
    // Products
    'products.featured': 'المنتجات المميزة',
    'products.addToCart': 'أضف للسلة',
    'products.viewDetails': 'عرض التفاصيل',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.totalProducts': 'إجمالي المنتجات',
    'dashboard.totalViews': 'إجمالي المشاهدات',
    'dashboard.totalInquiries': 'إجمالي الاستفسارات',
    
    // Profile
    'profile.title': 'إعدادات الملف الشخصي',
    'profile.firstName': 'الاسم الأول',
    'profile.lastName': 'اسم العائلة',
    'profile.email': 'البريد الإلكتروني',
    'profile.phone': 'الهاتف',
    'profile.country': 'البلد',
    'profile.role': 'الدور',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.marketplace': 'Marché',
    'nav.dashboard': 'Tableau de bord',
    'nav.orders': 'Mes commandes',
    'nav.addProduct': 'Ajouter un produit',
    'nav.profile': 'Modifier le profil',
    'nav.signOut': 'Se déconnecter',
    'nav.joinZantra': 'Rejoindre Zantra',
    
    // Main page
    'hero.connecting': 'Connecter l\'Afrique et le Moyen-Orient',
    'hero.title': 'Découvrez d\'incroyables',
    'hero.titleHighlight': 'Produits Africains',
    'hero.subtitle': 'Des textiles artisanaux aux produits de beauté biologiques - achetez des articles authentiques de vendeurs vérifiés à travers l\'Afrique et le Moyen-Orient.',
    'hero.shopNow': 'Acheter Maintenant',
    'hero.sellWithUs': 'Commencer à Vendre',
    'hero.getStarted': 'Commencer',
    'hero.exploreMarketplace': 'Explorer le Marché',
    
    // Products
    'products.featured': 'Produits en Vedette',
    'products.addToCart': 'Ajouter au Panier',
    'products.viewDetails': 'Voir les Détails',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bon retour',
    'dashboard.totalProducts': 'Total des Produits',
    'dashboard.totalViews': 'Total des Vues',
    'dashboard.totalInquiries': 'Total des Demandes',
    
    // Profile
    'profile.title': 'Paramètres du Profil',
    'profile.firstName': 'Prénom',
    'profile.lastName': 'Nom de famille',
    'profile.email': 'Email',
    'profile.phone': 'Téléphone',
    'profile.country': 'Pays',
    'profile.role': 'Rôle',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.marketplace': 'Mercado',
    'nav.dashboard': 'Painel',
    'nav.orders': 'Meus Pedidos',
    'nav.addProduct': 'Adicionar Produto',
    'nav.profile': 'Editar Perfil',
    'nav.signOut': 'Sair',
    'nav.joinZantra': 'Juntar-se à Zantra',
    
    // Main page
    'hero.connecting': 'Conectando África e Médio Oriente',
    'hero.title': 'Descubra Incríveis',
    'hero.titleHighlight': 'Produtos Africanos',
    'hero.subtitle': 'De têxteis artesanais a produtos de beleza orgânicos - compre itens autênticos de vendedores verificados através de África e Médio Oriente.',
    'hero.shopNow': 'Comprar Agora',
    'hero.sellWithUs': 'Começar a Vender',
    'hero.getStarted': 'Começar',
    'hero.exploreMarketplace': 'Explorar Mercado',
    
    // Products
    'products.featured': 'Produtos em Destaque',
    'products.addToCart': 'Adicionar ao Carrinho',
    'products.viewDetails': 'Ver Detalhes',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    
    // Dashboard
    'dashboard.title': 'Painel',
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.totalProducts': 'Total de Produtos',
    'dashboard.totalViews': 'Total de Visualizações',
    'dashboard.totalInquiries': 'Total de Consultas',
    
    // Profile
    'profile.title': 'Configurações do Perfil',
    'profile.firstName': 'Primeiro Nome',
    'profile.lastName': 'Sobrenome',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
    'profile.country': 'País',
    'profile.role': 'Função',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.marketplace': 'Soko',
    'nav.dashboard': 'Dashibodi',
    'nav.orders': 'Maagizo Yangu',
    'nav.addProduct': 'Ongeza Bidhaa',
    'nav.profile': 'Hariri Wasifu',
    'nav.signOut': 'Toka',
    'nav.joinZantra': 'Jiunge na Zantra',
    
    // Main page
    'hero.connecting': 'Kuunganisha Afrika na Mashariki ya Kati',
    'hero.title': 'Gundua',
    'hero.titleHighlight': 'Bidhaa za Kiafrika',
    'hero.subtitle': 'Kutoka vitambaa vya mikono hadi bidhaa za urembo wa asili - nunua vitu halisi kutoka kwa wauzaji walioidhinishwa kote Afrika na Mashariki ya Kati.',
    'hero.shopNow': 'Nunua Sasa',
    'hero.sellWithUs': 'Anza Kuuza',
    'hero.getStarted': 'Anza',
    'hero.exploreMarketplace': 'Chunguza Soko',
    
    // Products
    'products.featured': 'Bidhaa Maalum',
    'products.addToCart': 'Ongeza kwenye Kikapu',
    'products.viewDetails': 'Ona Maelezo',
    
    // Common
    'common.loading': 'Inapakia...',
    'common.error': 'Hitilafu',
    'common.success': 'Mafanikio',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.edit': 'Hariri',
    'common.delete': 'Futa',
    'common.search': 'Tafuta',
    'common.filter': 'Chuja',
    
    // Dashboard
    'dashboard.title': 'Dashibodi',
    'dashboard.welcome': 'Karibu tena',
    'dashboard.totalProducts': 'Jumla ya Bidhaa',
    'dashboard.totalViews': 'Jumla ya Mionjo',
    'dashboard.totalInquiries': 'Jumla ya Maswali',
    
    // Profile
    'profile.title': 'Mipangilio ya Wasifu',
    'profile.firstName': 'Jina la Kwanza',
    'profile.lastName': 'Jina la Ukoo',
    'profile.email': 'Barua pepe',
    'profile.phone': 'Simu',
    'profile.country': 'Nchi',
    'profile.role': 'Jukumu',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('zantra_language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem('zantra_language', lang)
    
    // Update document direction for RTL languages
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    return (translations[currentLanguage] as any)?.[key] || (translations.en as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
