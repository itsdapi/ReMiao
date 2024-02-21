import { routes } from "../lib/route";
import SvgIcon from "./svg-icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { changeActive } from "@/lib/redux/active-tab-slice";

export default function NavBar() {
  const { active } = useSelector((state: RootState) => state.activeTab);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="fixed bottom-0 h-20 w-full pt-3 border-t-2 border-gray-200 bg-gray-50 flex flex-row justify-around">
      {routes.map((item) => (
        <div
          className="flex flex-col items-center space-y-1"
          onClick={() => dispatch(changeActive(item.id))}
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
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
