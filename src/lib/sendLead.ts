export async function sendLead(data: { name: string; phone: string; source: string }) {
  const url = import.meta.env.VITE_LEADS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        page: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Falha ao enviar lead:", err);
  }
}
