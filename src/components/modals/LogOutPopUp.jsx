import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

const LogOutPopUp = ({ logOutPopUp, setLogOutPopUp }) => {
  const handleLogOut = () => {
    // ✅ Clear localStorage/session storage or your auth state
    localStorage.clear();
    sessionStorage.clear();

    // ✅ Optionally, clear any auth tokens in your state/Context if used

    // ✅ Redirect to home page or login page
    window.location.href = '/'; // Or '/login'
  };

  return (
    <>
      {logOutPopUp && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md rounded-[25px] duration-200 w-[440px] lg:w-[600px]">
              {/* Close Button */}
              <div className="flex justify-end">
                <RxCross2
                  onClick={() => setLogOutPopUp(false)}
                  className="text-blue-600 text-3xl cursor-pointer rounded-md hover:outline-none hover:ring-2 hover:ring-gray-200 hover:scale-105 duration-100"
                />
              </div>

              {/* Icon */}
              <div className="pt-8">
                <IoIosLogOut className="text-green-600 text-4xl text-center mx-auto" />
              </div>

              {/* Header */}
              <div className="text-center mx-auto mt-4">
                <h1 className="font-Poppins font-semibold text-xl">Log Out</h1>
                <p className="font-Poppins text-sm text-gray-500 mt-2">
                  Do you wish to logout?
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-8 mb-8">
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 py-2 px-8 text-white rounded-[5px] font-Poppins hover:bg-red-700"
                >
                  Yes, Log Out
                </button>
                <button
                  onClick={() => setLogOutPopUp(false)}
                  className="bg-gray-300 py-2 px-8 text-gray-800 rounded-[5px] font-Poppins hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOutPopUp;
