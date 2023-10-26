"use client";

import React, { useState } from "react";
import classesData from "../../database/artificialintelligence.json";

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

export default function DataScience() {
  const [formData, setFormData] = useState({
    subject: "Deep Learning Foundations",
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
      const response = await fetch("/api/artificial-intelligence/createclass", {
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
      subject: "Deep Learning Foundations",
      startDate: "",
      endDate: "",
      time: "",
      location: "Online", // Default to Online, change to "Physical" when selected
    });
  };

  return (
    <main className="schools-container">
      <h1>Artificial Intelligence Classes</h1>
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
                Reinforcement Learning Strategies
              </option>
              <option value="Introduction to Data Science">
                Deep Learning Foundations
              </option>
              <option value="Data Analysis Fundamentals">
                AI Ethics and Responsible AI
              </option>
              <option value="Machine Learning Basics">AI in Healthcare</option>
              <option value="Statistical Analysis">Statistical Analysis</option>
              <option value="Data Visualization Techniques">
                AI in Finance
              </option>
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
