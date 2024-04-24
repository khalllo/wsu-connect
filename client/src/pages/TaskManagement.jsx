import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskName.trim() !== "") {
      const newTask = { id: uuidv4(), name: taskName, completed: false };
      setTasks([...tasks, newTask]);
      setTaskName("");
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newName) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleKeyPress = (event, taskId, newName) => {
    if (event.key === "Enter") {
      editTask(taskId, newName);
    }
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tasks, searchTerm]
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="container py-8 mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">
          Task Management
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="flex items-center mb-8"
      >
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task..."
          className="flex-grow px-4 py-3 mr-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-3 text-lg text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Task
        </motion.button>
      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full px-4 py-3 mb-6 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-between px-6 py-4 bg-white rounded-md shadow-md ${
                          task.completed ? "bg-gray-100" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <button
                            className="mr-4 text-gray-600 focus:outline-none"
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            {task.completed ? (
                              <RiCheckboxCircleFill className="text-2xl text-green-500" />
                            ) : (
                              <RiCheckboxBlankCircleLine className="text-2xl text-gray-500" />
                            )}
                          </button>
                          {editingTaskId === task.id ? (
                            <input
                              type="text"
                              value={task.name}
                              onChange={(e) =>
                                editTask(task.id, e.target.value)
                              }
                              onKeyPress={(e) =>
                                handleKeyPress(e, task.id, e.target.value)
                              }
                              className="w-full px-0 py-2 text-lg font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                          ) : (
                            <p
                              className={`text-lg font-medium ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : "text-gray-800"
                              }`}
                            >
                              {task.name}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            className={`mr-4 text-gray-600 focus:outline-none ${
                              editingTaskId === task.id ? "hidden" : ""
                            }`}
                            onClick={() => setEditingTaskId(task.id)}
                          >
                            <AiOutlineEdit className="text-xl text-gray-600 hover:text-blue-500" />
                          </button>
                          <button
                            className="text-gray-600 focus:outline-none"
                            onClick={() => removeTask(task.id)}
                          >
                            <AiOutlineDelete className="text-xl text-red-500 hover:text-red-600" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-lg text-gray-600">No tasks found.</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
};

export default TaskManagement;
