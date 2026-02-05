import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Nomad<span className="text-blue-500">Rider</span>
        </Link>

        {/* LINKS AREA */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/find-spots" className="text-slate-300 hover:text-white transition">
            Find Spots
          </Link>
          <Link href="/add-spot" className="text-slate-300 hover:text-white transition">
            Add Location
          </Link>
          <Link 
            href="/login" 
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full text-sm font-medium transition"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU ICON (Just a placeholder for now) */}
        <div className="md:hidden text-slate-300">
          <button>☰</button>
        </div>

      </div>
    </nav>
  );
}