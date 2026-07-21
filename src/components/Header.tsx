import { useState } from "react";
import { MessageCircle } from "lucide-react";

import WhatsAppModal from "@/components/WhatsAppModal";
import { sendLead } from "@/lib/sendLead";

const buildWhatsAppUrl = (name: string) =>
  `https://wa.me/554130748100?text=Olá,%20me%20chamo%20${encodeURIComponent(
    name,
  )}.%20Preciso%20dos%20serviços%20da%20EHP!`;

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (name: string, phone: string) => {
    await sendLead({ name, phone, source: "header" });
    setModalOpen(false);
    window.open(buildWhatsAppUrl(name), "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
          EHP<span className="text-foreground">.</span>
        </a>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-tech transition-all duration-200 hover:shadow-tech-hover hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" />
          Envie um WhatsApp
        </button>
      </div>

      <WhatsAppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </header>
  );
};

export default Header;
