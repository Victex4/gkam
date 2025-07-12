import React, { useEffect, useState } from "react";
import axios from "axios";
import Top from "../header/Top";
import SideBar from "../sideBar/SideBar";

const TaskCenter = ({ toggleSideBar, isSideBarOpen, loggedInUser }) => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch all tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err.message);
      }
    };
    fetchTasks();
  }, []);

  // Mark task as completed
  const handleComplete = async (taskId) => {
    if (!loggedInUser?.id) {
      alert("You must be logged in to complete tasks.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/complete-task", {
        userId: loggedInUser.id, // ✅ Replace with actual user ID from auth
        taskId,
      });

      setCompleted((prev) => ({ ...prev, [taskId]: true }));
    } catch (err) {
      alert("Error marking task complete.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />
      <main className="p-4 max-w-xl md:ml-64 mt-32 mx-auto">
        <div className="bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4">🎯 Social Media Tasks</h1>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available yet.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="mb-6 p-4 border rounded bg-gray-50"
              >
                <h2 className="text-xl font-semibold">
                  {task.platform} - {task.action}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {task.instructions}
                </p>
                <a
                  href={task.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline block my-2"
                >
                  🔗 Visit Task Link
                </a>
                <button
                  onClick={() => handleComplete(task._id)}
                  disabled={completed[task._id] || loading}
                  className={`px-4 py-2 rounded ${
                    completed[task._id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  {completed[task._id] ? "✅ Completed" : "✅ Mark as Done"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskCenter;
