import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiTiktokFill } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";

const Social = ({ selected, setSelected }) => {
  const icons = [
    { label: "ALL", icon: "ALL" },
    { label: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
    { label: "Twitter", icon: <FaTwitter className="text-blue-400" /> },
    { label: "TikTok", icon: <RiTiktokFill className="text-black" /> },
    { label: "YouTube", icon: <FaYoutube className="text-red-600" /> },
    { label: "Facebook", icon: <FaFacebookF className="text-blue-600" /> },
    { label: "Telegram", icon: <SiTelegram className="text-blue-400" /> },
    { label: "NG", icon: "NG" },
  ];

  return (
    <div className="flex gap-11 bg-[#FFE6FE] ml-[10px] rounded-2xl flex-wrap items-center pl-3">
      {icons.map((item, index) => (
        <div
          key={index}
          className={`w-12 h-12 rounded-full ${
            selected === item.label ? "bg-pink-300" : "bg-gray-300"
          } flex items-center justify-center hover:opacity-50 transition-opacity duration-200 cursor-pointer text-sm font-semibold`}
          onClick={() => setSelected(item.label)}
        >
          {item.icon || item.label}
        </div>
      ))}
    </div>
  );
};

export default Social;

