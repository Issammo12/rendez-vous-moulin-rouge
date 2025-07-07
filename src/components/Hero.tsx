import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Simplifiez vos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-light">
              rendez-vous
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Une plateforme moderne pour gérer vos consultations et événements. 
            Réservation en ligne, paiements sécurisés, et bien plus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto shadow-large"
              onClick={() => window.location.href = '/register'}
            >
              Créer mon compte prestataire
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
              onClick={() => window.location.href = '/login'}
            >
              Découvrir les prestataires
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-white/90">
              <Calendar className="w-8 h-8 mb-3 text-accent-light" />
              <span className="text-sm font-medium">Calendrier intelligent</span>
            </div>
            <div className="flex flex-col items-center text-white/90">
              <Clock className="w-8 h-8 mb-3 text-accent-light" />
              <span className="text-sm font-medium">Créneaux flexibles</span>
            </div>
            <div className="flex flex-col items-center text-white/90">
              <Users className="w-8 h-8 mb-3 text-accent-light" />
              <span className="text-sm font-medium">Événements groupés</span>
            </div>
            <div className="flex flex-col items-center text-white/90">
              <Zap className="w-8 h-8 mb-3 text-accent-light" />
              <span className="text-sm font-medium">Paiement instantané</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-xl" />
    </section>
  );
};

export default Hero;