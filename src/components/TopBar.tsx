import { MapPin, Clock } from "lucide-react";

const TopBar = () => {
  return (
    <div className="w-full bg-accent border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary" />
          <span>Atendemos em Curitiba e Região • Rua Chile, 1855 – Rebouças</span>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
          <Clock className="h-3 w-3 text-primary" />
          <span>Mais de 15 anos em Curitiba</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
