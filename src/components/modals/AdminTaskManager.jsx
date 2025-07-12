import React, { useEffect, useState } from "react";
import axios from "axios";
import Top from "../header/Top";
import SideBar from "../sideBar/SideBar";

const AdminTaskManager = ({ toggleSideBar, isSideBarOpen }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [platform, setPlatform] = useState("");
  const [action, setAction] = useState("");
  const [link, setLink] = useState("");
  const [instructions, setInstructions] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const startEdit = (task) => {
    setEditingTask(task._id);
    setPlatform(task.platform);
    setAction(task.action);
    setLink(task.link);
    setInstructions(task.instructions);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setPlatform("");
    setAction("");
    setLink("");
    setInstructions("");
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:3001/task/${editingTask}`, {
      platform,
      action,
      link,
      instructions,
    });
    cancelEdit();
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await axios.delete(`http://localhost:3001/task/${taskId}`);
    fetchTasks();
  };

  return (
    <div>
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />

      <div className="p-4 max-w-3xl md:ml-64 mt-[8rem] mx-auto bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Admin Task Manager</h1>

        {tasks.map((task) => (
          <div key={task._id} className="mb-6 p-4 border rounded">
            {editingTask === task._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full border px-2 py-1"
                />
                <input
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full border px-2 py-1"
                />
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border px-2 py-1"
                />
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full border px-2 py-1"
                ></textarea>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold">{task.platform} - {task.action}</h2>
                <p className="text-sm text-gray-600">{task.instructions}</p>
                <a href={task.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                  {task.link}
                </a>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskManager;
