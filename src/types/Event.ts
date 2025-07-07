export interface Event {
  id: string;
  titre: string;
  date: string;
  debut: string;
  fin: string;
  status: 'planifie' | 'en_cours' | 'termine' | 'annule';
  nbr_place: number;
  places_restantes: number;
  description?: string;
  prix?: number;
  prestataire_id: string;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  category: string;
}