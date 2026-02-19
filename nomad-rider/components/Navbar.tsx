import { SignedOut, SignInButton, UserButton, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 h-20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand/Logo - Increased text size */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Nomad<span className="text-blue-500">Rider</span>
          </span>
        </Link>

        {/* Navigation Group */}
        <div className="flex items-center gap-8">
          <Link 
            href="/find-spots" 
            className="text-base font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Find Spots
          </Link>

          <SignedIn>
            <Link 
              href="/add-spot" 
              className="text-base font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Add Location
            </Link>
          </SignedIn>

          {/* Auth/Profile Section */}
          <div className="flex items-center gap-6 ml-2 pl-6 border-l border-slate-800 h-10">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 font-bold h-8">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10", // Bigger profile pic
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}