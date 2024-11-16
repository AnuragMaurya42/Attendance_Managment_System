import React from "react";
import "../../../App.css";
import logo from "./image.png";
import nit_logo from "./cropped_image.png"
import footer_logo from "./nitsri_logo.svg"
import { Link } from "react-router-dom";
import { isAndroid, isDesktop } from 'react-device-detect';

export const Landing = () => {
  return (
    <>
      {isDesktop && (
        <div data-spy="scroll" data-target="#navbarResponsive">
          <div id="home">
            <nav className="navbar navbar-expand-md navbar-dark bg-transparent fixed-top">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo" style={{ color: "white" }} />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#home" >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#features" >
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact" >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

            </nav>

            <div className="landing">
              <div className="home-wrap">
                <div className="home-inner">
                  <div className="home-bg"></div>
                </div>
              </div>
            </div>
            <div className="caption text-center" style={{ textAlign: "center" }}>
              <h1>
                Welcome to NIT Srinagar's <br />
                Web-Based Attendance Management System
              </h1>
              <Link
                className="btn btn-lg get_started"
                to="/login"
                style={{
                  color: "#000000",
                  backgroundColor: "#fafafa",
                  padding: "10px 20px",
                  transition: "0.3s"
                }}
              >
                <b>Get Started</b>
              </Link>
            </div>
          </div>

          <div id="features" className="offset">
            <div className="white-section">
              <div className="narrow">
                <div className="col-12">
                  <h3 className="heading">Features</h3>
                  <div className="heading-underline"></div>

                  <div className="row text-center">
                    <div className="col-md-6">
                      <div className="feature">
                        <i className="fas fa-stream fa-4x" data-fa-transform="shrink-4.15 up-4.5"></i>
                        <h3>Real-time Monitoring</h3>
                        <p>
                          Provides convenient and real-time monitoring of the student's attendance
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature">
                        <i className="fas fa-archive fa-4x" data-fa-transform="shrink-3 up-5"></i>
                        <h3>Attendance Archive</h3>
                        <p>
                          Provides a record archival policy. The attendance records will be archived after the student has graduated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="offset">
            <footer>
              <div className="row justify-content-center">
                <div className="col-md-5 text-center">
                  <img src={footer_logo} alt="logo" /> <br />
                  <br />
                  <strong>Contact info</strong>
                  <br />
                  <p>
                    Airport Rd, PDPM IIITDM Jabalpur Campus, Khamaria, Jabalpur, Madhya Pradesh 482005.
                    <br />
                    <i className="fas fa-phone"></i> +91-761-2632273 |{" "}
                    <i className="fas fa-print"></i> +91-761-2632524.
                    <br />
                    <i className="fas fa-envelope"></i> not available
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
      {isAndroid && (
        <div
          data-spy="scroll"
          data-target="#navbarResponsive"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            // padding: "15px",
            background: "linear-gradient(to bottom right, #fafafa, #00f2fe)",
          }}
        >
          <div id="home" style={{ width: "100%", textAlign: "center" }}>
            <nav className="navbar2 navbar-expand-md navbar-dark fixed-top">
              <button
                className="navbar-toggler"
                type="button"
                style={{
                  borderColor: "#f0f0f0",       // Custom border color for the button
                  position: "absolute",
                  backgroundColor: "#099e2a",         // Position it absolutely relative to the navbar
                  left: "10px",                 // Place the button 10px from the left edge of the screen
                  top: "15px",                  // Adjust the top to align the button vertically with the navbar
                  zIndex: 1050,                 // Ensure the button is above other elements
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#fafafa"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                  style={{ cursor: "pointer" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#home">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#features">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>


            {/* Centered image */}
            <div className="image-container" style={{ marginBottom: "30px" }}>
              <img
                src={nit_logo}
                alt="NIT Srinagar Campus"
                style={{
                  width: "100%",
                  maxWidth: "200px", // Adjust as needed for size
                  borderRadius: "50%", // Ensures a circular shape
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Shadow will follow the circular shape
                }}
              />
            </div>

            <div style={{ padding: "20px" }}>
              <p
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "20px",    // Space below the paragraph
                  fontWeight: "500",
                  lineHeight: "1.8",       // Adjust this value to control the spacing between lines
                }}
              >
              <strong> Welcome to NIT Srinagar's <br />
              App-Based Attendance Management System</strong>
              </p>

              <Link
                className="btn btn-lg get_started"
                to="/login"
                style={{
                  color: "#fafafa",
                  backgroundColor: "#099e2a",
                  padding: "10px 20px",
                  transition: "0.3s"
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Landing;
