import { GrPlan } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { IoIosStats } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdBuild } from "react-icons/md";
import { MdApi } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { MdTaskAlt, MdPendingActions } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { GiMechanicGarage } from "react-icons/gi";
import { MdChecklist, MdAddTask, MdManageAccounts, MdAdminPanelSettings } from "react-icons/md";






import user01 from "../assets/user01.jpeg";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const links = [
  {
    href: "/dashboard",
    icon: FaChartBar,
    text: "Home"
  },
  {
    href: "/order",
    icon: MdShoppingCart,
    text: "Order",
  },
  {
    href: "/account",
    icon: MdAccountCircle,
    text: "Account",
  },
  {
    href: "/addfunds",
    icon: AiOutlinePlusCircle,
    text: "Add Funds"
  },
  {
    href: "/task",
    icon: FaLink,
    text: "Affiliates"
  },
  {
    href: "/taskcenter",
    icon: MdChecklist,
    text: "Task Center"
  },
  {
    href: "/admin/add-task",
    icon: MdAddTask,
    text: "Add Task",
    admin: true  // ✅ Only show for admins
  },
  {
    href: "/admin/manage-tasks",
    icon: MdManageAccounts,
    text: "Manage Tasks",
    admin: true  // ✅ Only show for admins
  },
  {
    href: "/api",
    icon: MdApi,
    text: "API"
  },
  {
    href: "/login",
    icon: IoIosLogOut,
    text: "Log-out",
  }
];


export const employeesData = [
    {
      title: "Total Orders",
      count: 87,
      icon: FaClipboardList,
      bgColor: "bg-blue-500"
    },
    {
      title: "Completed Task",
      count: 12,
      icon: MdTaskAlt,
      bgColor: "bg-green-500"
    },
    {
      title: "Pending Tasks",
      count: 7,
      icon: MdPendingActions,
      bgColor: "bg-yellow-500"
    }
  ];

export const shortcutLink = [
    {
        title: "Goals",
        icon: GoGoal,
    },
    {
        title: "Plan",
        icon: GrPlan,
    },
    {
        title: "Stats",
        icon: IoIosStats,
    },
    {
        title: "Settings",
        icon: IoIosSettings,
    },
];

export const users = [
    {
        name: "TikTok",
        country: "USA",
        role: "Python Developer",
        image: user01,
        bgColor: "bg-yellow-100"
    },
    {
        name: "Instagram",
        country: "Ngeria",
        role: "Backend Developer",
        image: user2,
        bgColor: "bg-gray-100"
    },
    {
        name: "FaceBook",
        country: "Australlia",
        role: "Fullstack Developer",
        image: user3,
        bgColor: "bg-slate-100"
    },
    {
        name: "Twitter",
        country: "US",
        role: "Fullstack Developer",
        image: user4,
        bgColor: "bg-blue-100"
    },
    {
        name: "YouTube",
        country: "US",
        role: "Fullstack Developer",
        image: user4,
        bgColor: "bg-blue-100"
    },
    {
        name: "WhatsApp",
        country: "US",
        role: "Fullstack Developer",
        image: user4,
        bgColor: "bg-blue-100"
    },
];

export const events = [
    {
        date: "01 Aug",
        title: "Upcoming event",
        description: "For upcoming developers"
    },
    {
        date: "03 Sept",
        title: "Annual Conference",
        description: "Join us for annual conference"
    },
    {
        date: "15 Sept",
        title: "Networking Meetup",
        description: "Connect with professional in yur field"
    },
];

export const notes = {
  ALL: ["General instructions apply."],
  Instagram: [
    "1. Ensure your IG account is public.",
    "2. Don’t change usernames during service.",
    "3. IG services may take time to reflect."
  ],
  Twitter: [
    "1. Tweets must be public.",
    "2. Avoid deleting tweets during engagement.",
    "3. High drop rates on new accounts."
  ],
  TikTok: [
    "1. Complete previous follower orders first.",
    "2. Account must be public.",
    "3. No username change during delivery."
  ],
  YouTube: [
    "1. Avoid deleting videos.",
    "2. High-quality views may take longer.",
    "3. Sub count delay: up to 24h."
  ],
  Facebook: ["1. Set posts to public.", "2. Page name must remain constant."],
  Telegram: ["1. Make group/channel public.", "2. No invite link changes."],
  NG: ["This service is tailored for Nigerian users."],
};

   
















