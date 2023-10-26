"use client"

import React, { useState } from "react";
import classesData from "../database/myclasses.json";

// Function to compare class start dates for sorting
const compareStartDates = (a, b) => {
  const startDateA = new Date(a.startDate);
  const startDateB = new Date(b.startDate);
  return startDateA - startDateB;
};

export default function MyClasses() {
  // Sort the classesData based on start date
  const sortedClassesData = [...classesData].sort(compareStartDates);
  const [myClasses, setMyClasses] = useState(sortedClassesData);

  const handleDelete = async (classId) => {
    try {
      const response = await fetch("/api/myclasses/unenrollclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId }),
      });

      if (response.status === 200) {
        // Class deleted successfully, update UI
        const updatedClasses = myClasses.filter(
          (classItem) => classItem.id !== classId
        );
        setMyClasses(updatedClasses);
      } else {
        alert("Failed to delete the class");
      }
    } catch (error) {
      alert("An error occurred while deleting the class:", error);
    }
  };

  return (
    <main className="schools-container">
      <h1>My Classes</h1>
      <div className="classes-container">
        <p>Classes you are currently enrolled in</p>
        <div className="classes-sub">
          <div className="title">
            <span>Class</span>
            <span>Start Date</span>
            <span>End Date</span>
            <span>Location</span>
            <span>Time</span>
            <button>Enroll</button>
          </div>
          {myClasses.map((classItem, index) => (
            <div className="class" key={index}>
              <span>
                <b>{classItem.subject}</b>
              </span>
              <span>{classItem.startDate}</span>
              <span>{classItem.endDate}</span>
              <span>{classItem.location}</span>
              <span>{classItem.time}</span>
              <button
                style={{ backgroundColor: "#7A0000" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
