"use server";

import { getServerUser } from "@/app/lib/user/server";
import UserDropdown from "./UserDropdown";

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

export default async function Navbar() {
  let user;
  try {
    user = await getServerUser();
  } catch (error) {
    console.error("Error fetching user:", error);
  }

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
            {user && <UserDropdown user={user} />}
          </ul>
        </div>
      </div>
    </nav>
  );
}
