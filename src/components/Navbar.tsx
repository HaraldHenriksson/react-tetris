"use client";

import { getServerUser } from "@/app/lib/user/server";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const NavItem = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) => (
  <li>
    <a href={href} className={className}>
      {children}
    </a>
  </li>
);

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getServerUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-customBlue">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <NavItem
              href="/home"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            >
              Home
            </NavItem>
            <NavItem
              href="/leaderboard"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Leaderboard
            </NavItem>
            <li className="relative">
              <button onClick={toggleDropdown} className="text-white">
                {user?.email}
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <NavItem
                    href="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </NavItem>
                  <NavItem
                    href="/sign-out"
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </NavItem>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
