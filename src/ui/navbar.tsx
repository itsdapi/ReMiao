import { useState } from "react";
import { routes } from "../lib/route";
import SvgIcon from "./svg-icon";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [active, setActive] = useState<string>("0");

  const handleTabChange = (value: string) => {
    setActive(value);
  };

  return (
    <div className="fixed bottom-0 h-20 w-full pt-3 border-t-2 border-gray-200 bg-gray-50 flex flex-row justify-around">
      {routes.map((item) => (
        <NavLink
          to={item.path}
          className="flex flex-col items-center space-y-1"
          onClick={() => handleTabChange(item.id)}
          key={item.id}
        >
          <SvgIcon
            src={item.icon}
            size={20}
            className={active === item.id ? "bg-primary-900" : "bg-gray-500"}
          />
          <span
            className={`text-sm ${
              active === item.id ? "text-primary-900" : "text-gray-500"
            }`}
          >
            {item.title}
          </span>
        </NavLink>
      ))}
    </div>
  );
}
