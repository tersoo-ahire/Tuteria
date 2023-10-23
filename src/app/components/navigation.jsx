"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import logo from "../assets/veegil_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav>
      <div className="nav-left">
        <img src={logo} alt="Navigation Logo" />
      </div>
      <div className={`nav-right ${isMobileNavOpen ? "open" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/schools">Schools</Link>
      </div>
      <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
        {isMobileNavOpen ? (
          <FontAwesomeIcon
            icon={faXmark}
            size="2xl"
            style={{
              color: "black",
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            style={{
              color: "black",
            }}
          />
        )}
      </div>
    </nav>
  );
}
