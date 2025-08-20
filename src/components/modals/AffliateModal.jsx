import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

import Top from '../header/Top'; // ✅ Confirm path to your Top component
import SideBar from '../sideBar/SideBar'; // ✅ Confirm path to your SideBar component
import Title from '../../ui/Title'; // ✅ Confirm path to your Title component

const AffiliateModal = ({ isSideBarOpen, toggleSideBar, loggedInUser }) => {
    const [referrals, setReferrals] = useState([]);
    const [stats, setStats] = useState({
        totalReward: 0,
        available: 0,
        registrationCount: 0,
    });
    const [loading, setLoading] = useState(true);

    // Dynamic referral link based on environment and loggedInUser ID
    // IMPORTANT: Replace 'http://localhost:5173' with your actual frontend domain in production
    // You might define VITE_FRONTEND_URL in your .env file for Vite projects.
    const frontendBaseUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
    const referralLink = `${frontendBaseUrl}/register?ref=${loggedInUser?.id || ''}`;


    useEffect(() => {
        const fetchReferrals = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('No token found. User might not be logged in.');
                    setLoading(false);
                    // Optionally redirect to login if token is missing
                    // navigate('/login'); // Uncomment and import useNavigate if needed
                    return;
                }

                // Ensure loggedInUser and its ID are available before making the request
                // This prop should be passed from a parent component (e.g., Dashboard)
                if (!loggedInUser || !loggedInUser.id) {
                    console.warn('loggedInUser or its ID is not available. Cannot fetch referrals.');
                    setLoading(false);
                    return;
                }

                // Make the API call to your backend to get referral data
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
                toast.error("Failed to load referral data.");
                // Handle specific errors like 401/403 if token is invalid/expired
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // navigate('/login'); // Uncomment and import useNavigate if you want to redirect
                }
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        // Only fetch referrals if the loggedInUser object (containing the ID) is available
        // This prevents fetching before the user's authentication state is fully loaded.
        if (loggedInUser && loggedInUser.id) {
            fetchReferrals();
        }
    }, [loggedInUser]); // Re-run effect if loggedInUser changes (e.g., after initial load or login)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                toast.success('Referral link copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy link:', err);
                toast.error('Failed to copy link.');
            });
    };

    return (
        <div>
            <Top toggleSideBar={toggleSideBar} />
            <SideBar isSideBarOpen={isSideBarOpen} />
            <div className="md:p-8 p-4 bg-[#eff3f6] mt-10 pr-0 md:ml-64">
                <div className="bg-[#eff3f6] min-h-screen py-4 md:px-4 px-2">
                    <Title>Affiliate</Title>

                    {loading ? (
                        <p className="text-center text-gray-700 mt-8">Loading referral data...</p>
                    ) : (
                        <>
                            {/* Referral Info Section */}
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
                                        onClick={handleCopyLink}
                                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                                    >
                                        Copy Referral Link
                                    </button>
                                </div>
                            </div>

                            {/* Referral Stats Section */}
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

                            {/* Referral Table Section */}
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
                                                    // Use ref._id as key if available, otherwise index (less ideal)
                                                    <tr key={ref._id || index} className="bg-white border-b">
                                                        <td className="px-6 py-4 text-gray-900">{ref.userName}</td>
                                                        {/* These reward values should ideally come from backend data per referral */}
                                                        <td className="px-6 py-4">₦500</td>
                                                        <td className="px-6 py-4">
                                                            {/* This logic should also ideally be driven by backend data */}
                                                            {stats.available >= 5000 ? '₦500' : '₦0'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {/* Format date, handle if createdAt is missing */}
                                                            {ref.createdAt ? new Date(ref.createdAt).toLocaleDateString() : 'N/A'}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* ToastContainer for react-toastify notifications */}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default AffiliateModal;
