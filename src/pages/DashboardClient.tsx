import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Settings, Bell, Plus, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import AvailabilityDisplay from "@/components/AvailabilityDisplay";
import EventCreation from "@/components/EventCreation";
import EventsList from "@/components/EventsList";
import ServiceManagement from "@/components/ServiceManagement";
import { Event, Service } from "@/types/Event";

interface User {
  email: string;
  type: string;
  id: string;
  name: string;
  phone?: string;
  profession?: string;
  description?: string;
  company?: string;
}

interface TimeSlot {
  day: string;
  hour: string;
  date: string;
}

const DashboardClient = () => {
  const [user, setUser] = useState<User | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== 'client') {
      navigate('/login');
      return;
    }
    
    setUser(parsedUser);

    // Charger les créneaux sauvegardés
    const savedSlots = localStorage.getItem(`availability_${parsedUser.id}`);
    if (savedSlots) {
      setAvailableSlots(JSON.parse(savedSlots));
    }

    // Charger les événements sauvegardés
    const savedEvents = localStorage.getItem(`events_${parsedUser.id}`);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    // Charger les services sauvegardés
    const savedServices = localStorage.getItem(`services_${parsedUser.id}`);
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSlotsConfirm = (newSlots: TimeSlot[]) => {
    const updatedSlots = [...availableSlots, ...newSlots];
    setAvailableSlots(updatedSlots);
    
    // Sauvegarder dans localStorage
    if (user) {
      localStorage.setItem(`availability_${user.id}`, JSON.stringify(updatedSlots));
    }
  };

  const handleRemoveSlot = (slotToRemove: TimeSlot) => {
    const updatedSlots = availableSlots.filter(slot => 
      !(slot.day === slotToRemove.day && 
        slot.hour === slotToRemove.hour && 
        slot.date === slotToRemove.date)
    );
    setAvailableSlots(updatedSlots);
    
    // Sauvegarder dans localStorage
    if (user) {
      localStorage.setItem(`availability_${user.id}`, JSON.stringify(updatedSlots));
    }
  };

  const handleEventCreate = (newEvent: Event) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    
    if (user) {
      localStorage.setItem(`events_${user.id}`, JSON.stringify(updatedEvents));
    }
  };

  const handleEventDelete = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    
    if (user) {
      localStorage.setItem(`events_${user.id}`, JSON.stringify(updatedEvents));
    }
  };

  const handleServiceCreate = (newService: Service) => {
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    
    if (user) {
      localStorage.setItem(`services_${user.id}`, JSON.stringify(updatedServices));
    }
  };

  const handleServiceUpdate = (updatedService: Service) => {
    const updatedServices = services.map(service => 
      service.id === updatedService.id ? updatedService : service
    );
    setServices(updatedServices);
    
    if (user) {
      localStorage.setItem(`services_${user.id}`, JSON.stringify(updatedServices));
    }
  };

  const handleServiceDelete = (serviceId: string) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
    
    if (user) {
      localStorage.setItem(`services_${user.id}`, JSON.stringify(updatedServices));
    }
  };

  if (!user) return null;

  const mockAppointments = [
    { id: 1, client: "Marie Dubois", date: "2024-01-15", time: "14:00", status: "confirmed", service: "Consultation" },
    { id: 2, client: "Jean Martin", date: "2024-01-16", time: "10:30", status: "pending", service: "Suivi" },
    { id: 3, client: "Sophie Lambert", date: "2024-01-17", time: "16:00", status: "confirmed", service: "Consultation" }
  ];

  const mockStats = {
    totalAppointments: 47,
    thisMonth: 12,
    revenue: 2840,
    nextAppointment: "Aujourd'hui 14:00"
  };

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
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Prestataire
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.profession}</p>
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
            Gérez vos rendez-vous et développez votre activité
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total RDV</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalAppointments}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Ce mois</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.thisMonth}</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Revenus</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.revenue}€</p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <span className="text-success font-bold">€</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Prochain RDV</p>
                <p className="text-sm font-medium text-foreground">{mockStats.nextAppointment}</p>
              </div>
              <Bell className="w-8 h-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Statistiques</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Rendez-vous à venir</h2>
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau créneau
              </Button>
            </div>

            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6 bg-background border border-border hover:shadow-medium transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{appointment.client}</h3>
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
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="space-y-6">
              <WeeklyCalendar onSlotsConfirm={handleSlotsConfirm} />
              <AvailabilityDisplay 
                availableSlots={availableSlots} 
                onRemoveSlot={handleRemoveSlot}
              />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Mes événements</h2>
            </div>
            
            <div className="space-y-6">
              <EventCreation onEventCreate={handleEventCreate} />
              <EventsList events={events} onDeleteEvent={handleEventDelete} />
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceManagement 
              services={services}
              onServiceCreate={handleServiceCreate}
              onServiceUpdate={handleServiceUpdate}
              onServiceDelete={handleServiceDelete}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-8 text-center bg-gradient-card border-0 shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Statistiques et analyses
              </h3>
              <p className="text-muted-foreground mb-6">
                Suivez vos performances et analysez votre activité
              </p>
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                Voir les statistiques
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-8 text-center bg-gradient-card border-0 shadow-soft">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Paramètres du compte
              </h3>
              <p className="text-muted-foreground mb-6">
                Modifiez vos informations personnelles et préférences
              </p>
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                Modifier mon profil
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardClient;