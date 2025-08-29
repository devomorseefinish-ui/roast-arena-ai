import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, 
  Star, 
  Filter,
  Search,
  Tag,
  Zap,
  Trophy,
  Users
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PaymentModal } from "@/components/payment/PaymentModal";

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price_ngn: number;
  price_sol: number;
  category: string;
  rating: number;
  image_url: string;
  seller: string;
  in_stock: boolean;
}

const mockItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "Premium Roast Boost",
    description: "Boost your roast to reach 10x more users",
    price_ngn: 5000,
    price_sol: 0.05,
    category: "boosts",
    rating: 4.8,
    image_url: "",
    seller: "SeeFinish",
    in_stock: true
  },
  {
    id: "2", 
    name: "Debate Champion Badge",
    description: "Exclusive badge for debate winners",
    price_ngn: 15000,
    price_sol: 0.15,
    category: "badges",
    rating: 4.9,
    image_url: "",
    seller: "SeeFinish",
    in_stock: true
  },
  {
    id: "3",
    name: "VIP Profile Theme",
    description: "Stand out with premium profile themes",
    price_ngn: 8000,
    price_sol: 0.08,
    category: "themes",
    rating: 4.7,
    image_url: "",
    seller: "SeeFinish", 
    in_stock: true
  }
];

const Marketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems);
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState<'ngn' | 'sol'>('ngn');
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    item: MarketplaceItem | null;
  }>({ open: false, item: null });
  const { user } = useAuth();

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, items]);

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const handlePurchase = (item: MarketplaceItem) => {
    if (!user) {
      // Redirect to auth
      return;
    }

    setPaymentModal({ open: true, item });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'boosts':
        return <Zap className="h-4 w-4" />;
      case 'badges':
        return <Trophy className="h-4 w-4" />;
      case 'themes':
        return <Tag className="h-4 w-4" />;
      default:
        return <ShoppingCart className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Enhance your SeeFinish experience with premium items</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search items..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="boosts">Boosts</SelectItem>
                  <SelectItem value="badges">Badges</SelectItem>
                  <SelectItem value="themes">Themes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCurrency} onValueChange={(value: 'ngn' | 'sol') => setSelectedCurrency(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngn">NGN (₦)</SelectItem>
                  <SelectItem value="sol">SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {selectedCurrency === 'ngn' 
                      ? `₦${item.price_ngn.toLocaleString()}`
                      : `${item.price_sol} SOL`}
                  </div>
                  <p className="text-xs text-muted-foreground">by {item.seller}</p>
                </div>

                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={!item.in_stock || !user}
                  className="w-full bg-gradient-primary text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {!user ? "Sign In to Purchase" : item.in_stock ? "Purchase" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Items Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}

        {/* Payment Modal */}
        {paymentModal.item && (
          <PaymentModal
            open={paymentModal.open}
            onOpenChange={(open) => setPaymentModal({ open, item: null })}
            amount={selectedCurrency === 'ngn' ? paymentModal.item.price_ngn : paymentModal.item.price_sol}
            currency={selectedCurrency}
            onSuccess={() => {
              // Handle successful purchase
              setPaymentModal({ open: false, item: null });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Marketplace;