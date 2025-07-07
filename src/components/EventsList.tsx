import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, Euro, Trash2, Edit } from "lucide-react";
import { Event } from "@/types/Event";

interface EventsListProps {
  events: Event[];
  onDeleteEvent: (eventId: string) => void;
}

const EventsList = ({ events, onDeleteEvent }: EventsListProps) => {
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

  if (events.length === 0) {
    return (
      <Card className="p-8 text-center bg-muted/30">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucun événement créé
        </h3>
        <p className="text-muted-foreground">
          Créez votre premier événement pour commencer à organiser vos formations
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="p-6 bg-background border border-border hover:shadow-medium transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-lg font-semibold text-foreground">{event.titre}</h3>
                <Badge className={getStatusColor(event.status)}>
                  {getStatusText(event.status)}
                </Badge>
              </div>

              {event.description && (
                <p className="text-muted-foreground mb-4">{event.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteEvent(event.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventsList;