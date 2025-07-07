import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface TimeSlot {
  day: string;
  hour: string;
  date: string;
}

interface WeeklyCalendarProps {
  onSlotsConfirm: (slots: TimeSlot[]) => void;
}

const WeeklyCalendar = ({ onSlotsConfirm }: WeeklyCalendarProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    return monday;
  });

  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  const hours = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const daysOfWeek = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  ];

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const getSlotKey = (dayIndex: number, hour: string) => {
    const date = weekDates[dayIndex];
    return `${date.toISOString().split('T')[0]}-${hour}`;
  };

  const toggleSlot = (dayIndex: number, hour: string) => {
    const slotKey = getSlotKey(dayIndex, hour);
    const newSelectedSlots = new Set(selectedSlots);
    
    if (newSelectedSlots.has(slotKey)) {
      newSelectedSlots.delete(slotKey);
    } else {
      newSelectedSlots.add(slotKey);
    }
    
    setSelectedSlots(newSelectedSlots);
  };

  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const confirmSlots = () => {
    const slots: TimeSlot[] = Array.from(selectedSlots).map(slotKey => {
      const [dateStr, hour] = slotKey.split('-');
      const date = new Date(dateStr);
      const dayName = daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1];
      
      return {
        day: dayName,
        hour,
        date: dateStr
      };
    });
    
    onSlotsConfirm(slots);
    setSelectedSlots(new Set());
  };

  const getWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);
    
    return `${formatDate(currentWeekStart)} - ${formatDate(endDate)}`;
  };

  return (
    <Card className="p-6 bg-background border border-border">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">
            Planification hebdomadaire
          </h3>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousWeek}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {getWeekRange()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextWeek}
              className="p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          Cliquez sur les créneaux pour les sélectionner ou les désélectionner
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header with days */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-3 text-center font-medium text-muted-foreground">
              Heures
            </div>
            {daysOfWeek.map((day, index) => (
              <div key={day} className="p-3 text-center">
                <div className="font-medium text-foreground">{day}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(weekDates[index])}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots grid */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
              <div className="p-3 text-center font-medium text-muted-foreground bg-muted/30 rounded">
                {hour}
              </div>
              {daysOfWeek.map((_, dayIndex) => {
                const slotKey = getSlotKey(dayIndex, hour);
                const isSelected = selectedSlots.has(slotKey);
                
                return (
                  <button
                    key={`${dayIndex}-${hour}`}
                    onClick={() => toggleSlot(dayIndex, hour)}
                    className={`p-3 rounded border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-background hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 mx-auto" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation button */}
      {selectedSlots.size > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={confirmSlots}
            className="bg-gradient-primary text-white hover:opacity-90"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirmer {selectedSlots.size} créneau{selectedSlots.size > 1 ? 'x' : ''}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default WeeklyCalendar;