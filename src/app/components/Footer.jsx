"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faSquareXTwitter,
  faInstagramSquare,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-info">
          <Image
            src="/tutorlogo2.svg"
            alt="Tutor Logo"
            width={125}
            height={50}
          />
          <p>The money app for Africans.</p>
          <div className="icon-container">
            <span>
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={faSquareXTwitter}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={faInstagramSquare}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={faLinkedin}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={faTiktok}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                icon={faYoutube}
                size="xl"
                style={{ color: "#FFC30D" }}
              />
            </span>
          </div>
          <p>
            1450 Millenium towers, 24b Thomas Sankara crescent, C.B.D., Abuja,
            Nigeria.
          </p>
        </div>
        <div className="footer-info">
          <h3>Personal</h3>
          <Link href="#">Discover Personal</Link>
          <Link href="#">Transfer & Spend</Link>
          <Link href="#">Save</Link>
          <Link href="#">Investments</Link>
          <Link href="#">Veegil Card</Link>
        </div>
        <div className="footer-info">
          <h3>Business</h3>
          <Link href="#">Discover Business</Link>
          <Link href="#">Business Registration</Link>
          <Link href="#">SoftPOS</Link>
          <Link href="#">Invoicing</Link>
          <Link href="#">Electricity</Link>
        </div>
        <div className="footer-info">
          <h3>Company</h3>
          <Link href="#">Blog</Link>
          <Link href="#">Press</Link>
          <Link href="#">Join Our Team</Link>
          <Link href="#">About Us</Link>
        </div>
      </footer>
      <div id="footer-end">
        <p>© 2023 Ahire Tersoo David. All rights reserved.</p>
      </div>
    </>
  );
}
