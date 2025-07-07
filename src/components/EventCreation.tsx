import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Plus, Check } from "lucide-react";
import { Event } from "@/types/Event";

interface EventCreationProps {
  onEventCreate: (event: Event) => void;
}

const EventCreation = ({ onEventCreate }: EventCreationProps) => {
  const [formData, setFormData] = useState({
    titre: "",
    date: "",
    debut: "",
    fin: "",
    status: "planifie" as const,
    nbr_place: 1,
    description: "",
    prix: 0
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.date || !formData.debut || !formData.fin) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      titre: formData.titre,
      date: formData.date,
      debut: formData.debut,
      fin: formData.fin,
      status: formData.status,
      nbr_place: formData.nbr_place,
      places_restantes: formData.nbr_place,
      description: formData.description,
      prix: formData.prix,
      prestataire_id: JSON.parse(localStorage.getItem('user') || '{}').id
    };

    onEventCreate(newEvent);
    
    // Reset form
    setFormData({
      titre: "",
      date: "",
      debut: "",
      fin: "",
      status: "planifie",
      nbr_place: 1,
      description: "",
      prix: 0
    });
    
    setIsCreating(false);
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isCreating) {
    return (
      <Card className="p-8 text-center bg-gradient-card border-0 shadow-soft">
        <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Créer un événement
        </h3>
        <p className="text-muted-foreground mb-6">
          Organisez des formations, webinaires ou ateliers avec gestion des participants
        </p>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel événement
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Créer un événement</h3>
        <Button
          variant="outline"
          onClick={() => setIsCreating(false)}
          size="sm"
        >
          Annuler
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="titre">Titre de l'événement *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => updateFormData("titre", e.target.value)}
              placeholder="Ex: Formation React avancée"
              className="mt-2"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateFormData("date", e.target.value)}
              className="mt-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="debut">Heure de début *</Label>
            <Input
              id="debut"
              type="time"
              value={formData.debut}
              onChange={(e) => updateFormData("debut", e.target.value)}
              className="mt-2"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="fin">Heure de fin *</Label>
            <Input
              id="fin"
              type="time"
              value={formData.fin}
              onChange={(e) => updateFormData("fin", e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planifie">Planifié</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nbr_place">Nombre de places</Label>
            <Input
              id="nbr_place"
              type="number"
              min="1"
              value={formData.nbr_place}
              onChange={(e) => updateFormData("nbr_place", parseInt(e.target.value) || 1)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="prix">Prix (€)</Label>
            <Input
              id="prix"
              type="number"
              min="0"
              step="0.01"
              value={formData.prix}
              onChange={(e) => updateFormData("prix", parseFloat(e.target.value) || 0)}
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
            placeholder="Décrivez votre événement..."
            className="mt-2"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsCreating(false)}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-gradient-primary text-white hover:opacity-90"
          >
            <Check className="w-4 h-4 mr-2" />
            Créer l'événement
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EventCreation;