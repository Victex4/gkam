import { links } from "../../conts/Dash"
import LinkItem from "./LinkItem"

const SideBar = ({ isSideBarOpen, isAdmin }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-[#FFE6FE] border-r border-gray-300 sm:translate-x-0 transition-transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="h-full px-3 pt-2 pb-4 overflow-y-auto">
        <ul className="space-y-2 pl-0 font-medium">
          {links
            .filter(link => !link.admin || isAdmin) // ✅ this hides admin-only links for regular users
            .map((link, index) => (
              <LinkItem key={index} {...link} />
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar
