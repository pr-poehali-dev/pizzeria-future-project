import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Pizza {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const pizzas: Pizza[] = [
    { id: 1, name: 'Маргарита', description: 'Томатный соус, моцарелла, базилик', price: 450, category: 'classic', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b790a349-d904-4773-8997-e09e29bef7da.jpg' },
    { id: 2, name: 'Пепперони', description: 'Томатный соус, моцарелла, пепперони', price: 550, category: 'classic', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/d7cf5749-edbd-4628-ac42-82dee5534044.jpg' },
    { id: 3, name: 'Четыре сыра', description: 'Моцарелла, пармезан, горгонзола, чеддер', price: 600, category: 'classic', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b8a8b32a-2519-4d30-b3af-0f918c308261.jpg' },
    { id: 4, name: 'Мясная', description: 'Томатный соус, говядина, бекон, ветчина, курица', price: 650, category: 'meat', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b790a349-d904-4773-8997-e09e29bef7da.jpg' },
    { id: 5, name: 'Барбекю', description: 'Соус барбекю, курица, бекон, лук', price: 620, category: 'meat', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/d7cf5749-edbd-4628-ac42-82dee5534044.jpg' },
    { id: 6, name: 'Вегетарианская', description: 'Томаты, перец, оливки, грибы, лук', price: 500, category: 'veg', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b8a8b32a-2519-4d30-b3af-0f918c308261.jpg' },
    { id: 7, name: 'Гавайская', description: 'Томатный соус, ветчина, ананасы, моцарелла', price: 580, category: 'special', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b790a349-d904-4773-8997-e09e29bef7da.jpg' },
    { id: 8, name: 'Фирменная', description: 'Сливочный соус, креветки, лосось, пармезан', price: 850, category: 'special', image: 'https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/d7cf5749-edbd-4628-ac42-82dee5534044.jpg' },
  ];

  const reviews = [
    { id: 1, name: 'Анна', rating: 5, text: 'Лучшая пицца в городе! Доставка быстрая, все горячее и вкусное.' },
    { id: 2, name: 'Дмитрий', rating: 5, text: 'Заказываем регулярно. Качество всегда на высоте!' },
    { id: 3, name: 'Елена', rating: 4, text: 'Очень вкусно, единственное - хотелось бы больше акций.' },
  ];

  const addToCart = (pizza: Pizza) => {
    const existingItem = cart.find(item => item.id === pizza.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    toast.success(`${pizza.name} добавлена в корзину`);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    setCart([]);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-2xl">
                🍕
              </div>
              <h1 className="text-2xl font-bold text-primary">PizzaHouse</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className={`hover:text-primary transition-colors ${activeSection === 'home' ? 'text-primary' : ''}`}>Главная</button>
              <button onClick={() => scrollToSection('menu')} className={`hover:text-primary transition-colors ${activeSection === 'menu' ? 'text-primary' : ''}`}>Меню</button>
              <button onClick={() => scrollToSection('about')} className={`hover:text-primary transition-colors ${activeSection === 'about' ? 'text-primary' : ''}`}>О нас</button>
              <button onClick={() => scrollToSection('delivery')} className={`hover:text-primary transition-colors ${activeSection === 'delivery' ? 'text-primary' : ''}`}>Доставка</button>
              <button onClick={() => scrollToSection('reviews')} className={`hover:text-primary transition-colors ${activeSection === 'reviews' ? 'text-primary' : ''}`}>Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className={`hover:text-primary transition-colors ${activeSection === 'contacts' ? 'text-primary' : ''}`}>Контакты</button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Icon name="Plus" size={12} />
                              </Button>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <form onSubmit={handleOrder} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" required />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" type="tel" required />
                          </div>
                          <div>
                            <Label htmlFor="address">Адрес доставки</Label>
                            <Textarea id="address" required />
                          </div>
                          <Button type="submit" className="w-full">
                            Оформить заказ
                          </Button>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="relative py-32 md:py-48 overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-red-50">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-red-500/15 to-orange-600/15"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOTczMTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEzIDAgNiAyLjY4NyA2IDZzLTIuNjg3IDYtNiA2LTYtMi42ODctNi02IDIuNjg3LTYgNi02ek0yNCA0MmMzLjMxMyAwIDYgMi42ODcgNiA2cy0yLjY4NyA2LTYgNi02LTIuNjg3LTYtNiAyLjY4Ny02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold flex items-center gap-2">
                <Icon name="Sparkles" size={16} />
                Акция: Каждая 3-я пицца в подарок!
              </p>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Настоящая итальянская пицца
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Приготовлено с любовью в дровяной печи. Доставка за 30 минут или пицца в подарок!
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105" onClick={() => scrollToSection('menu')}>
                <Icon name="UtensilsCrossed" size={20} className="mr-2" />
                Смотреть меню
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-all" onClick={() => scrollToSection('delivery')}>
                <Icon name="Truck" size={20} className="mr-2" />
                Условия доставки
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                  🔥
                </div>
                <p className="font-bold text-lg mb-1">Дровяная печь</p>
                <p className="text-sm text-muted-foreground">Традиционная готовка</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.15)] transition-all hover:scale-105 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-[0_8px_20px_rgba(249,115,22,0.4)]">
                  ⏱️
                </div>
                <p className="font-bold text-lg mb-1">30 минут</p>
                <p className="text-sm text-muted-foreground">Быстрая доставка</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.15)] transition-all hover:scale-105 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-[0_8px_20px_rgba(249,115,22,0.4)]">
                  ✨
                </div>
                <p className="font-bold text-lg mb-1">Свежие продукты</p>
                <p className="text-sm text-muted-foreground">Только натуральное</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-24 bg-gradient-to-b from-orange-50/50 to-orange-100/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold text-sm">МЕНЮ</p>
            </div>
            <h2 className="text-5xl font-bold mb-4">Наше меню</h2>
            <p className="text-xl text-muted-foreground">Выберите свою любимую пиццу</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="classic">Классика</TabsTrigger>
              <TabsTrigger value="meat">Мясные</TabsTrigger>
              <TabsTrigger value="veg">Вегетарианские</TabsTrigger>
              <TabsTrigger value="special">Фирменные</TabsTrigger>
            </TabsList>

            {['all', 'classic', 'meat', 'veg', 'special'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pizzas
                    .filter(pizza => category === 'all' || pizza.category === category)
                    .map((pizza) => (
                      <Card key={pizza.id} className="group overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(249,115,22,0.25)] transition-all duration-300 animate-scale-in border-2 hover:border-primary/30 hover:-translate-y-2 bg-white">
                        <CardHeader className="p-0 relative overflow-hidden">
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-secondary shadow-[0_4px_14px_rgba(234,56,76,0.4)]">{pizza.price} ₽</Badge>
                          </div>
                          <img src={pizza.image} alt={pizza.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </CardHeader>
                        <CardContent className="p-5">
                          <CardTitle className="mb-3 text-xl">{pizza.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pizza.description}</p>
                        </CardContent>
                        <CardFooter className="p-5 pt-0">
                          <Button className="w-full shadow-[0_4px_14px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)] transition-all group-hover:scale-105" onClick={() => addToCart(pizza)}>
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-24 bg-gradient-to-b from-orange-100/40 to-orange-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <p className="text-primary font-semibold text-sm">О НАС</p>
              </div>
              <h2 className="text-5xl font-bold mb-6">История PizzaHouse</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  PizzaHouse — это семейная пиццерия с 15-летней историей. Мы используем только натуральные ингредиенты 
                  и готовим каждую пиццу в настоящей дровяной печи, привезенной из Италии.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Наши повара прошли обучение у лучших итальянских мастеров, и мы гордимся тем, что создаем 
                  для вас настоящую итальянскую пиццу с душой и любовью.
                </p>
                <div className="flex gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">15+</p>
                    <p className="text-sm text-muted-foreground">лет опыта</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">50k+</p>
                    <p className="text-sm text-muted-foreground">довольных клиентов</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-1">100%</p>
                    <p className="text-sm text-muted-foreground">натуральные продукты</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                <img src="https://cdn.poehali.dev/projects/99128641-b011-4523-9d26-76033c834c43/files/b790a349-d904-4773-8997-e09e29bef7da.jpg" alt="Наша пиццерия" className="relative rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.25)] w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-24 bg-gradient-to-b from-orange-50/50 to-orange-100/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold text-sm">ДОСТАВКА</p>
            </div>
            <h2 className="text-5xl font-bold mb-4">Доставка</h2>
            <p className="text-xl text-muted-foreground">Быстро и горячо к вашему порогу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                  <Icon name="Clock" size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">30 минут</h3>
                <p className="text-muted-foreground text-lg">
                  Доставка за полчаса или пицца в подарок
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                  <Icon name="MapPin" size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Зона доставки</h3>
                <p className="text-muted-foreground text-lg">
                  Бесплатная доставка в радиусе 5 км
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                  <Icon name="DollarSign" size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Минимальный заказ</h3>
                <p className="text-muted-foreground text-lg">
                  От 500 ₽ для бесплатной доставки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 bg-gradient-to-b from-orange-100/40 to-orange-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,56,76,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold text-sm">ОТЗЫВЫ</p>
            </div>
            <h2 className="text-5xl font-bold mb-4">Что говорят клиенты</h2>
            <p className="text-xl text-muted-foreground">Более 10,000 довольных гостей</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="border-2 hover:border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(234,56,76,0.2)] transition-all hover:-translate-y-2 bg-white">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg italic leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{review.name}</p>
                      <p className="text-sm text-muted-foreground">Постоянный клиент</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 bg-gradient-to-b from-orange-50/50 to-orange-100/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <p className="text-primary font-semibold text-sm">КОНТАКТЫ</p>
              </div>
              <h2 className="text-5xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground">Мы всегда рады вашим вопросам</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card className="border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                    <Icon name="Phone" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Телефон</h3>
                  <p className="text-muted-foreground text-lg font-medium">+7 (495) 123-45-67</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                    <Icon name="MapPin" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Адрес</h3>
                  <p className="text-muted-foreground text-lg">г. Москва, ул. Пиццы, д. 1</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.25)] transition-all hover:-translate-y-2 group bg-white">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                    <Icon name="Clock" size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Режим работы</h3>
                  <p className="text-muted-foreground text-lg">Ежедневно 10:00 - 23:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-2xl">
                    🍕
                  </div>
                  <span className="text-2xl font-bold">PizzaHouse</span>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Настоящая итальянская пицца с 2009 года. Готовим с любовью для вас каждый день.
                </p>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer transition-all">
                    <Icon name="Instagram" size={20} />
                  </div>
                  <div className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer transition-all">
                    <Icon name="Facebook" size={20} />
                  </div>
                  <div className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center cursor-pointer transition-all">
                    <Icon name="Youtube" size={20} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Навигация</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => scrollToSection('menu')} className="text-white/70 hover:text-primary transition-colors">Меню</button></li>
                  <li><button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-primary transition-colors">О нас</button></li>
                  <li><button onClick={() => scrollToSection('delivery')} className="text-white/70 hover:text-primary transition-colors">Доставка</button></li>
                  <li><button onClick={() => scrollToSection('contacts')} className="text-white/70 hover:text-primary transition-colors">Контакты</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Контакты</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    +7 (495) 123-45-67
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    info@pizzahouse.ru
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="MapPin" size={16} className="mt-1" />
                    г. Москва, ул. Пиццы, д. 1
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-white/50">© 2024 PizzaHouse. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;