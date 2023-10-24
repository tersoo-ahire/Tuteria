"use client";

import React, { useState } from "react";
import classesData from "../../database/datascience.json";

// Function to convert the date format
function formatDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}

export default function DataScience() {
  const [formData, setFormData] = useState({
    subject: "Machine Learning Basics",
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

    formData.date = formatDate(formData.date);

    const classList = JSON.stringify(formData);
    try {
      const response = await fetch("/api/datascience/createclass", {
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
      subject: "Machine Learning Basics",
      date: "",
      time: "",
      location: "Online", // Default to Online, change to "Physical" when selected
    });
  };

  return (
    <main className="schools-container">
      <h1>Web Development Classes</h1>
      <div className="classes-container">
        <p>List of Classes Available</p>
        <div className="classes-sub">
          {classesData.map((classItem, index) => (
            <div className="class" key={index}>
              <span>
                <b>{classItem.subject}</b>
              </span>
              <span>{classItem.date}</span>
              <span>Location: {classItem.location}</span>
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
              <option value="Introduction to Data Science">
                Introduction to Data Science
              </option>
              <option value="Data Analysis Fundamentals">
                Data Analysis Fundamentals
              </option>
              <option value="Machine Learning Basics">
                Machine Learning Basics
              </option>
              <option value="Statistical Analysis">Statistical Analysis</option>
              <option value="Data Visualization Techniques">
                Data Visualization Techniques
              </option>
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
