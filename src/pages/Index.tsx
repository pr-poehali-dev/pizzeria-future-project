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

      <section id="home" className="relative py-20 md:py-32 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Настоящая итальянская пицца
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Приготовлено с любовью в дровяной печи. Доставка за 30 минут или пицца в подарок!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('menu')}>
                Смотреть меню
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('delivery')}>
                Условия доставки
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <p className="font-semibold">Дровяная печь</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⏱️</div>
                <p className="font-semibold">30 минут</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">✨</div>
                <p className="font-semibold">Свежие продукты</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наше меню</h2>
            <p className="text-muted-foreground">Выберите свою любимую пиццу</p>
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
                      <Card key={pizza.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                        <CardHeader className="p-0">
                          <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="mb-2">{pizza.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-4">{pizza.description}</p>
                          <p className="text-2xl font-bold text-primary">{pizza.price} ₽</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" onClick={() => addToCart(pizza)}>
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

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-6">
              PizzaHouse — это семейная пиццерия с 15-летней историей. Мы используем только натуральные ингредиенты 
              и готовим каждую пиццу в настоящей дровяной печи, привезенной из Италии.
            </p>
            <p className="text-lg text-muted-foreground">
              Наши повара прошли обучение у лучших итальянских мастеров, и мы гордимся тем, что создаем 
              для вас настоящую итальянскую пиццу с душой и любовью.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Доставка</h2>
            <p className="text-muted-foreground">Быстро и горячо к вашему порогу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">30 минут</h3>
                <p className="text-muted-foreground">
                  Доставка за полчаса или пицца в подарок
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Зона доставки</h3>
                <p className="text-muted-foreground">
                  Бесплатная доставка в радиусе 5 км
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="DollarSign" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Минимальный заказ</h3>
                <p className="text-muted-foreground">
                  От 500 ₽ для бесплатной доставки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы</h2>
            <p className="text-muted-foreground">Что говорят наши клиенты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Пиццы, д. 1</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Ежедневно 10:00 - 23:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xl">
              🍕
            </div>
            <span className="text-xl font-bold">PizzaHouse</span>
          </div>
          <p className="text-background/70">© 2024 PizzaHouse. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;