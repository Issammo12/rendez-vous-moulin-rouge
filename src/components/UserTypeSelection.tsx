import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Check } from "lucide-react";

const UserTypeSelection = () => {
  const accountTypes = [
    {
      type: "client",
      icon: Calendar,
      title: "Compte Prestataire",
      subtitle: "Je propose des services",
      description: "Créez votre calendrier, gérez vos rendez-vous et acceptez les réservations en ligne.",
      features: [
        "Calendrier personnalisable",
        "Gestion des créneaux",
        "Événements groupés",
        "Paiements en ligne",
        "Statistiques détaillées"
      ],
      buttonText: "Devenir prestataire",
      popular: true
    },
    {
      type: "user", 
      icon: User,
      title: "Compte Utilisateur",
      subtitle: "Je recherche des services",
      description: "Découvrez les prestataires, réservez vos créneaux et gérez vos rendez-vous facilement.",
      features: [
        "Navigation des prestataires",
        "Réservation simplifiée",
        "Historique des RDV",
        "Notifications automatiques",
        "Paiement sécurisé"
      ],
      buttonText: "Créer mon compte",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Quel type de compte voulez-vous ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le type de compte qui correspond à vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {accountTypes.map((account, index) => (
            <Card 
              key={index} 
              className={`relative p-8 bg-background border-2 hover:shadow-large transition-all duration-300 ${
                account.popular ? 'border-primary shadow-glow' : 'border-border hover:border-primary/50'
              }`}
            >
              {account.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl ${
                  account.popular ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <account.icon className={`w-8 h-8 ${
                    account.popular ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {account.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {account.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {account.description}
              </p>

              <div className="space-y-4 mb-8">
                {account.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full h-12 text-lg ${
                  account.popular 
                    ? 'bg-gradient-primary text-white hover:opacity-90' 
                    : 'bg-secondary hover:bg-secondary-hover'
                }`}
                onClick={() => window.location.href = '/register'}
              >
                {account.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;