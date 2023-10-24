"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav>
      <div className="nav-left">
        <Link href="/">
          <Image
            src="/tutorlogo.svg"
            alt="Tutor Image"
            width={125}
            height={50}
          />
        </Link>
      </div>
      <div className={`nav-right ${isMobileNavOpen ? "open" : ""}`}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href="#" className={pathname === "/schools" ? "active" : ""}>
          Schools
        </Link>
        <Link href="#" className={pathname === "/my-classes" ? "active" : ""}>
          My Classes
        </Link>
        <Link href="#" className={pathname === "/contactus" ? "active" : ""}>
          Contact Us
        </Link>
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
