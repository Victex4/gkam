import { Link } from "react-router-dom";

const LinkItem = ({ href, icon: Icon, text, badge, onClick }) => {
  return (
    <li>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center p-2 no-underline text-gray-900 rounded-lg hover:bg-[#FF99FC]"
        >
          <Icon className="mr-3" />
          <span className="flex-1">{text}</span>
          {badge && (
            <span
              className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color} ${badge.darkColor}`}
            >
              {badge.text}
            </span>
          )}
        </button>
      ) : (
        <Link
          to={href}
          className="flex items-center p-2 w-full no-underline text-gray-900 rounded-lg hover:bg-[#FF99FC]"
        >
          <Icon className="mr-3" />
          <span className="flex-1">{text}</span>
          {badge && (
            <span
              className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color} ${badge.darkColor}`}
            >
              {badge.text}
            </span>
          )}
        </Link>
      )}
    </li>
  );
};

export default LinkItem;
