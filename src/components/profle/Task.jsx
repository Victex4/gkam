import React, { useState } from "react";
import axios from "axios";
import Banner from "../../assets/handmoney.png";
import { FaMoneyBillWave } from 'react-icons/fa';
import Title from "../../ui/Title";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BannerImg = {
    position: "relative",
    height: "100%",
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
};

const BackgroundStyle = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "blur(7px)",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: -1,
};

const ContentStyle = {
    position: "relative",
    zIndex: 2,
};

const Task = () => {
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [showTask, setShowTask] = useState(false);
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/taskcenter");
  };

    return (
        <div style={BannerImg} className="rounded-2xl p-3 max-w-md w-full shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
            <div style={BackgroundStyle}></div>
            <div style={ContentStyle} className="container">
                <div className="mx-auto pt-[2rem]">
                    <div className="flex items-center text-gray-200 gap-2">
                        <FaMoneyBillWave className="text-green-500 text-3xl" />
                        <Title>Task Center</Title>
                    </div>
                    <div className="pt-[3rem]">
                        <p className="text-gray-800">
                            Complete engaging social media tasks—such as liking, sharing, or following—to earn rewards that enhance your online presence, boost engagement, and foster a vibrant community.
                        </p>
                    </div>
                    <div className="flex justify-between items-center pt-[3rem]">
                        <div className="flex items-center justify-left">
                            <FaArrowRight className="text-4xl text-[#FF01F7] animate-bounce-right" />
                        </div>
                        <button
                          onClick={handleGetStarted}
                          className="inline-flex bg-[#FF01F7] items-center p-2 text-sm text-gray-50 rounded-lg hover:scale-105 duration-150 focus:outline-none focus:ring-2 focus:ring-bg-blue-100"
                        >
                          Get Started
                        </button>
                    </div>
                    {responseMsg && <p className="pt-4 text-sm text-center">{responseMsg}</p>}
                </div>
            </div>
        </div>
    );
};

export default Task;
