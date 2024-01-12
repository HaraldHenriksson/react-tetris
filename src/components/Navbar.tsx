"use server";

import { getServerUser } from "@/app/lib/user/server";
import UserDropdown from "./UserDropdown";
import ControlsModal from "./Controls";

const NavItem = ({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return href ? (
    <li>
      <a href={href} className={className}>
        {children}
      </a>
    </li>
  ) : (
    <li>{children}</li>
  );
};

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
        <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
          <NavItem
            href="/home"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Home
          </NavItem>
          <NavItem
            href="/leaderboard"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Leaderboard
          </NavItem>
          <NavItem>
            <ControlsModal />
          </NavItem>
        </ul>
        <div className="flex items-center">
          {user && <UserDropdown user={user} />}
        </div>
      </div>
    </nav>
  );
}
