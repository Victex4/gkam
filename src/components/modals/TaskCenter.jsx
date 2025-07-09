import React, { useEffect, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";
import Top from "../header/Top";
import SideBar from "../sideBar/SideBar";

const TaskCenter = ({ toggleSideBar,isSideBarOpen }) => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleComplete = async (taskId) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/complete-task", {
        userId: "example-user-id", // Replace with auth user ID
        taskId,
      });
      setCompleted((prev) => ({ ...prev, [taskId]: true }));
    } catch (err) {
      alert("Error completing task.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Top toggleSideBar={toggleSideBar}/>
        <SideBar isSideBarOpen={isSideBarOpen}/>
      <div className="p-4 max-w-xl md:ml-64 mt-[8rem] mx-auto bg-white rounded shadow">
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Social Media Tasks</h1>
            {tasks.map((task) => (
              <div key={task._id} className="mb-6 p-4 border rounded">
                <h2 className="text-xl font-semibold">{task.platform} - {task.action}</h2>
                <p className="text-sm text-gray-600">{task.instructions}</p>
                <a href={task.link} target="_blank" rel="noreferrer" className="text-blue-500 underline block my-2">
                  Visit Task Link
                </a>
                <button
                  className={`bg-green-500 text-white px-4 py-1 rounded ${completed[task._id] ? "opacity-50" : ""}`}
                  disabled={completed[task._id] || loading}
                  onClick={() => handleComplete(task._id)}
                >
                  {completed[task._id] ? "Completed" : "Mark as Done"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCenter;
