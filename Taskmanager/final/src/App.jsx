import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/v1/tasks"; // Backend API base

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Fetch tasks on page load
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Create task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, completed: false }),
      });

      const newTask = await res.json();
      setTaskName("");
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditedName(task.name);
  };

  const handleSave = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">📝 Task Manager</h1>

      <form
        onSubmit={handleAddTask}
        className="max-w-xl mx-auto bg-white p-4 shadow-md rounded flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter new task..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <div className="max-w-xl mx-auto mt-6 bg-white p-4 shadow rounded">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, !task.completed)}
                    className="w-4 h-4"
                  />
                  {editingId === task._id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="flex-1 border rounded px-2 py-1"
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.name}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId === task._id ? (
                    <>
                      <button
                        onClick={() => handleSave(task._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
