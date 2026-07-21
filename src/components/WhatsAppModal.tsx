import { useEffect, useState, type FormEvent } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PHONE_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits.replace(/^(\d*)$/, "($1");
  if (digits.length <= 7)
    return digits.replace(/^(\d{2})(\d*)$/, "($1) $2");
  return digits.replace(/^(\d{2})(\d{5})(\d*)$/, "($1) $2-$3");
}

interface WhatsAppModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, phone: string) => Promise<void> | void;
}

const WhatsAppModal = ({ open, onClose, onSubmit }: WhatsAppModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setPhone("");
      setLoading(false);
    }
  }, [open]);

  const isValid = name.trim().length > 0 && PHONE_REGEX.test(phone);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    try {
      await onSubmit(name.trim(), phone);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fale com a gente pelo WhatsApp</DialogTitle>
          <DialogDescription>
            Preencha seus dados para continuarmos a conversa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-modal-name">Nome</Label>
            <Input
              id="whatsapp-modal-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              autoComplete="name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp-modal-phone">Telefone</Label>
            <Input
              id="whatsapp-modal-phone"
              value={phone}
              onChange={(event) => setPhone(maskPhone(event.target.value))}
              placeholder="(99) 99999-9999"
              inputMode="numeric"
              autoComplete="tel"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!isValid || loading} className="w-full">
              {loading ? "Enviando..." : "Continuar para o WhatsApp"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
