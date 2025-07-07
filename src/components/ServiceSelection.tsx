import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Check } from "lucide-react";
import { Service } from "@/types/Event";

interface ServiceSelectionProps {
  services: Service[];
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
}

const ServiceSelection = ({ services, selectedService, onServiceSelect }: ServiceSelectionProps) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Consultation": "bg-blue-100 text-blue-800",
      "Formation": "bg-green-100 text-green-800",
      "Coaching": "bg-purple-100 text-purple-800",
      "Thérapie": "bg-pink-100 text-pink-800",
      "Conseil": "bg-yellow-100 text-yellow-800",
      "Technique": "bg-gray-100 text-gray-800",
      "Autre": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (services.length === 0) {
    return (
      <Card className="p-6 bg-muted/30">
        <p className="text-center text-muted-foreground">
          Ce prestataire n'a pas encore configuré de services
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground mb-4">Choisir un service</h4>
      
      <div className="grid grid-cols-1 gap-3">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          
          return (
            <Card 
              key={service.id} 
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-border hover:border-primary/50 hover:shadow-sm"
              }`}
              onClick={() => onServiceSelect(service)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-medium text-foreground">{service.name}</h5>
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  {service.description && (
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Euro className="w-3 h-3 text-success" />
                      <span>{service.price}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;