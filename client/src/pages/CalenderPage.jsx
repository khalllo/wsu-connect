import { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  RiCalendarEventLine,
  RiDeleteBin6Line,
  RiPencilLine,
} from "react-icons/ri";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Define context for managing events
const EventsContext = createContext();

const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      description: "Discuss project status and upcoming tasks.",
      date: "2024-04-26",
      time: "10:00 AM",
      location: "Conference Room",
      category: "Meeting",
      attendees: ["John Doe", "Jane Smith", "Michael Johnson"],
      color: "#3498db",
    },
    {
      id: 2,
      title: "Project Deadline",
      description: "Deadline for submitting project deliverables.",
      date: "2024-05-05",
      time: "11:59 PM",
      location: "Online",
      category: "Deadline",
      attendees: ["Project Team"],
      color: "#e74c3c",
    },
    {
      id: 3,
      title: "Client Meeting",
      description: "Meeting with ABC Corp to discuss new project requirements.",
      date: "2024-05-10",
      time: "2:00 PM",
      location: "ABC Corp Office",
      category: "Meeting",
      attendees: ["Client Representatives"],
      color: "#2ecc71",
    },
    {
      id: 4,
      title: "Product Launch",
      description: "Launch event for new product line.",
      date: "2024-05-15",
      time: "6:00 PM",
      location: "Grand Ballroom",
      category: "Event",
      attendees: ["Stakeholders", "Media"],
      color: "#f39c12",
    },
    // Add more events here
  ]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

const CalendarPage = () => {
  const { events, addEvent, deleteEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: null,
    time: "",
    location: "",
    category: "",
    attendees: [],
    color: "#3498db", // Default color
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addEvent({
        ...newEvent,
        id: Date.now(),
        date: format(newEvent.date, "yyyy-MM-dd"),
      });
      setNewEvent({
        title: "",
        description: "",
        date: null,
        time: "",
        location: "",
        category: "",
        attendees: [],
        color: "#3498db",
      });
      setShowForm(false);
    }
  };

  // Inside CalendarPage component

  // State for managing drag-and-drop functionality
  const [draggedEvent, setDraggedEvent] = useState(null);

  // Function to handle drag start event
  const handleDragStart = (event, id) => {
    setDraggedEvent(id);
  };

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (event, id) => {
    event.preventDefault();
    const updatedEvents = [...events];
    const draggedEventIndex = updatedEvents.findIndex(
      (event) => event.id === draggedEvent
    );
    const droppedEventIndex = updatedEvents.findIndex(
      (event) => event.id === id
    );
    [updatedEvents[draggedEventIndex], updatedEvents[droppedEventIndex]] = [
      updatedEvents[droppedEventIndex],
      updatedEvents[draggedEventIndex],
    ];
    setEvents(updatedEvents);
  };

  // Function to display event details in a modal
  const handleEventDetails = (event) => {
    // Implement your modal or expanded view logic here
  };

  // Inside the map function for rendering events
  <motion.div
    key={event.id}
    className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    draggable
    onDragStart={(e) => handleDragStart(e, event.id)}
    onDragOver={handleDragOver}
    onDrop={(e) => handleDrop(e, event.id)}
  >
    {/* Display event details */}
    <div
      className="flex items-center"
      onClick={() => handleEventDetails(event)}
    >
      {/* Event icon and details */}
    </div>
    {/* Edit and delete buttons */}
  </motion.div>;

  // Form validation enhancements
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newEvent.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    // Add more specific validation rules

    setErrors(errors);
    return isValid;
  };

  // Styling enhancements
  // Improve the styling of the calendar and event form to make it more visually appealing and intuitive
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">Calendar</h1>
        {/* Event list */}
        <div className="space-y-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center">
                <div
                  className="w-8 h-8 mr-4 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <div>
                  <p className="text-lg font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} | {event.time}
                  </p>
                  <p className="text-gray-700">Location: {event.location}</p>
                  <p className="text-gray-700">
                    Description: {event.description}
                  </p>
                  <p className="text-gray-700">
                    Attendees: {event.attendees.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => deleteEvent(event.id)}
                >
                  <RiDeleteBin6Line className="w-6 h-6" />
                </button>
                {/* Add edit functionality */}
                <button className="text-gray-500 hover:text-gray-800 focus:outline-none">
                  <RiPencilLine className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Add event creation form */}
        <div className="mt-8">
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="block w-full px-4 py-2 mb-4 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
              <ReactDatePicker
                selected={newEvent.date}
                onChange={handleDateChange}
                placeholderText="Date"
                className="block w-full px-4 py-2 mb-4 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.date && <p className="text-red-500">{errors.date}</p>}
              {/* Add other input fields */}
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Add Event
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Add Event
            </button>
          )}
        </div>
        {/* Add drag-and-drop functionality */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <EventsProvider>
      <CalendarPage />
    </EventsProvider>
  );
};

export default App;
