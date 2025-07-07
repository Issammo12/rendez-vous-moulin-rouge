import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Euro, MapPin, User } from "lucide-react";
import { Event } from "@/types/Event";

interface EventSelectionProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const EventSelection = ({ events, onEventSelect }: EventSelectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'bg-blue-100 text-blue-800';
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'Planifié';
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'annule':
        return 'Annulé';
      default:
        return status;
    }
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

  const availableEvents = events.filter(event => 
    event.status === 'planifie' && 
    event.places_restantes > 0 &&
    new Date(event.date) >= new Date()
  );

  if (availableEvents.length === 0) {
    return (
      <Card className="p-8 text-center bg-muted/30">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucun événement disponible
        </h3>
        <p className="text-muted-foreground">
          Ce prestataire n'a pas d'événements ouverts aux réservations pour le moment
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground mb-4">Événements disponibles</h4>
      
      <div className="space-y-4">
        {availableEvents.map((event) => (
          <Card 
            key={event.id} 
            className="p-6 bg-background border border-border hover:shadow-medium transition-all group cursor-pointer"
            onClick={() => onEventSelect(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.titre}
                  </h3>
                  <Badge className={getStatusColor(event.status)}>
                    {getStatusText(event.status)}
                  </Badge>
                  {event.places_restantes <= 5 && event.places_restantes > 0 && (
                    <Badge variant="outline" className="text-warning border-warning">
                      Places limitées
                    </Badge>
                  )}
                </div>

                {event.description && (
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
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
                    <span>{event.places_restantes}/{event.nbr_place} places</span>
                  </div>
                  
                  {event.prix && event.prix > 0 && (
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-warning" />
                      <span>{event.prix}€</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Cliquez pour réserver votre place
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary text-white hover:opacity-90"
                    disabled={event.places_restantes === 0}
                  >
                    {event.places_restantes === 0 ? 'Complet' : 'Réserver'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventSelection;