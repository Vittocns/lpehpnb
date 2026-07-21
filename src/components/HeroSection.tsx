import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Building2 } from "lucide-react";

import WhatsAppModal from "@/components/WhatsAppModal";
import { sendLead } from "@/lib/sendLead";

const buildWhatsAppUrl = (name: string) =>
  `https://wa.me/554130748100?text=Olá,%20me%20chamo%20${encodeURIComponent(
    name,
  )}.%20Preciso%20dos%20serviços%20da%20EHP!`;

const gadgets = [
  { icon: Shield, label: "+ 15 anos em Curitiba" },
  { icon: Building2, label: "Atendemos em Domicílio ou na Empresa" },
];

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (name: string, phone: string) => {
    await sendLead({ name, phone, source: "hero" });
    setModalOpen(false);
    window.open(buildWhatsAppUrl(name), "_blank");
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-dots mask-radial" />
      <div className="absolute inset-0 bg-diagonal-lines" />

      {/* Radar circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[320, 520, 720].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-primary/5"
            style={{
              width: size,
              height: size,
              top: `calc(50% - ${size / 2}px)`,
              left: `calc(50% - ${size / 2}px)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance max-w-4xl mx-auto"
        >
          UTI dos Nerds –{" "}
          <span className="text-primary">Salvamos o seu equipamento</span> 24h por dia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-[60ch] mx-auto leading-relaxed"
        >
          Seu equipamento está doente? Nós salvamos ele! Trabalhamos com as principais
          marcas (Dell, Asus, Acer, Lenovo, HP, etc.).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-tech transition-all duration-200 hover:shadow-tech-hover hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar WhatsApp
          </button>
        </motion.div>

        {/* Gadgets */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {gadgets.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 font-mono-tech text-[11px] uppercase tracking-wide text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <WhatsAppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default HeroSection;
