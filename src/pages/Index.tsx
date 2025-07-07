import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UserTypeSelection from "@/components/UserTypeSelection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <UserTypeSelection />
      <Footer />
    </div>
  );
};

export default Index;
