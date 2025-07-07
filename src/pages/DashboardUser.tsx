import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, User, ArrowLeft, Bell, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  type: string;
  id: string;
  name: string;
  phone?: string;
}

const DashboardUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== 'user') {
      navigate('/login');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const mockProviders = [
    { 
      id: 1, 
      name: "Dr. Sarah Martin", 
      profession: "Médecin généraliste",
      rating: 4.8,
      reviews: 124,
      price: "60€",
      available: "Aujourd'hui",
      description: "Consultation générale et suivi médical"
    },
    { 
      id: 2, 
      name: "Marie Dubois", 
      profession: "Coach personnel",
      rating: 4.9,
      reviews: 87,
      price: "45€",
      available: "Demain",
      description: "Accompagnement sportif et bien-être"
    },
    { 
      id: 3, 
      name: "Jean Leclerc", 
      profession: "Consultant digital",
      rating: 4.7,
      reviews: 156,
      price: "80€",
      available: "Cette semaine",
      description: "Stratégie digitale et marketing"
    }
  ];

  const mockAppointments = [
    { id: 1, provider: "Dr. Sarah Martin", date: "2024-01-20", time: "14:00", status: "confirmed", service: "Consultation générale" },
    { id: 2, provider: "Marie Dubois", date: "2024-01-25", time: "10:30", status: "pending", service: "Séance coaching" }
  ];

  const filteredProviders = mockProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">AppointmentPro</span>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                Client
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Client</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground">
            Trouvez et réservez vos rendez-vous en quelques clics
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="providers">Prestataires</TabsTrigger>
            <TabsTrigger value="appointments">Mes RDV</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-6">
            {/* Search Bar */}
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un prestataire ou une spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </Card>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="p-6 bg-background border border-border hover:shadow-medium transition-all group">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {provider.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {provider.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-primary font-medium mb-2">{provider.profession}</p>
                      <p className="text-muted-foreground text-sm mb-4">{provider.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-foreground">{provider.price}</span>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            {provider.available}
                          </Badge>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-gradient-primary text-white hover:opacity-90"
                          onClick={() => navigate(`/booking/${provider.id}`)}
                        >
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Mes rendez-vous</h2>
            </div>

            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6 bg-background border border-border hover:shadow-medium transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{appointment.provider}</h3>
                        <p className="text-muted-foreground text-sm">{appointment.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-foreground">{appointment.date}</p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                      </div>
                      <Badge 
                        variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                        className={appointment.status === 'confirmed' ? 'bg-success text-success-foreground' : ''}
                      >
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-8 text-center bg-gradient-card border-0 shadow-soft">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Historique des rendez-vous
              </h3>
              <p className="text-muted-foreground mb-6">
                Consultez l'historique de tous vos rendez-vous passés
              </p>
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                Voir l'historique complet
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardUser;