"use client"

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faBrain,
  faRobot,
  faChartGantt,
} from "@fortawesome/free-solid-svg-icons";
import { faFigma, faFlipboard } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const subjectsContainerRef = useRef(null);

  const scrollToSubjects = () => {
    if (subjectsContainerRef.current) {
      subjectsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="homepage">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            The Online <span style={{ color: "#FFC30D" }}>Tutor Platform</span>{" "}
            for Africans.
          </h1>
          <p>
            Make Tutor your{" "}
            <span style={{ color: "#FFC30D" }}>personal tutoring</span> partner
            today.
          </p>
          <button onClick={scrollToSubjects}>Join the Training</button>
        </div>
        <div className="hero-right">
          <Image
            src="/heroimage.svg"
            alt="Hero Image"
            width={410}
            height={405}
          />
        </div>
      </div>
      <div className="subjects-container">
        <h2>What would you like to learn?</h2>
        <div className="subjects-container-sub" ref={subjectsContainerRef}>
          <Link href="/schools/web-development" className="subject">
            <FontAwesomeIcon
              icon={faCode}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            Web Development
          </Link>
          <Link href="#" className="subject">
            <FontAwesomeIcon
              icon={faChartGantt}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            Data Science
          </Link>
          <Link href="/schools/artificial-intelligence" className="subject">
            <FontAwesomeIcon
              icon={faBrain}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            Artificial Intelligence
          </Link>
          <Link href="#" className="subject">
            <FontAwesomeIcon
              icon={faRobot}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            Robotics
          </Link>
          <Link href="#" className="subject">
            <FontAwesomeIcon
              icon={faFigma}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            UI/UX Design
          </Link>
          <Link href="#" className="subject">
            <FontAwesomeIcon
              icon={faFlipboard}
              style={{ color: "#FFC30D" }}
              size="2x"
            />
            Project Management
          </Link>
        </div>
      </div>
    </main>
  );
}
