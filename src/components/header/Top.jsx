import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";

const Top = ({ toggleSideBar }) => {
  const location = useLocation();
  const isAddFundsPage = location.pathname === "/addfunds";

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#FFE6FE] border-b border-gray-300">
      <div className="px-3 py-3 pb-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={toggleSideBar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-[#FF99FC] focus:outline-none focus:ring-2 focus:ring-bg-[#FFE6FE] sm:hidden"
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <div>
              <div className="flex items-center ms-2 md:me-24">
                <Logo />
              </div>
            </div>
            {!isAddFundsPage && (
              <div>
                <Link to="/addfunds">
                  <button
                    type="button"
                    className="inline-flex items-center p-2 text-[18px] text-gray-500 rounded-lg hover:bg-[#FF99FC] focus:outline-none focus:ring-2 focus:ring-bg-[#FFE6FE]"
                  >
                    Add Funds
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Top;
