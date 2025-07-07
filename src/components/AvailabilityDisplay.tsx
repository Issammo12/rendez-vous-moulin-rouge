import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";

interface TimeSlot {
  day: string;
  hour: string;
  date: string;
}

interface AvailabilityDisplayProps {
  availableSlots: TimeSlot[];
  onRemoveSlot: (slotToRemove: TimeSlot) => void;
}

const AvailabilityDisplay = ({ availableSlots, onRemoveSlot }: AvailabilityDisplayProps) => {
  const groupSlotsByDay = (slots: TimeSlot[]) => {
    const grouped: { [key: string]: TimeSlot[] } = {};
    
    slots.forEach(slot => {
      const key = `${slot.day}-${slot.date}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(slot);
    });
    
    return grouped;
  };

  const groupedSlots = groupSlotsByDay(availableSlots);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (availableSlots.length === 0) {
    return (
      <Card className="p-8 text-center bg-muted/30">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucune disponibilité configurée
        </h3>
        <p className="text-muted-foreground">
          Utilisez le calendrier ci-dessus pour définir vos créneaux disponibles
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">
          Mes disponibilités
        </h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {availableSlots.length} créneau{availableSlots.length > 1 ? 'x' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSlots).map(([dayKey, slots]) => {
          const firstSlot = slots[0];
          return (
            <div key={dayKey} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{firstSlot.day}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(firstSlot.date)}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {slots.length} créneau{slots.length > 1 ? 'x' : ''}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {slots
                  .sort((a, b) => a.hour.localeCompare(b.hour))
                  .map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-primary/5 border border-primary/20 rounded-md px-3 py-2"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {slot.hour}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveSlot(slot)}
                        className="h-auto p-1 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AvailabilityDisplay;