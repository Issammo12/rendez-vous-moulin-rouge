import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Clock, Euro, Trash2, Edit, Check, X } from "lucide-react";
import { Service } from "@/types/Event";

interface ServiceManagementProps {
  services: Service[];
  onServiceCreate: (service: Service) => void;
  onServiceUpdate: (service: Service) => void;
  onServiceDelete: (serviceId: string) => void;
}

const ServiceManagement = ({ services, onServiceCreate, onServiceUpdate, onServiceDelete }: ServiceManagementProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: 0,
    description: "",
    category: ""
  });

  const categories = [
    "Consultation",
    "Formation",
    "Coaching",
    "Thérapie",
    "Conseil",
    "Technique",
    "Autre"
  ];

  const durations = [
    "15 min", "30 min", "45 min", "1h", "1h30", "2h", "2h30", "3h", "Demi-journée", "Journée complète"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.duration || !formData.category) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const serviceData: Service = {
      id: editingService?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      duration: formData.duration,
      price: formData.price,
      description: formData.description,
      category: formData.category
    };

    if (editingService) {
      onServiceUpdate(serviceData);
      setEditingService(null);
    } else {
      onServiceCreate(serviceData);
      setIsCreating(false);
    }

    // Reset form
    setFormData({
      name: "",
      duration: "",
      price: 0,
      description: "",
      category: ""
    });
  };

  const startEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description,
      category: service.category
    });
    setIsCreating(true);
  };

  const cancelEdit = () => {
    setEditingService(null);
    setIsCreating(false);
    setFormData({
      name: "",
      duration: "",
      price: 0,
      description: "",
      category: ""
    });
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {isCreating ? (
        <Card className="p-6 bg-background border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              {editingService ? "Modifier le service" : "Créer un service"}
            </h3>
            <Button variant="outline" onClick={cancelEdit} size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom du service *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Ex: Consultation générale"
                  className="mt-2"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Durée *</Label>
                <Select value={formData.duration} onValueChange={(value) => updateFormData("duration", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map(duration => (
                      <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Décrivez votre service..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Annuler
              </Button>
              <Button type="submit" className="bg-gradient-primary text-white hover:opacity-90">
                <Check className="w-4 h-4 mr-2" />
                {editingService ? "Modifier" : "Créer"} le service
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-6 bg-gradient-card border-0 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Mes services</h3>
              <p className="text-muted-foreground">
                Gérez vos différents types de consultations et tarifs
              </p>
            </div>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau service
            </Button>
          </div>
        </Card>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <Card className="p-8 text-center bg-muted/30">
          <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Aucun service configuré
          </h3>
          <p className="text-muted-foreground">
            Créez votre premier service pour commencer à recevoir des réservations
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6 bg-background border border-border hover:shadow-medium transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{service.name}</h4>
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </div>
                  
                  {service.description && (
                    <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Euro className="w-4 h-4 text-success" />
                      <span>{service.price}€</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onServiceDelete(service.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;