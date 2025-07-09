import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState(null);
  const [country, setCountry] = useState("");
   const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');


useEffect(() => {
  const fetchUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !storedUser.id) {
      console.warn("⚠️ No user ID found in localStorage.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/user/profile/${storedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
      setUserName(data.userName || '');
      setEmail(data.email || '');
      setCountry(data.country || '');
    } catch (error) {
      console.error('Failed to load user', error);
    }
  };

  fetchUser();
}, []);
  

  return (
    <div
      className="bg-[#FF99FC] bg-plus-pattern bg-repeat rounded-2xl p-4 max-w-md w-full shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
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
              <p className="text-sm text-gray-600 mt-1">🌍{country}</p>

            </div>

            {/* You can replace the image path with a real profile image later */}
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
          </div>

          <div className="mt-2 text-sm">
            <p className="text-gray-600">Member Since</p>
            <h3 className="text-lg text-gray-800 font-bold">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h3>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
