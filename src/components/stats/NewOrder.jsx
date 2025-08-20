import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import axios from "axios";

const NewOrder = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedTasks: 0,
    pendingTasks: 0,
    availableBalance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-[#FFE6FE] rounded-xl p-5 w-full max-w-7xl mx-auto shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      {/* Balance Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 uppercase">Available Balance</p>
          <h2 className="text-3xl font-bold">
            ${stats.availableBalance.toFixed(2)}
          </h2>
          <p className="font-medium text-gray-700">Current Credits</p>
        </div>
        <div className="w-10 h-10 bg-yellow-400 rounded-md" />
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-[#FF99FC] p-3 rounded-lg text-center">
          <p className="text-sm font-semibold text-gray-600 uppercase">Total Orders</p>
          <p className="text-xl font-bold text-gray-800">{stats.totalOrders}</p>
        </div>

        <div className="bg-[#FF99FC] p-3 rounded-lg text-center">
          <p className="text-sm font-semibold text-gray-600 uppercase">Completed Tasks</p>
          <p className="text-xl font-bold text-gray-800">{stats.completedTasks}</p>
        </div>

        <div className="bg-[#FF99FC] p-3 rounded-lg text-center">
          <p className="text-sm font-semibold text-gray-600 uppercase">Pending Tasks</p>
          <p className="text-xl font-bold text-gray-800">{stats.pendingTasks}</p>
        </div>

        {/* Replace Add New Order with Referrals */}
        <div className="bg-[#FF99FC] p-3 rounded-lg text-center cursor-pointer hover:opacity-80 transition">
          <p className="text-sm font-semibold text-gray-600 uppercase">Referrals</p>
          <div className="flex justify-center items-center gap-1 text-xl text-blue-600 font-bold">
            View <FiUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
