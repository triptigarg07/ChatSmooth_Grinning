import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto w-full max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold text-foreground">
          SmoothChat
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className={`hover:opacity-80 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
          >
            Home
          </Link>
          <Link
            to="/secondary"
            className={`hover:opacity-80 ${
              isActive("/secondary") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Secondary
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
