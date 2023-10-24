"use client";

import React, { useState } from "react";
import classesData from "../../database/webdevclasses.json";

export default function WebDevelopment() {
  const [formData, setFormData] = useState({
    subject: "HTML Basics",
    date: "",
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

    try {
      const response = await fetch("/api/scheduleclass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
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
  };

  return (
    <main className="schools-container">
      <h1>Web Development Classes</h1>
      <div className="classes-container">
        <p>List of Classes Available</p>
        <div className="classes-sub">
          {classesData.map((classItem, index) => (
            <div className="class" key={index}>
              <span>{classItem.subject}</span>
              <span>{classItem.date}</span>
              <span>
                {classItem.location === "Online"
                  ? "Online Class"
                  : "Physical Class"}
              </span>
              <span>Time: {classItem.time}</span>
              <button>Enroll</button>
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
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
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
