"use client";

import { User } from "@supabase/supabase-js";
import React, { useState } from "react";

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogoutClick = async () => {};

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-white">
        {user.email}
      </button>
      {isDropdownOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <li className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
            <a href="/profile">Profile</a>
          </li>
          <li
            onClick={handleLogoutClick}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 cursor-pointer"
          >
            Sign Out
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
