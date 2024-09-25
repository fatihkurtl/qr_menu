'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Coffee, Cake, IceCream, Utensils, Facebook, Instagram, Twitter, Home, Menu, Star, MessageSquare, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import logo from '@/app/public/assets/logo-lavie.png'
import banner from '@/app/public/assets/banner-lavie.jpg'

type Product = {
  id: number
  name: { en: string; tr: string }
  description: { en: string; tr: string }
  price: number
  image: string
}

type Category = {
  id: number
  name: { en: string; tr: string }
  icon: React.ReactNode
  products: Product[]
}

const categories: Category[] = [
  {
    id: 1,
    name: { en: "Hot Drinks", tr: "Sıcak İçecekler" },
    icon: <Coffee className="h-6 w-6" />,
    products: [
      { id: 1, name: { en: "Espresso", tr: "Espresso" }, description: { en: "Strong black coffee", tr: "Sert siyah kahve" }, price: 2.50, image: "https://ideacdn.net/idea/bs/42/myassets/blogs/espresso-2awfexj-2.jpg?revision=1686819714" },
      { id: 2, name: { en: "Cappuccino", tr: "Kapuçino" }, description: { en: "Espresso with steamed milk foam", tr: "Köpüklü süt ile espresso" }, price: 3.50, image: "https://media.istockphoto.com/id/505168330/photo/cup-of-cafe-latte-with-coffee-beans-and-cinnamon-sticks.jpg?s=612x612&w=0&k=20&c=h7v8kAfWOpRapv6hrDwmmB54DqrGQWxlhP_mTeqTQPA=" },
    ]
  },
  {
    id: 2,
    name: { en: "Cold Drinks", tr: "Soğuk İçecekler" },
    icon: <IceCream className="h-6 w-6" />,
    products: [
      { id: 3, name: { en: "Iced Latte", tr: "Soğuk Latte" }, description: { en: "Espresso with cold milk and ice", tr: "Soğuk süt ve buz ile espresso" }, price: 4.00, image: "https://i.lezzet.com.tr/images-xxlarge-recipe/iced-latte-8e1c3714-933d-46a0-bf79-e768ab374f65.jpg" },
      { id: 4, name: { en: "Fruit Smoothie", tr: "Meyve Smoothie" }, description: { en: "Blended fresh fruits", tr: "Taze meyveler ile hazırlanmış" }, price: 5.00, image: "https://www.pcrm.org/sites/default/files/Fantastic-Fruit-Smoothie.jpeg" },
    ]
  },
  {
    id: 3,
    name: { en: "Dishes", tr: "Yemekler" },
    icon: <Utensils className="h-6 w-6" />,
    products: [
      { id: 5, name: { en: "Avocado Toast", tr: "Avokadolu Tost" }, description: { en: "Smashed avocado on artisan bread", tr: "Özel ekmek üzerine ezilmiş avokado" }, price: 8.00, image: "https://www.eatingwell.com/thmb/5WPPXV5n1fFOKXSeO8s3D2KXIGM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EatingWell-April-Avocado-Toast-Directions-03-23712072b7df44b8b3cd87681700e67b.jpg" },
      { id: 6, name: { en: "Chicken Salad", tr: "Tavuk Salatası" }, description: { en: "Grilled chicken with mixed greens", tr: "Izgara tavuk ve karışık yeşillikler" }, price: 10.00, image: "https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/4:3/w_5322,h_3991,c_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg" },
    ]
  },
  {
    id: 4,
    name: { en: "Desserts", tr: "Tatlılar" },
    icon: <Cake className="h-6 w-6" />,
    products: [
      { id: 7, name: { en: "Chocolate Cake", tr: "Çikolatalı Pasta" }, description: { en: "Rich chocolate layer cake", tr: "Zengin çikolatalı katlı pasta" }, price: 6.00, image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0A475B34-4E78-40D8-9F30-46223B7D77E7/Derivates/E55C7EA4-0E60-403F-B5DC-75EA358197BD.jpg" },
      { id: 8, name: { en: "Fruit Tart", tr: "Meyveli Tart" }, description: { en: "Seasonal fruits in a buttery crust", tr: "Tereyağlı hamur üzerinde mevsim meyveleri" }, price: 5.50, image: "https://hips.hearstapps.com/hmg-prod/images/fruit-tart-recipe-3-1650464619.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*" },
    ]
  },
]

const translations = {
  en: {
    home: "Home",
    menu: "Menu",
    featured: "Featured",
    feedback: "Feedback",
    categories: "Categories",
    followUs: "Follow Us",
    backToCategories: "Back to Categories",
  },
  tr: {
    home: "Ana Sayfa",
    menu: "Menü",
    featured: "Öne Çıkanlar",
    feedback: "Geribildirim",
    categories: "Kategoriler",
    followUs: "Bizi Takip Edin",
    backToCategories: "Kategorilere Dön",
  },
}

export default function RestaurantMenu() {
  const [language, setLanguage] = useState<'en' | 'tr'>('en')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [activeTab, setActiveTab] = useState('home')

  const t = (key: keyof typeof translations.en) => translations[language][key]

  useEffect(() => {
    if (activeTab !== 'menu') {
      setSelectedCategory(null)
    }
  }, [activeTab])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-green-600 text-primary-foreground">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="la vie logo"
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          {/* <h1 className="text-xl font-bold">La Vie</h1> */}
        </div>
        <Select value={language} onValueChange={(value: 'en' | 'tr') => setLanguage(value)}>
          <SelectTrigger className="w-[90px] bg-white text-gray-900">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="tr">Türkçe</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="m-0">
            <div className="p-4">
              <div className="mb-6">
                <Image
                  src={banner}
                  alt="la vie banner"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t('categories')}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center bg-white shadow-md"
                    onClick={() => {
                      setSelectedCategory(category)
                      setActiveTab('menu')
                    }}
                  >
                    {category.icon}
                    <span className="mt-2">{category.name[language]}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">{t('followUs')}</h3>
                <div className="flex space-x-2 items-center">
                  <a href="https://www.facebook.com/people/La-Vie/pfbid02yMYVQXqNSdFRAbiwRGTYpEynyXSf2heASYmbWWjZPtShMiFy6PGuaEqKDK8o9VBSl/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="">
                    {/* <Facebook className="h-6 w-6" /> */}
                    <Image src="https://www.svgrepo.com/show/183607/facebook.svg" alt="la vie facebook logo" width={30} height={30} className="" />
                  </a>
                  <a href="https://www.instagram.com/laviebursa/?igsh=MXBnM2RvdnlzYzZhcg%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="">
                    {/* <Instagram className="h-6 w-6" /> */}
                    <Image src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg" alt="la vie instagram logo" width={50} height={50} className="" />
                  </a>
                  <a href="https://www.yemeksepeti.com/restaurant/isj7/la-vie-dessert-and-coffee" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="">
                    {/* <Twitter className="h-6 w-6" /> */}
                    <Image src="https://seeklogo.com/images/Y/yemeksepeti-logo-835157C63D-seeklogo.com.png" alt="la vie yemek sepeti logo" width={40} height={40} className="" />
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="menu" className="m-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-4">
                {selectedCategory ? (
                  <>
                    <Button
                      variant="ghost"
                      className="mb-4 p-0"
                      onClick={() => setSelectedCategory(null)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t('backToCategories')}
                    </Button>
                    <h2 className="text-2xl font-bold mb-4">{selectedCategory.name[language]}</h2>
                    <div className="grid gap-4">
                      {selectedCategory.products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="flex">
                            <Image
                              src={product.image}
                              alt={product.name[language]}
                              width={100}
                              height={100}
                              className="w-1/3 object-cover"
                            />
                            <div className="p-4 w-2/3"> { /* overflow-hidden */}
                              <h3 className="font-bold">{product.name[language]}</h3>
                              <p className="text-sm text-gray-600">{product.description[language]}</p> { /* line-clamp-3 */}
                              <p className="mt-2 font-bold text-primary">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center bg-white shadow-md"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.icon}
                        <span className="mt-2">{category.name[language]}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="featured" className="m-0">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{t('featured')}</h2>
              {/* Add featured items here */}
            </div>
          </TabsContent>
          <TabsContent value="feedback" className="m-0">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{t('feedback')}</h2>
              {/* Add feedback form here */}
            </div>
          </TabsContent>
          <TabsList className="fixed bottom-0 left-0 right-0 h-16 grid grid-cols-4 bg-background border-t">
            <TabsTrigger value="home" className="data-[state=active]:text-primary">
              <Home className="h-5 w-5" />
              <span className="sr-only">{t('home')}</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:text-primary">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t('menu')}</span>
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:text-primary">
              <Star className="h-5 w-5" />
              <span className="sr-only">{t('featured')}</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:text-primary">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">{t('feedback')}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  )
}