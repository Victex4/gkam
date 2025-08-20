// SideBar.jsx
import { baseLinks } from "../../conts/Dash";
import LinkItem from "./LinkItem";
import { MdAddTask, MdManageAccounts } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const SideBar = ({ isSideBarOpen, isAdmin }) => {
  const links = [
    ...baseLinks,
    ...(isAdmin
      ? [
          { href: "/admin/add-task", icon: MdAddTask, text: "Add Task" },
          { href: "/admin/manage-tasks", icon: MdManageAccounts, text: "Manage Tasks" },
        ]
      : []),
    {
      icon: IoIosLogOut,
      text: "Log-out",
      onClick: () => {
        localStorage.clear();
        window.location.href = "/"; // ✅ or "/login"
      },
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-[#FFE6FE] border-r border-gray-300 sm:translate-x-0 transition-transform ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 pt-2 pb-4 overflow-y-auto">
        <ul className="space-y-2 pl-0 font-medium">
          {links.map((link, index) => (
            <LinkItem key={index} {...link} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
