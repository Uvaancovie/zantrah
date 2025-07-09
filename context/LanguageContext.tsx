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
    
    // Hero Section
    'hero.title': "Africa's Premier Digital Marketplace",
    'hero.subtitle': 'Buy. Sell. Hire. Learn. The Digital Marketplace for Africa.',
    'hero.description': 'From handcrafted textiles to organic beauty products - shop authentic items from verified vendors across Africa and the Middle East.',
    'hero.getStarted': 'Get Started',
    'hero.exploreMarketplace': 'Explore Marketplace',
    'hero.connecting': 'Connecting Africa & the Middle East',
    'hero.shopNow': 'Shop Now',
    'hero.sellWithUs': 'Start Selling',
    'hero.titleHighlight': 'African Products',
    
    // Core Ecosystem Blocks
    'ecosystem.work.title': 'Work',
    'ecosystem.work.subtitle': 'Hire Freelancers',
    'ecosystem.work.description': 'Find skilled professionals for your projects across Africa and the Middle East',
    'ecosystem.products.title': 'Products',
    'ecosystem.products.subtitle': 'Shop Amazing Items',
    'ecosystem.products.description': 'Discover authentic African products from verified vendors',
    'ecosystem.network.title': 'Network',
    'ecosystem.network.subtitle': 'Business Connections',
    'ecosystem.network.description': 'Connect with traders, distributors, and business partners',
    'ecosystem.learn.title': 'Learn',
    'ecosystem.learn.subtitle': 'Grow Your Skills',
    'ecosystem.learn.description': 'Access micro-courses and educational content',
    
    // User Types
    'userTypes.buyer': 'Buyer',
    'userTypes.seller': 'Seller',
    'userTypes.freelancer': 'Freelancer',
    'userTypes.client': 'Client',
    'userTypes.producer': 'Producer',
    'userTypes.distributor': 'Distributor',
    'userTypes.learner': 'Learner',
    'userTypes.educator': 'Educator',
    
    // Trust & Security
    'trust.verified': 'Verified',
    'trust.sslSecured': 'SSL Secured',
    'trust.trustedVendor': 'Trusted Vendor',
    'trust.verifiedSeller': 'Verified Seller',
    'trust.verifiedUser': 'Verified User',
    
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
    
    // Hero Section
    'hero.title': 'السوق الرقمي الرائد في أفريقيا',
    'hero.subtitle': 'اشترِ. بِع. استأجر. تعلّم. السوق الرقمي لأفريقيا.',
    'hero.description': 'من المنسوجات المصنوعة يدوياً إلى منتجات التجميل العضوية - تسوق من عناصر أصيلة من بائعين معتمدين عبر أفريقيا والشرق الأوسط.',
    'hero.getStarted': 'ابدأ الآن',
    'hero.exploreMarketplace': 'استكشف السوق',
    'hero.connecting': 'ربط أفريقيا والشرق الأوسط',
    'hero.shopNow': 'تسوق الآن',
    'hero.sellWithUs': 'ابدأ البيع',
    
    // Core Ecosystem Blocks
    'ecosystem.work.title': 'العمل',
    'ecosystem.work.subtitle': 'توظيف المستقلين',
    'ecosystem.work.description': 'ابحث عن محترفين مهرة لمشاريعك عبر أفريقيا والشرق الأوسط',
    'ecosystem.products.title': 'المنتجات',
    'ecosystem.products.subtitle': 'تسوق عناصر مذهلة',
    'ecosystem.products.description': 'اكتشف المنتجات الأفريقية الأصيلة من بائعين موثوقين',
    'ecosystem.network.title': 'الشبكة',
    'ecosystem.network.subtitle': 'اتصالات الأعمال',
    'ecosystem.network.description': 'تواصل مع التجار والموزعين وشركاء الأعمال',
    'ecosystem.learn.title': 'تعلم',
    'ecosystem.learn.subtitle': 'طور مهاراتك',
    'ecosystem.learn.description': 'الوصول إلى الدورات التعليمية والمحتوى التعليمي',
    
    // User Types
    'userTypes.buyer': 'مشتري',
    'userTypes.seller': 'بائع',
    'userTypes.freelancer': 'مستقل',
    'userTypes.client': 'عميل',
    'userTypes.producer': 'منتج',
    'userTypes.distributor': 'موزع',
    'userTypes.learner': 'متعلم',
    'userTypes.educator': 'معلم',
    
    // Trust & Security
    'trust.verified': 'موثوق',
    'trust.sslSecured': 'مؤمن بواسطة SSL',
    'trust.trustedVendor': 'بائع موثوق',
    'trust.verifiedSeller': 'بائع موثوق',
    'trust.verifiedUser': 'مستخدم موثوق',
    
    // Main page
    'hero.titleHighlight': 'أفريقية مذهلة',
    'hero.description2': 'من المنسوجات المصنوعة يدوياً إلى منتجات التجميل العضوية - تسوق من عناصر أصيلة من بائعين معتمدين عبر أفريقيا والشرق الأوسط.',
    // Note: hero.shopNow, hero.sellWithUs, and hero.getStarted are already defined above
    
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
    
    // Hero Section
    'hero.title': 'Le marché numérique de premier plan en Afrique',
    'hero.subtitle': 'Acheter. Vendre. Embaucher. Apprendre. Le marché numérique pour l\'Afrique.',
    'hero.description': 'Des textiles artisanaux aux produits de beauté biologiques - achetez des articles authentiques de vendeurs vérifiés à travers l\'Afrique et le Moyen-Orient.',
    'hero.getStarted': 'Commencer',
    'hero.exploreMarketplace': 'Explorer le Marché',
    'hero.connecting': 'Connecter l\'Afrique et le Moyen-Orient',
    'hero.shopNow': 'Acheter Maintenant',
    'hero.sellWithUs': 'Commencer à Vendre',
    
    // Core Ecosystem Blocks
    'ecosystem.work.title': 'Travail',
    'ecosystem.work.subtitle': 'Embaucher des freelances',
    'ecosystem.work.description': 'Trouvez des professionnels qualifiés pour vos projets à travers l\'Afrique et le Moyen-Orient',
    'ecosystem.products.title': 'Produits',
    'ecosystem.products.subtitle': 'Acheter des articles incroyables',
    'ecosystem.products.description': 'Découvrez des produits africains authentiques de vendeurs vérifiés',
    'ecosystem.network.title': 'Réseau',
    'ecosystem.network.subtitle': 'Connexions d\'affaires',
    'ecosystem.network.description': 'Connectez-vous avec des commerçants, des distributeurs et des partenaires commerciaux',
    'ecosystem.learn.title': 'Apprendre',
    'ecosystem.learn.subtitle': 'Développez vos compétences',
    'ecosystem.learn.description': 'Accédez à des micro-cours et à du contenu éducatif',
    
    // User Types
    'userTypes.buyer': 'Acheteur',
    'userTypes.seller': 'Vendeur',
    'userTypes.freelancer': 'Freelance',
    'userTypes.client': 'Client',
    'userTypes.producer': 'Producteur',
    'userTypes.distributor': 'Distributeur',
    'userTypes.learner': 'Apprenant',
    'userTypes.educator': 'Éducateur',
    
    // Trust & Security
    'trust.verified': 'Vérifié',
    'trust.sslSecured': 'Sécurisé par SSL',
    'trust.trustedVendor': 'Vendeur de confiance',
    'trust.verifiedSeller': 'Vendeur vérifié',
    'trust.verifiedUser': 'Utilisateur vérifié',
    
    // Main page
    'hero.title2': 'Découvrez d\'incroyables',
    'hero.titleHighlight': 'Produits Africains',
    'hero.subtitle2': 'Des textiles artisanaux aux produits de beauté biologiques - achetez des articles authentiques de vendeurs vérifiés à travers l\'Afrique et le Moyen-Orient.',
    // hero.connecting, hero.shopNow, hero.sellWithUs, hero.getStarted, and hero.exploreMarketplace are already defined above
    
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
    
    // Hero Section
    'hero.title': 'O principal mercado digital da África',
    'hero.subtitle': 'Comprar. Vender. Contratar. Aprender. O mercado digital para a África.',
    'hero.description': 'De têxteis artesanais a produtos de beleza orgânicos - compre itens autênticos de vendedores verificados através de África e Médio Oriente.',
    'hero.getStarted': 'Começar',
    'hero.exploreMarketplace': 'Explorar Mercado',
    'hero.connecting': 'Conectando África e Médio Oriente',
    'hero.shopNow': 'Comprar Agora',
    'hero.sellWithUs': 'Começar a Vender',
    
    // Core Ecosystem Blocks
    'ecosystem.work.title': 'Trabalho',
    'ecosystem.work.subtitle': 'Contratar Freelancers',
    'ecosystem.work.description': 'Encontre profissionais qualificados para seus projetos através de África e Médio Oriente',
    'ecosystem.products.title': 'Produtos',
    'ecosystem.products.subtitle': 'Compre Itens Incríveis',
    'ecosystem.products.description': 'Descubra produtos africanos autênticos de vendedores verificados',
    'ecosystem.network.title': 'Rede',
    'ecosystem.network.subtitle': 'Conexões de Negócios',
    'ecosystem.network.description': 'Conecte-se com comerciantes, distribuidores e parceiros de negócios',
    'ecosystem.learn.title': 'Aprender',
    'ecosystem.learn.subtitle': 'Desenvolva suas Habilidades',
    'ecosystem.learn.description': 'Acesse micro-cursos e conteúdo educacional',
    
    // User Types
    'userTypes.buyer': 'Comprador',
    'userTypes.seller': 'Vendedor',
    'userTypes.freelancer': 'Freelancer',
    'userTypes.client': 'Cliente',
    'userTypes.producer': 'Produtor',
    'userTypes.distributor': 'Distribuidor',
    'userTypes.learner': 'Aprendiz',
    'userTypes.educator': 'Educador',
    
    // Trust & Security
    'trust.verified': 'Verificado',
    'trust.sslSecured': 'Protegido por SSL',
    'trust.trustedVendor': 'Vendedor de Confiança',
    'trust.verifiedSeller': 'Vendedor Verificado',
    'trust.verifiedUser': 'Usuário Verificado',
    
    // Main page
    'hero.title2': 'Descubra Incríveis',
    'hero.titleHighlight': 'Produtos Africanos',
    'hero.subtitle2': 'De têxteis artesanais a produtos de beleza orgânicos - compre itens autênticos de vendedores verificados através de África e Médio Oriente.',
    // Note: hero.connecting, hero.shopNow, hero.sellWithUs, hero.getStarted, and hero.exploreMarketplace are already defined above
    
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
    
    // Hero Section
    'hero.title': 'Soko Kuu la Kidijitali la Afrika',
    'hero.subtitle': 'Nunua. Uza. Ajiri. Jifunze. Soko la Kidijitali kwa Afrika.',
    'hero.description': 'Kutoka vitambaa vya mikono hadi bidhaa za urembo wa asili - nunua vitu halisi kutoka kwa wauzaji walioidhinishwa kote Afrika na Mashariki ya Kati.',
    'hero.getStarted': 'Anza Sasa',
    'hero.exploreMarketplace': 'Chunguza Soko',
    'hero.connecting': 'Kuunganisha Afrika na Mashariki ya Kati',
    'hero.shopNow': 'Nunua Sasa',
    'hero.sellWithUs': 'Anza Kuuza',
    
    // Core Ecosystem Blocks
    'ecosystem.work.title': 'Kazi',
    'ecosystem.work.subtitle': 'Ajiri Wajiriwa Huru',
    'ecosystem.work.description': 'Pata wataalamu wenye ujuzi kwa ajili ya المشاريع yako kote Afrika na Mashariki ya Kati',
    'ecosystem.products.title': 'Bidhaa',
    'ecosystem.products.subtitle': 'Nunua Vitu vya Kuvutia',
    'ecosystem.products.description': 'Gundua bidhaa halisi za Kiafrika kutoka kwa wauzaji walioidhinishwa',
    'ecosystem.network.title': 'Mtandao',
    'ecosystem.network.subtitle': 'Mawasiliano ya Kibiashara',
    'ecosystem.network.description': 'Unganisha na wafanyabiashara, wasambazaji, na washirika wa biashara',
    'ecosystem.learn.title': 'Jifunze',
    'ecosystem.learn.subtitle': 'Panua Ujuzi Wako',
    'ecosystem.learn.description': 'Fikia kozi ndogo na maudhui ya kielimu',
    
    // User Types
    'userTypes.buyer': 'Mnunuzi',
    'userTypes.seller': 'Muuza',
    'userTypes.freelancer': 'Mtu Huru',
    'userTypes.client': 'Mteja',
    'userTypes.producer': 'Mtengenezaji',
    'userTypes.distributor': 'Msimbo',
    'userTypes.learner': 'Mwanafunzi',
    'userTypes.educator': 'Mwalimu',
    
    // Trust & Security
    'trust.verified': 'Imethibitishwa',
    'trust.sslSecured': 'Iliyo Salama na SSL',
    'trust.trustedVendor': 'Muuza Anayeaminika',
    'trust.verifiedSeller': 'Muuza Aliyehakikishwa',
    'trust.verifiedUser': 'Mtumiaji Aliyehakikishwa',
    
    // Main page
    'hero.title2': 'Gundua',
    'hero.titleHighlight': 'Bidhaa za Kiafrika',
    'hero.subtitle2': 'Kutoka vitambaa vya mikono hadi bidhaa za urembo wa asili - nunua vitu halisi kutoka kwa wauzaji walioidhinishwa kote Afrika na Mashariki ya Kati.',
    // Note: hero.shopNow, hero.sellWithUs, hero.getStarted, and hero.exploreMarketplace are already defined above
    
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
