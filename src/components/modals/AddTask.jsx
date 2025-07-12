import React, { useState } from "react";
import axios from "axios";
import Top from "../header/Top";
import SideBar from "../sideBar/SideBar";

const AddTask = ({ toggleSideBar, isSideBarOpen }) => {
  const [platform, setPlatform] = useState("");
  const [action, setAction] = useState("");
  const [link, setLink] = useState("");
  const [instructions, setInstructions] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!platform || !action || !link) {
      setError("Platform, Action, and Link are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/task", {
        platform,
        action,
        link,
        instructions,
      });

      if (response.status === 201) {
        setSuccess("✅ Task created successfully!");
        setPlatform("");
        setAction("");
        setLink("");
        setInstructions("");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to create task");
    }
  };

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />

      <div className="p-4 max-w-xl md:ml-64 mt-[8rem] mx-auto bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Platform</label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g. Instagram, TikTok"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Action</label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="e.g. Like, Follow, Share"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Task Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Optional task instructions..."
              className="w-full border px-3 py-2 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Task
          </button>

          {success && <p className="text-green-600 mt-2">{success}</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
