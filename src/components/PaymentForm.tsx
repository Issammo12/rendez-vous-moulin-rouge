import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, MapPin, Lock, Calendar } from "lucide-react";

interface PaymentFormProps {
  selectedService: any;
  onPaymentMethodChange: (method: "online" | "reception") => void;
  onPaymentComplete: (paymentData: any) => void;
  paymentMethod: "online" | "reception" | null;
}

const PaymentForm = ({ 
  selectedService, 
  onPaymentMethodChange, 
  onPaymentComplete,
  paymentMethod 
}: PaymentFormProps) => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    billingAddress: ""
  });

  const handlePaymentMethodChange = (value: string) => {
    onPaymentMethodChange(value as "online" | "reception");
  };

  const handleCardDataChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmitPayment = () => {
    if (paymentMethod === "online") {
      // Simuler le paiement Stripe
      const paymentData = {
        method: "online",
        amount: selectedService?.price || 0,
        cardData: cardData,
        timestamp: new Date().toISOString()
      };
      onPaymentComplete(paymentData);
    } else {
      const paymentData = {
        method: "reception",
        amount: selectedService?.price || 0,
        timestamp: new Date().toISOString()
      };
      onPaymentComplete(paymentData);
    }
  };

  const isFormValid = () => {
    if (paymentMethod === "reception") return true;
    if (paymentMethod === "online") {
      return cardData.cardNumber.length >= 19 && 
             cardData.expiryDate.length === 5 && 
             cardData.cvv.length >= 3 && 
             cardData.cardHolder.trim() !== "";
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Récapitulatif du service */}
      {selectedService && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-foreground">{selectedService.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedService.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{selectedService.price}€</p>
            </div>
          </div>
        </Card>
      )}

      {/* Choix du mode de paiement */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mode de paiement</h3>
        <RadioGroup value={paymentMethod || ""} onValueChange={handlePaymentMethodChange}>
          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Paiement en ligne</p>
                  <p className="text-sm text-muted-foreground">Paiement sécurisé par carte bancaire</p>
                </div>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="reception" id="reception" />
            <Label htmlFor="reception" className="flex-1 cursor-pointer">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Paiement à la réception</p>
                  <p className="text-sm text-muted-foreground">Réglez directement lors du rendez-vous</p>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {/* Formulaire de paiement en ligne */}
      {paymentMethod === "online" && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Informations de paiement</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => handleCardDataChange("cardNumber", formatCardNumber(e.target.value))}
                maxLength={19}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/AA"
                  value={cardData.expiryDate}
                  onChange={(e) => handleCardDataChange("expiryDate", formatExpiryDate(e.target.value))}
                  maxLength={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleCardDataChange("cvv", e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cardHolder">Nom du titulaire</Label>
              <Input
                id="cardHolder"
                placeholder="Jean Dupont"
                value={cardData.cardHolder}
                onChange={(e) => handleCardDataChange("cardHolder", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="billingAddress">Adresse de facturation (optionnel)</Label>
              <Input
                id="billingAddress"
                placeholder="123 Rue de la Paix, 75001 Paris"
                value={cardData.billingAddress}
                onChange={(e) => handleCardDataChange("billingAddress", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Vos informations sont sécurisées et cryptées</span>
            </div>
          </div>
        </Card>
      )}

      {/* Confirmation de paiement à la réception */}
      {paymentMethod === "reception" && (
        <Card className="p-6 bg-accent/5 border-accent/20">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-accent" />
            <div>
              <h4 className="font-semibold text-foreground">Paiement à la réception</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Vous pourrez régler {selectedService?.price}€ directement lors de votre rendez-vous.
                Moyens de paiement acceptés : espèces, carte bancaire.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Bouton de confirmation */}
      {paymentMethod && (
        <Button 
          onClick={handleSubmitPayment}
          disabled={!isFormValid()}
          className="w-full bg-gradient-primary text-white hover:opacity-90 h-11"
        >
          {paymentMethod === "online" 
            ? `Payer ${selectedService?.price}€ maintenant` 
            : "Confirmer la réservation"
          }
        </Button>
      )}
    </div>
  );
};

export default PaymentForm;