import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, MessageCircle, Search } from "lucide-react";

const RecruiterSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "My Created Jobs" },
    { path: "/create", icon: PlusCircle, label: "Create Job" },
    { path: "/mycreatedjobs", icon: MessageCircle, label: "Messages" },
    { path: "/create", icon: Search, label: "Discover" },
  ];

  return (
    <nav className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Job Portal</h1>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RecruiterSidebar;
