import React from "react";

export default function Home() {
  return (
    <main className="homepage">
      <div className="hero-container">
        <div className="hero-left">
          <h1>The Online Tutor Platform for Africans</h1>
        </div>
        <div className="hero-right"></div>
      </div>
      <div className="subjects-container">
        <h2>What would you like to learn?</h2>
        <div className="subjects-container-sub">
          <div className="subject">Web Development</div>
          <div className="subject">Data Science</div>
          <div className="subject">Artificial Intelligence</div>
          <div className="subject">Robotics</div>
          <div className="subject">UI/UX Design</div>
          <div className="subject">Project Management</div>
        </div>
      </div>
    </main>
  );
}
