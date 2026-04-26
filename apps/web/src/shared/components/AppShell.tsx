import { Link, Outlet } from "react-router-dom";

export const AppShell = () => (
  <div className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <Link
          to="/stays"
          className="text-lg font-bold tracking-tight text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
        >
          Lateral Stays
        </Link>
        <Link
          to="/stays"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
        >
          Browse stays
        </Link>
      </nav>
    </header>
    <Outlet />
  </div>
);
