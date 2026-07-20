import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/554130748100?text=Olá.%20Preciso%20dos%20serviços%20da%20EHP!";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="/" className="text-xl font-extrabold tracking-tight text-primary">
          EHP<span className="text-foreground">.</span>
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-tech transition-all duration-200 hover:shadow-tech-hover hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" />
          Envie um WhatsApp
        </a>
      </div>
    </header>
  );
};

export default Header;
