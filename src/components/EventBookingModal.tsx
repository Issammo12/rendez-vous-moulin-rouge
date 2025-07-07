import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Users, Euro, Check, X, User } from "lucide-react";
import { Event } from "@/types/Event";

interface EventBookingModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: any) => void;
}

const EventBookingModal = ({ event, isOpen, onClose, onConfirm }: EventBookingModalProps) => {
  const [formData, setFormData] = useState({
    participantName: "",
    participantEmail: "",
    participantPhone: "",
    notes: "",
    numberOfPlaces: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.participantName || !formData.participantEmail) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.numberOfPlaces > (event?.places_restantes || 0)) {
      alert("Nombre de places demandé supérieur aux places disponibles");
      return;
    }

    const bookingData = {
      eventId: event?.id,
      eventTitle: event?.titre,
      eventDate: event?.date,
      eventTime: `${event?.debut} - ${event?.fin}`,
      participantName: formData.participantName,
      participantEmail: formData.participantEmail,
      participantPhone: formData.participantPhone,
      notes: formData.notes,
      numberOfPlaces: formData.numberOfPlaces,
      totalPrice: (event?.prix || 0) * formData.numberOfPlaces,
      bookingDate: new Date().toISOString()
    };

    onConfirm(bookingData);
    
    // Reset form
    setFormData({
      participantName: "",
      participantEmail: "",
      participantPhone: "",
      notes: "",
      numberOfPlaces: 1
    });
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Réserver un événement</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">{event.titre}</h3>
            {event.description && (
              <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>{event.debut} - {event.fin}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-success" />
                <span>{event.places_restantes} places disponibles</span>
              </div>
              
              {event.prix && event.prix > 0 && (
                <div className="flex items-center space-x-2">
                  <Euro className="w-4 h-4 text-warning" />
                  <span>{event.prix}€ par place</span>
                </div>
              )}
            </div>
          </Card>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participantName">Nom complet *</Label>
                <Input
                  id="participantName"
                  value={formData.participantName}
                  onChange={(e) => updateFormData("participantName", e.target.value)}
                  placeholder="Votre nom complet"
                  className="mt-2"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="participantEmail">Email *</Label>
                <Input
                  id="participantEmail"
                  type="email"
                  value={formData.participantEmail}
                  onChange={(e) => updateFormData("participantEmail", e.target.value)}
                  placeholder="votre@email.com"
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participantPhone">Téléphone</Label>
                <Input
                  id="participantPhone"
                  type="tel"
                  value={formData.participantPhone}
                  onChange={(e) => updateFormData("participantPhone", e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="numberOfPlaces">Nombre de places</Label>
                <Input
                  id="numberOfPlaces"
                  type="number"
                  min="1"
                  max={event.places_restantes}
                  value={formData.numberOfPlaces}
                  onChange={(e) => updateFormData("numberOfPlaces", parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
                placeholder="Questions ou informations particulières..."
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Price Summary */}
            {event.prix && event.prix > 0 && (
              <Card className="p-4 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {formData.numberOfPlaces} place{formData.numberOfPlaces > 1 ? 's' : ''} × {event.prix}€
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {(event.prix * formData.numberOfPlaces)}€
                  </span>
                </div>
              </Card>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-primary text-white hover:opacity-90"
                disabled={formData.numberOfPlaces > event.places_restantes}
              >
                <Check className="w-4 h-4 mr-2" />
                Confirmer la réservation
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventBookingModal;