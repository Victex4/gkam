import React, { useEffect, useState } from "react";
import axios from "axios"; // Using axios for consistency with other components
import { useNavigate } from "react-router-dom"; // To handle redirection if not logged in

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            const storedUser = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            // Check if user data and token exist in localStorage
            if (!storedUser || !storedUser.id || !token) {
                console.warn("⚠️ No user ID or token found in localStorage. Redirecting to login.");
                setLoading(false);
                // Redirect to login if not authenticated
                navigate('/login'); // Adjust '/login' to your actual login route
                return;
            }

            try {
                // Make an authenticated request to your backend profile endpoint
                const res = await axios.get(`http://localhost:3001/api/user/profile/${storedUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the JWT token
                    },
                });

                // Assuming the backend sends back the user object directly
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                console.error('❌ Failed to load user profile:', err);
                setError("Failed to load user data. Please try logging in again.");
                setLoading(false);

                // If token is invalid or expired (e.g., 401/403 response), clear local storage and redirect to login
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/login'); // Redirect to login
                }
            }
        };

        fetchUser();
    }, [navigate]); // Add navigate to dependency array

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-700">Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">{error}</p>
                <button
                    onClick={() => navigate('/login')}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // Render user data if available
    return (
        <div
            className="bg-[#FF99FC] bg-plus-pattern bg-repeat rounded-2xl p-4 max-w-md w-full shadow-[0_4px_8px_rgba(0,0,0,0.3)] mx-auto my-8"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff20'%3E%3Crect x='9' width='2' height='20'/%3E%3Crect y='9' width='20' height='2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
            }}
        >
            {user ? (
                <>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Glambooster</p>
                            <h2 className="text-2xl font-bold leading-tight">{user.userName}</h2>
                            <p className="text-sm text-gray-700">{user.email}</p>
                            {/* Ensure user.country exists before displaying */}
                            {user.country && <p className="text-sm text-gray-600 mt-1">🌍{user.country}</p>}
                        </div>

                        {/* You can replace the image path with a real profile image later */}
                        <img
                            src="/default-avatar.png" // Make sure this image exists in your public folder
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/cccccc/white?text=User'; }} // Fallback image
                        />
                    </div>

                    <div className="mt-2 text-sm">
                        <p className="text-gray-600">Member Since</p>
                        <h3 className="text-lg text-gray-800 font-bold">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }) : 'N/A'}
                        </h3>
                    </div>
                </>
            ) : (
                // This block should ideally not be reached if loading/error states are handled above
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default User;
