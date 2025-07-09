import React, { useEffect, useState } from 'react';
import Top from '../header/Top';
import SideBar from '../sideBar/SideBar';
import Title from '../../ui/Title';
import axios from 'axios';

const AffiliateModal = ({ isSideBarOpen, toggleSideBar, loggedInUser }) => {
  const [referrals, setReferrals] = useState([]);
  const [stats, setStats] = useState({
    totalReward: 0,
    available: 0,
    registrationCount: 0,
  });
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:3001/api/referrals', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReferrals(res.data.referrals || []);
      setStats({
        totalReward: res.data.totalReward || 0,
        available: res.data.available || 0,
        registrationCount: res.data.registrationCount || 0,
      });
    } catch (err) {
      console.error("Error fetching referrals:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReferrals();
}, []);

const referralLink = `https://yourdomain.com/signup?ref=${loggedInUser?.id || ''}`;

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />
      <div className="md:p-8 p-4 bg-[#eff3f6] mt-10 pr-0 md:ml-64">
        <div className="bg-[#eff3f6] min-h-screen py-4 md:px-4 px-2">
          <Title>Affiliate</Title>

          {/* Referral Info */}
          <div className="bg-white shadow w-full md:w-[80%] mt-4 p-4 rounded-2xl">
            <h5 className="font-semibold font-serif">Refer to earn</h5>
            <p className="font-sans text-sm">
              At Glam Booster, you can earn a 5% commission based on your referrals.
            </p>

            <div className="mt-6">
              <label className="block font-semibold mb-2">Your Referral Link</label>
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  alert('Referral link copied!');
                }}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Copy Referral Link
              </button>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="bg-white mt-10 shadow w-full md:w-[80%] p-4 rounded-2xl">
            <h5 className="font-semibold font-serif">Referral Stats</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
              <div className="bg-[#FFE6FE] p-3 rounded">
                <h6 className="font-bold text-lg">Total Reward</h6>
                <p className="text-gray-700">₦{stats.totalReward}</p>
              </div>
              <div className="bg-[#FFE6FE] p-3 rounded">
                <h6 className="font-bold text-lg">Available</h6>
                <p className="text-gray-700">₦{stats.available}</p>
              </div>
              <div className="bg-[#FFE6FE] p-3 rounded">
                <h6 className="font-bold text-lg">Registrations</h6>
                <p className="text-gray-700">{stats.registrationCount}</p>
              </div>
            </div>
          </div>

          {/* Referral Table */}
          <div className="bg-white mt-10 shadow w-full md:w-[80%] p-4 rounded-2xl">
            <h5 className="font-semibold font-serif">Referrals</h5>
            <div className="relative overflow-x-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Reward</th>
                    <th className="px-6 py-3">Available</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No referrals yet
                      </td>
                    </tr>
                  ) : (
                    referrals.map((ref, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="px-6 py-4 text-gray-900">{ref.userName}</td>
                        <td className="px-6 py-4">₦500</td>
                        <td className="px-6 py-4">
                          {stats.available >= 5000 ? '₦500' : '₦0'}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(ref.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateModal;
