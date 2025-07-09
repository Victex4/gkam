import React, { useEffect, useRef, useState } from 'react';
import Top from '../header/Top';
import SideBar from '../sideBar/SideBar';
import Title from '../../ui/Title';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const AccountModal = ({ toggleSideBar, isSideBarOpen }) => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!storedUser?.id) {
        console.warn('⚠️ No user ID found in localStorage.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/user/profile/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUserName(data.userName || '');
        setEmail(data.email || '');
        setSearchText(data.country || '');
        setCountry(data.country || '');
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
        const data = await response.json();

        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) =>
            a.name?.common?.localeCompare(b.name?.common)
          );
          setCountries(sorted);
        } else {
          console.error('Unexpected countries API format:', data);
          setCountries([]);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    getAllCountries();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmailUpdate = async () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser?.id) return alert('No user found.');

    try {
      const res = await fetch(`http://localhost:3001/api/user/update-email/${storedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      });
      res.ok ? alert('Email updated!') : alert('Failed to update email');
    } catch (err) {
      console.error('Email update failed', err);
      alert('Error updating email');
    }
  };

  const handleUsernameUpdate = async () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser?.id) return alert('No user found.');

    try {
      const res = await fetch(`http://localhost:3001/api/user/update-username/${storedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userName }),
      });
      res.ok ? alert('Username updated!') : alert('Failed to update username');
    } catch (err) {
      console.error('Username update failed', err);
      alert('Error updating username');
    }
  };

  const handleCountryUpdate = async () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser?.id) return alert('No user found.');

    try {
      const res = await fetch(`http://localhost:3001/api/user/update-country/${storedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ country }),
      });
      res.ok ? alert('Country updated!') : alert('Failed to update country');
    } catch {
      alert('Error updating country');
    }
  };

  const handlePasswordUpdate = async () => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser?.id) return alert('No user found.');
    if (newPassword !== confirmPassword) return alert('Passwords do not match');

    try {
      const res = await fetch(`http://localhost:3001/api/user/update-password/${storedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      res.ok ? alert('Password updated!') : alert('Failed to update password');
    } catch (err) {
      console.error('Password update failed', err);
      alert('Error updating password');
    }
  };

  const handleSelect = (name) => {
    setSearchText(name);
    setCountry(name);
    setIsDropdownOpen(false);
  };

  const filteredCountries = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />
      <div className="md:ml-64 pt-[6rem] pb-4 bg-[#eff3f6] min-h-screen">
        {/* Account Info */}
        <div className="p-3 mx-10 bg-white rounded-2xl shadow-md">
          <Title>Account Details</Title>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4">
            {/* Username */}
            <div className="w-full md:w-[48%]">
              <label className="block text-sm mb-1">Username:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 bg-[#FFE6FE] border rounded"
              />
              <button onClick={handleUsernameUpdate} className="mt-2 w-full py-1 bg-[#FF99FC] hover:bg-[#FFE6FE] shadow rounded">
                Edit Username
              </button>
            </div>
            {/* Email */}
            <div className="w-full md:w-[48%]">
              <label className="block text-sm mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-[#FFE6FE] border rounded"
              />
              <button onClick={handleEmailUpdate} className="mt-2 w-full py-1 bg-[#FF99FC] hover:bg-[#FFE6FE] shadow rounded">
                Edit Email
              </button>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="p-3 mx-10 mt-7 bg-white rounded-2xl shadow-md">
          <Title>Security Details</Title>
          {[
            ['Current', currentPassword, setCurrentPassword, showCurrentPassword, setShowCurrentPassword],
            ['New', newPassword, setNewPassword, showNewPassword, setShowNewPassword],
            ['Confirm', confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword]
          ].map(([label, value, setter, show, toggleShow], idx) => (
            <div key={idx} className="relative md:w-[60%] mb-4">
              <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={`${label} Password`}
                className="w-full p-2 pr-10 bg-[#FFE6FE] border rounded"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => toggleShow(!show)}
              >
                {show ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
          ))}
          <button
            onClick={handlePasswordUpdate}
            disabled={!newPassword || newPassword !== confirmPassword}
            className={`py-1 px-4 rounded shadow ${
              !newPassword || newPassword !== confirmPassword
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#FF99FC] hover:bg-[#FFE6FE]'
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Country Selector */}
        <div className="p-3 mt-7 mx-10 bg-white rounded-2xl shadow-md">
          <Title>Current Country</Title>
          <div className="relative w-full md:w-[60%] mt-4" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Choose Country"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full p-2 bg-[#FFE6FE] border rounded"
            />
            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border rounded shadow-md max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelect(c.name.common)}
                      className="px-4 py-2 hover:bg-[#FFE6FE] cursor-pointer flex gap-2 items-center"
                    >
                      <img src={c.flags.svg} alt="" className="w-5" />
                      {c.name.common}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-400">No matches found</div>
                )}
              </div>
            )}
            <button
              onClick={handleCountryUpdate}
              className="mt-4 py-1 px-4 bg-[#FF99FC] hover:bg-[#FFE6FE] rounded shadow"
            >
              Change Country
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
