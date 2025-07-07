import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowLeft, Star, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceSelection from "@/components/ServiceSelection";
import { Service } from "@/types/Event";

const Booking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Mock data pour le prestataire
  const provider = {
    id: 1,
    name: "Dr. Sarah Martin",
    profession: "Médecin généraliste",
    rating: 4.8,
    reviews: 124,
    description: "Médecin généraliste avec plus de 10 ans d'expérience. Spécialisée dans le suivi médical global et la prévention.",
    location: "Paris 8ème",
    email: "sarah.martin@cabinet-medical.fr",
    phone: "+33 1 42 25 18 90",
    services: [
      { 
        id: "1", 
        name: "Consultation générale", 
        duration: "30 min", 
        price: 60, 
        description: "Consultation médicale complète",
        category: "Consultation"
      },
      { 
        id: "2", 
        name: "Consultation de suivi", 
        duration: "20 min", 
        price: 45, 
        description: "Suivi médical régulier",
        category: "Consultation"
      },
      { 
        id: "3", 
        name: "Consultation préventive", 
        duration: "45 min", 
        price: 80, 
        description: "Bilan de santé préventif",
        category: "Consultation"
      }
    ]
  };

  const availableSlots = [
    { date: "2024-01-20", times: ["09:00", "10:30", "14:00", "15:30"] },
    { date: "2024-01-21", times: ["09:30", "11:00", "16:00"] },
    { date: "2024-01-22", times: ["10:00", "14:30", "16:30"] }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      alert("Veuillez sélectionner un service, une date et une heure");
      return;
    }
    
    // Ici on simulerait la réservation
    alert(`Rendez-vous réservé pour ${selectedService.name} le ${selectedDate} à ${selectedTime}`);
    navigate("/dashboard-user");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard-user")}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">AppointmentPro</span>
            </div>
            <span className="text-muted-foreground">/ Réservation</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Provider Info */}
        <Card className="p-8 mb-8 bg-gradient-card border-0 shadow-soft">
          <div className="flex items-start space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-3">
                <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-warning fill-current" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviews} avis)</span>
                </div>
              </div>
              
              <p className="text-xl text-primary font-medium mb-4">{provider.profession}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed">{provider.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{provider.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{provider.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{provider.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services & Booking */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="services" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="selection">Sélection</TabsTrigger>
                <TabsTrigger value="booking">Réservation</TabsTrigger>
              </TabsList>

              <TabsContent value="services">
                <Card className="p-6 bg-background border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Services proposés</h3>
                  <ServiceSelection 
                    services={provider.services}
                    selectedService={selectedService}
                    onServiceSelect={setSelectedService}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="selection">
                <Card className="p-6 bg-background border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Service sélectionné</h3>
                  {selectedService ? (
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{selectedService.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{selectedService.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{selectedService.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg font-bold text-primary">{selectedService.price}€</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Veuillez d'abord sélectionner un service dans l'onglet "Services"
                    </p>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="booking">
                <Card className="p-6 bg-background border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Choisir un créneau</h3>
                  
                  {/* Date Selection */}
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-4">Sélectionner une date</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.date}
                          onClick={() => {
                            setSelectedDate(slot.date);
                            setSelectedTime("");
                          }}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            selectedDate === slot.date
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="font-medium">{formatDate(slot.date)}</div>
                          <div className="text-sm text-muted-foreground">
                            {slot.times.length} créneaux
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="mb-6">
                      <h4 className="font-medium text-foreground mb-4">Sélectionner une heure</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableSlots
                          .find(slot => slot.date === selectedDate)
                          ?.times.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                selectedTime === time
                                  ? "border-primary bg-primary text-white"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-6 bg-background border border-border sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-6">Récapitulatif</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prestataire</span>
                  <span className="font-medium">{provider.name}</span>
                </div>
                
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                )}
                
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Heure</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">
                    {selectedService?.name || "Aucun service sélectionné"}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {selectedService?.price || 0}€
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || !selectedService}
                className="w-full bg-gradient-primary text-white hover:opacity-90 h-11"
              >
                Confirmer la réservation
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Vous recevrez une confirmation par email
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;