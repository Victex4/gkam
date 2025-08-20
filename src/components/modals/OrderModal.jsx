import React, { useEffect, useState } from 'react';
import Top from '../header/Top';
import SideBar from '../sideBar/SideBar';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

const OrderModal = ({ toggleSideBar, isSideBarOpen }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.link?.includes(search) ||
    order.service?.toLowerCase().includes(search.toLowerCase()) ||
    order.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />
      <div className="md:p-8 px-3 py-4 bg-[#eff3f6] mt-10 pr-0 md:ml-64">
        <div className="bg-[#eff3f6] min-h-screen py-4 px-4">
          <div className='flex justify-between items-center pb-4'>
            <h1 className="text-gray-600 text-xl font-Poppins">
              Orders History
            </h1>
            <div className='relative'>
              <input
                className='text-sm outline-none py-2 pr-4 pl-10 w-full bg-white border border-[#FF99FC] text-black focus:border-[#FF99FC]'
                type="text"
                placeholder='Search for order..'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CiSearch className='text-gray-600 absolute top-1/4 left-4 translate-y-1/3 text-sm' />
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Link</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Start Count</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">QTY</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="bg-white border-b">
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 break-all">{order.link}</td>
                    <td className="px-6 py-4">${order.amount}</td>
                    <td className="px-6 py-4">{order.startCount || "-"}</td>
                    <td className="px-6 py-4">{order.service}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
