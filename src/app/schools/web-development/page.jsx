"use client";

import React, { useState } from "react";
import classesData from "../../database/webdev.json";

// Function to convert the date format
function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}

// Add this function for formatting the time
function formatTime(timeStr) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  // Parse the input time string to a Date object
  const time = new Date(`1970-01-01T${timeStr}:00`);
  return time.toLocaleTimeString([], options);
}

export default function WebDevelopment() {
  const [formData, setFormData] = useState({
    subject: "HTML Basics",
    startDate: "",
    endDate: "",
    time: "",
    location: "Online", // Default to Online, change to "Physical" when selected
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.startDate = formatDate(formData.startDate);
    formData.endDate = formatDate(formData.endDate);
    formData.time = formatTime(formData.time);

    const classList = JSON.stringify(formData);
    try {
      const response = await fetch("/api/web-development/createclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: classList,
      });

      if (response.status === 200) {
        console.log(classList);
        alert("Class scheduled successfully");
        console.log("Class scheduled successfully");
        // Optionally, you can add logic to update the UI with the new class data
      } else {
        alert("Class scheduling failed");
        console.error("Class scheduling failed");
      }
    } catch (error) {
      alert("Error occurred");
      console.error("An error occurred:", error);
    }
    setFormData({
      subject: "HTML Basics",
      startDate: "",
      endDate: "",
      time: "",
      location: "Online", // Default to Online, change to "Physical" when selected
    });
  };

  const handleEnroll = async (classId) => {
    const enrollmentData = { ...formData, classId }; // Include the class ID in the enrollment data

    try {
      const response = await fetch("/api/myclasses/enrollclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      });

      if (response.status === 200) {
        alert("Enrolled successfully");
        console.log("Enrolled successfully");
        // Optionally, you can add logic to update the UI with the new class data
      } else {
        alert("Enrollment failed");
        console.error("Enrollment failed");
      }
    } catch (error) {
      alert("Error occurred");
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="schools-container">
      <h1>Web Development Classes</h1>
      <div className="classes-container">
        <p>List of Classes Available</p>
        <div className="classes-sub">
          <div className="title">
            <span>Class</span>
            <span>Start Date</span>
            <span>End Date</span>
            <span>Location</span>
            <span>Time</span>
            <button>Enroll</button>
          </div>
          {classesData.map((classItem, index) => (
            <div className="class" key={index}>
              <span>
                <b>{classItem.subject}</b>
              </span>
              <span>{classItem.startDate}</span>
              <span>{classItem.endDate}</span>
              <span>{classItem.location}</span>
              <span>{classItem.time}</span>
              <button onClick={() => handleEnroll(classItem.id)}>Enroll</button>
            </div>
          ))}
        </div>
      </div>
      <div className="create-class">
        <h2>Don't see a class you're available for?</h2>
        <p>Schedule a class below</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            >
              <option value="HTML Basics">HTML Basics</option>
              <option value="CSS Basics">CSS Basics</option>
              <option value="JavaScript Basics">JavaScript Basics</option>
              <option value="SCSS Basics">SCSS Basics</option>
              <option value="Tailwind Basics">Tailwind Basics</option>
              <option value="React Basics">React Basics</option>
              <option value="Python Basics">Python Basics</option>
              <option value="Django Basics">Django Basics</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </select>
          </div>
          <button type="submit">Schedule Class</button>
        </form>
      </div>
    </main>
  );
}
