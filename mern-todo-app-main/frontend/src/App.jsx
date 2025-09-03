import { useEffect, useState } from "react";
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { IoClose, IoClipboardOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      // Get the current user's token
      const token = user ? await user.getIdToken() : null;
      
      // Add the token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post("/api/todos", { text: newTodo }, config);
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      // Get the current user's token
      const token = user ? await user.getIdToken() : null;
      
      // Add the token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get("/api/todos", config);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTodos();
      } else {
        navigate('/login');
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      // Get the current user's token
      const token = user ? await user.getIdToken() : null;
      
      // Add the token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.patch(`/api/todos/${id}`, { text: editedText }, config);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      // Get the current user's token
      const token = user ? await user.getIdToken() : null;
      
      // Add the token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      await axios.delete(`/api/todos/${id}`, config);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      // Get the current user's token
      const token = user ? await user.getIdToken() : null;
      
      // Add the token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      }, config);
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setTodos([]);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient-x">
      {/* User info and logout button in top-right corner */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        {user && (
          <div className="text-white font-medium">
            <span className="opacity-80">Signed in as:</span> {user.email}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-white/30">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center drop-shadow-lg">
          ✨ Task Manager
        </h1>

        {/* Add task */}
        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white/70 shadow-inner"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 bg-transparent"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </form>

        {/* Task list */}
        <div className="mt-6">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <IoClipboardOutline size={56} className="mb-3 animate-bounce" />
              <span className="text-lg">No tasks yet. Add your first task!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {todos.map((todo) => (
                  <motion.div
                    key={todo._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/90 backdrop-blur-lg p-4 rounded-lg shadow-md border border-gray-200 flex items-center justify-between"
                  >
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          className="flex-1 p-2 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-inner"
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center transition ${
                              todo.completed
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>
                          <span
                            className={`truncate font-medium ${
                              todo.completed ? "line-through text-gray-400" : "text-gray-800"
                            }`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition"
                            onClick={() => startEditing(todo)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
