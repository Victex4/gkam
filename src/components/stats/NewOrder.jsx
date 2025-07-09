import { employeesData } from "../../conts/Dash";
import { FiPlus } from "react-icons/fi";

const NewOrder = ({ darkMode }) => {
  return (
    <div className="bg-[#FFE6FE] rounded-xl p-5 w-full max-w-7xl mx-auto shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      {/* Balance Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 uppercase">Available Balance</p>
          <h2 className="text-3xl font-bold">$1253.75</h2>
          <p className="font-medium text-gray-700">Current Credits</p>
        </div>
        <div className="w-10 h-10 bg-yellow-400 rounded-md" />
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {employeesData.map((data, index) => (
          <div key={index} className="bg-[#FF99FC] p-3 rounded-lg text-center">
            <p className="text-sm font-semibold text-gray-600 uppercase">{data.title}</p>
            <p className="text-xl font-bold text-gray-800">{data.count}</p>
          </div>
        ))}

        {/* New Order Button */}
        <div className="bg-[#FF99FC] p-3 rounded-lg text-center cursor-pointer hover:opacity-80 transition">
          <p className="text-sm font-semibold text-gray-600 uppercase">New Order</p>
          <div className="flex justify-center items-center gap-1 text-xl text-blue-600 font-bold">
            Add <FiPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;