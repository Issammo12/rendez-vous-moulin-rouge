import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"client" | "user">("client");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de connexion avec localStorage
    const userData = {
      email,
      type: userType,
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0]
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirection selon le type d'utilisateur
    if (userType === "client") {
      navigate("/dashboard-client");
    } else {
      navigate("/dashboard-user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/5" />
      
      <Card className="w-full max-w-md p-8 bg-background/95 backdrop-blur-lg border-0 shadow-large relative z-10">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">AppointmentPro</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Connexion</h1>
          <p className="text-muted-foreground">Accédez à votre espace personnel</p>
        </div>

        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            type="button"
            onClick={() => setUserType("client")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === "client"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Prestataire
          </button>
          <button
            type="button"
            onClick={() => setUserType("user")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === "user"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Client
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-white hover:opacity-90 h-11"
          >
            Se connecter
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Pas encore de compte ?{" "}
            <button 
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;