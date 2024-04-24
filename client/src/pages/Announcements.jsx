import React, { useState } from 'react';
import { formatDate } from "date-fns";

const Announcements = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: "Welcome Back!",
      content:
        "We're excited to welcome everyone back for the new semester. Let's make it a great one!",
      date: new Date("2024-04-24"),
    },
    {
      id: 2,
      title: "Upcoming Faculty Meeting",
      content:
        "There will be a faculty meeting on Friday, April 26th, at 10:00 AM in the main conference room.",
      date: new Date("2024-04-22"),
    },
    {
      id: 3,
      title: "Student Council Elections",
      content:
        "Don't forget to vote for your next student council representatives! Voting ends on April 30th.",
      date: new Date("2024-04-20"),
    },
    {
      id: 4,
      title: "Spring Picnic Announcement",
      content:
        "Join us for a fun-filled spring picnic on Saturday, May 4th, at the campus lawn. Food and games provided!",
      date: new Date("2024-04-18"),
    },
    // Add more announcements here
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-6 py-12 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          Latest Announcements
        </h1>
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="mb-8 bg-white rounded-lg shadow-lg"
          >
            <div className="px-8 py-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                {announcement.title}
              </h2>
              <p className="mb-6 text-gray-700">{announcement.content}</p>
              <p className="text-gray-600">
                {formatDate(announcement.date, "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
