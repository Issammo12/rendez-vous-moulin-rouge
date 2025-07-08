import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Bookyn</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Fonctionnalités
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Prestataires
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => window.location.href = '/login'}
            >
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-white hover:opacity-90"
              onClick={() => window.location.href = '/register'}
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;