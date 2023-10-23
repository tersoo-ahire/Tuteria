"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <Image
          src="/veegil_logo.svg"
          fill
          alt="Tutor Logo"
        />
      </div>
      <div className={`nav-right ${isMobileNavOpen ? "open" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/schools">Schools</Link>
        <Link href="/services">Services</Link>
        <Link href="/contactus">Contact Us</Link>
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
