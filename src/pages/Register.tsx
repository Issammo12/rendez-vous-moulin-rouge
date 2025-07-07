import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, User, Briefcase } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState<"client" | "user">("client");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    profession: "", // Pour les prestataires
    description: "", // Pour les prestataires
    company: "" // Pour les prestataires
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Simulation d'inscription avec localStorage
    const userData = {
      email: formData.email,
      type: userType,
      id: Math.random().toString(36).substr(2, 9),
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      ...(userType === "client" && {
        profession: formData.profession,
        description: formData.description,
        company: formData.company
      })
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirection selon le type d'utilisateur
    if (userType === "client") {
      navigate("/dashboard-client");
    } else {
      navigate("/dashboard-user");
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/5" />
      
      <Card className="w-full max-w-2xl p-8 bg-background/95 backdrop-blur-lg border-0 shadow-large relative z-10">
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Créer un compte</h1>
          <p className="text-muted-foreground">Rejoignez notre plateforme en quelques étapes</p>
        </div>

        <div className="flex rounded-lg bg-muted p-1 mb-8">
          <button
            type="button"
            onClick={() => setUserType("client")}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
              userType === "client"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Prestataire</span>
          </button>
          <button
            type="button"
            onClick={() => setUserType("user")}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
              userType === "user"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Client</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="votre@email.com"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="mt-2"
              required
            />
          </div>

          {userType === "client" && (
            <>
              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => updateFormData("profession", e.target.value)}
                  placeholder="Ex: Médecin, Coach, Consultant..."
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="company">Entreprise/Cabinet (optionnel)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  placeholder="Nom de votre entreprise"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description de vos services</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="Décrivez vos services et votre expertise..."
                  className="mt-2"
                  rows={3}
                  required
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-white hover:opacity-90 h-11"
          >
            Créer mon compte
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Déjà un compte ?{" "}
            <button 
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Se connecter
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;