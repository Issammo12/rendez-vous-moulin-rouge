import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, Mail, Settings, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Calendrier intelligent",
      description: "Gérez vos créneaux de disponibilité avec une interface intuitive. Activation/désactivation en un clic.",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Créneaux flexibles",
      description: "Définissez la durée de vos consultations : 30 min, 1h, 2h... Adaptez selon vos besoins.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Événements groupés",
      description: "Organisez des formations, webinaires ou ateliers avec gestion des participants et inscriptions.",
      color: "text-success"
    },
    {
      icon: Mail,
      title: "Notifications automatiques", 
      description: "Confirmations, rappels et annulations envoyés automatiquement par email.",
      color: "text-warning"
    },
    {
      icon: Settings,
      title: "Gestion avancée",
      description: "Profils détaillés, historique complet, codes promos et statistiques de performance.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Paiement intégré",
      description: "Acceptez les paiements en ligne ou sur place. Interface sécurisée et rapide.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution complète pour gérer vos rendez-vous et développer votre activité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/5`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;