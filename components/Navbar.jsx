"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/components/SessionWrapper";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useSession();
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const pathname = usePathname();

  // Close on route change
  React.useEffect(() => setOpen(false), [pathname]);

  // Click outside + Esc to close
  React.useEffect(() => {
    const onClick = (e) => {
      if (
        open &&
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="flex justify-between px-4 bg-gradient-to-r from-green-600 via-[#17cd90] to-blue-700 h-14 items-center">
      <div className="text-3xl font-bold py-4">
        <Link href="/">Yog-Guru</Link>
      </div>

      <div className="flex items-center gap-4">
        <ul className="flex gap-4">
          <li>
            <Link href="/plans" className="text-xl font-bold hover:scale-105 transition-transform">
              Plans
            </Link>
          </li>
          <li>
            <Link href="/yoga" className="text-xl font-bold hover:scale-105 transition-transform">
              Yoga
            </Link>
          </li>
          <li>
            <Link href="/consult" className="text-xl font-bold hover:scale-105 transition-transform">
              Consult
            </Link>
          </li>
        </ul>

        {/* User Menu */}
        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="user-dropdown"
            className="text-white bg-[#0851a4] hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-teal-400 font-bold rounded-lg text-[18px] px-5 py-2.5 inline-flex items-center transition-colors"
            type="button"
          >
            {isAuthenticated ? (
              <>
                <img 
                  src={user?.avatar} 
                  alt={user?.username}
                  className="w-6 h-6 rounded-full mr-2"
                />
                {user?.username}
              </>
            ) : (
              'Account'
            )}
            <svg
              className={`w-2.5 h-2.5 ms-3 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div
            id="user-dropdown"
            ref={menuRef}
            role="menu"
            tabIndex={-1}
            className={`absolute right-0 mt-2 w-44 z-10 rounded-lg shadow-sm bg-white dark:bg-[#67e6c4] divide-y divide-gray-100 transition 
              ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} origin-top-right`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-700">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/dashboard" role="menuitem" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/profile" role="menuitem" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black">
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link href={`/plans/${user?.plan || 'beginner'}`} role="menuitem" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black">
                      My Plan
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      role="menuitem" 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/login" role="menuitem" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/signup" role="menuitem" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-teal-400 dark:hover:text-black">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;