import React, { useState, useEffect } from "react";
import axios from "axios";

const Name = ({ platform }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [accountLink, setAccountLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showLimitNotice, setShowLimitNotice] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({ price: "", time: "" });

  const API_KEY = "YOUR_API_KEY"; // Replace with your Exo Booster API key
  const API_URL = "https://exosupplier.com/api/v2";

  const handleFocus = () => {
    setShowLimitNotice(true);
    setTimeout(() => {
      setShowLimitNotice(false);
    }, 3000);
  };

  const platformServices = {
    WhatsApp: ["Channel followers", "Channel Emoji reactions"],
    Instagram: [
      "Followers",
      "Post likes",
      "Video/ reel views",
      "Custom Comments",
      "Story views",
    ],
    Twitter: ["Followers", "Likes", "Retweet"],
    Facebook: [
      "Page followers",
      "Profile followers",
      "Page likes",
      "Post likes",
      "Emoji post reactions",
      "Post shares",
      "Group Members",
      "Video/ reel views",
      "Custom Comments",
      "Page reviews",
    ],
    YouTube: ["Subscribers", "Views", "Likes"],
    TikTok: [
      "Followers",
      "Video Likes",
      "Video Views",
      "Video Saves",
      "Video Shares",
      "Custom Comments",
      "Live Likes",
    ],
    NG: ["Nigeria Service 1", "Nigeria Service 2"],
    USA: ["USA Service 1", "USA Service 2"],
    ALL: [],
  };

  const serviceIdMap = {
    "Instagram Followers": 101,
    "Instagram Post likes": 102,
    "Facebook Page followers": 103,
    "YouTube Subscribers": 104,
    // Add all mappings here
  };

  const getServiceId = (name) => {
    return serviceIdMap[`${platform} ${name}`] || null;
  };

  const nestedOptions = {
    "Post views": ["Specific post", "Previous post", "Future post"],
    Reactions: ["Specific post", "Previous post", "Future post"],
  };

  const pricingData = {
    WhatsApp: {
      "Channel followers": [
        { price: "4060 NGN", time: "3 hrs" },
        { price: "1988 NGN", time: "3 hrs" },
      ],
      "Channel Emoji reactions": [{ price: "3360 NGN", time: "5 hrs" }],
    },
    YouTube: {
      Subscribers: [{ price: "6230 NGN", time: "24 hrs" }],
      Views: [{ price: "1890 NGN", time: "8 hrs" }],
      Likes: [{ price: "1680 NGN", time: "1 hr" }],
    },
    Twitter: {
      Followers: [{ price: "11158 NGN", time: "7 hrs" }],
      Likes: [{ price: "2940 NGN", time: "5 hrs" }],
      Retweet: [{ price: "2100 NGN", time: "3 hrs" }],
    },
    Facebook: {
      "Page followers": [{ price: "1988 NGN", time: "3 hrs" }],
      "Profile followers": [{ price: "1988 NGN", time: "3 hrs" }],
      "Page likes": [{ price: "3219.999 NGN", time: "3 hrs" }],
      "Post likes": [{ price: "1050 NGN", time: "3 hrs" }],
      "Emoji post reactions": [{ price: "840 NGN", time: "3 hrs" }],
      "Post shares": [{ price: "42 NGN", time: "3 hrs" }],
      "Group Members": [{ price: "2632 NGN", time: "3 hrs" }],
      "Video/ reel views": [{ price: "37.8 NGN", time: "4 hrs" }],
      "Custom Comments": [{ price: "1274 NGN", time: "24 hrs" }],
      "Page reviews": [{ price: "784 NGN", time: "24 hrs" }],
    },
    Instagram: {
      Followers: [
        { price: "1988 NGN", time: "30 mins" },
        { price: "5830 NGN", time: "5 hrs" },
      ],
      "Post likes": [
        { price: "35 NGN", time: "30 mins" },
        { price: "952 NGN", time: "2 hrs" },
      ],
      "Video/ reel views": [
        { price: "8.4 NGN", time: "30 mins" },
        { price: "210 NGN", time: "30 mins" },
      ],
      "Custom Comments": [{ price: "189 NGN", time: "4 hrs" }],
    },
    TikTok: {
      Followers: [{ price: "2730 NGN", time: "6 hrs" }],
      "Video Likes": [{ price: "196 NGN", time: "20 mins" }],
      "Video Views": [{ price: "1.4 NGN", time: "10 mins" }],
      "Video Saves": [{ price: "280 NGN", time: "20 mins" }],
      "Video Shares": [{ price: "30.799 NGN", time: "30 mins" }],
      "Custom Comments": [{ price: "42 NGN", time: "1 hr" }],
      "Live Likes": [{ price: "196 NGN", time: "10 mins" }],
    },
  };

  useEffect(() => {
    setServices(platformServices[platform] || []);
    setSelectedService("");
    setSelectedType("");
    setAccountLink("");
    setQuantity("");
    setServiceInfo({ price: "", time: "" });
  }, [platform]);

  useEffect(() => {
    const infoList = pricingData[platform]?.[selectedService] || [];
    if (infoList.length > 0) {
      setServiceInfo(infoList[0]);
    } else {
      setServiceInfo({ price: "", time: "" });
    }
  }, [platform, selectedService]);

  const handleOrderSubmit = async () => {
    const serviceId = getServiceId(selectedService);

    if (!serviceId) {
      alert("❌ Service ID not found. Please check mapping.");
      return;
    }

    if (!selectedService || !accountLink || !quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    const postData = {
      key: API_KEY,
      action: "add",
      service: serviceId,
      link: accountLink,
      quantity: quantity,
    };

    try {
      const response = await axios.post(API_URL, postData);
      if (response.data.order) {
        alert(`✅ Order placed on Exo Booster! Order ID: ${response.data.order}`);

        await axios.post("http://localhost:5000/api/glam/place-order", {
          service: serviceId,
          link: accountLink,
          quantity: quantity,
        });
      } else {
        alert("⚠️ Order failed. Please check your input or try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("❌ Error placing order.");
    }
  };

  return (
    <div className="pt-4 space-y-5">
      {/* Service Selection */}
      <div>
        <h5 className="font-Poppins text-gray-600 font-medium">{platform} Service</h5>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full bg-[#FFF5FF] pl-6 py-2 font-Poppins text-gray-600 text-sm rounded-md"
        >
          <option value="">Select a service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Nested Options */}
      {nestedOptions[selectedService] && (
        <div>
          <h5 className="font-Poppins text-gray-600 font-medium">Options for {selectedService}</h5>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#FFF5FF] pl-6 py-2 font-Poppins text-gray-600 text-sm rounded-md"
          >
            <option value="">Select an option</option>
            {nestedOptions[selectedService].map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Fallback Type */}
      {!nestedOptions[selectedService] && (
        <div>
          <h5 className="font-Poppins text-gray-600 font-medium">Type</h5>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#FFF5FF] pl-6 py-2 font-Poppins text-gray-600 text-sm rounded-md"
          >
            <option value="">Average Quality Followers</option>
            <option value="High Quality">High Quality</option>
            <option value="Low Quality">Low Quality</option>
          </select>
        </div>
      )}

      {/* Account Link */}
      <div>
        <h5 className="font-Poppins text-gray-600 font-medium">{platform} Account Link</h5>
        <input
          type="text"
          placeholder="Paste the account or video link"
          value={accountLink}
          onChange={(e) => setAccountLink(e.target.value)}
          className="w-full bg-[#FFF5FF] pl-6 py-2 font-Poppins text-gray-600 text-sm rounded-md"
        />
      </div>

      {/* Quantity */}
      <div className="relative">
        <h5 className="font-Poppins text-gray-600 font-medium">Quantity</h5>
        <input
          type="number"
          min="100"
          max="1000"
          placeholder="Enter number of followers/likes"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onFocus={handleFocus}
          className="w-full bg-[#FFF5FF] pl-6 py-2 font-Poppins text-gray-600 text-sm rounded-md"
        />
        {showLimitNotice && (
          <div className="absolute left-0 mt-1 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded shadow-sm z-10">
            Min: 100 | Max: 1000
          </div>
        )}
      </div>

      {/* Price & Time */}
      {serviceInfo.price && (
        <div className="flex flex-col justify-between md:flex-row gap-2 mt-2">
          <div>
            <h5 className="font-Poppins text-gray-600 font-medium">Price</h5>
            <input
              type="text"
              value={serviceInfo.price}
              disabled
              className="w-full bg-gray-200 pl-6 py-2 font-Poppins text-gray-800 text-sm rounded-md cursor-not-allowed"
            />
          </div>
          <div>
            <h5 className="font-Poppins text-gray-600 font-medium">Estimated Time</h5>
            <input
              type="text"
              value={serviceInfo.time}
              disabled
              className="w-full bg-gray-200 pl-6 py-2 font-Poppins text-gray-800 text-sm rounded-md cursor-not-allowed"
            />
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleOrderSubmit}
        className="w-full bg-blue-600 text-white font-Poppins py-2 rounded-md mt-4 hover:bg-blue-700 transition"
      >
        Submit Order
      </button>
    </div>
  );
};

export default Name;
