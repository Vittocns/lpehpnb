import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4 text-muted-foreground">Página não encontrada</p>
        <Link to="/" className="text-primary underline hover:text-primary/80">
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
