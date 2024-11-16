import React from "react";
import { Link } from "react-router-dom";
import { isDesktop, isAndroid } from "react-device-detect"; // Importing the device detect library

import studentBackground from "../../Student.jpg"; // Student section background

const Choose = () => {
  // Define the button style for Android devices
  const androidButtonStyle = {
    width: "80%", // Make the button width responsive
    height: "75px", // Height for the button
    borderRadius: "12px", // Softer corners
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "#099e2a", // Glassy look
    border: "2px solid rgba(255, 255, 255, 0.18)", // Transparent border
    backdropFilter: "blur(10px)", // Glassmorphism effect
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    color: "#fafafa", // White text color for contrast
    fontSize: "28px",
    fontWeight: "bold",
  };

  // Define the image overlay style for Android devices
  const imageOverlayStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent overlay
    zIndex: -1,
  };

  // Define the common container style
  const commonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height to center content
    gap: "20px", // Space between sections
  };

  return (
    <>
      {isDesktop && (
        <div
          className="content"
          style={{
            ...commonStyle,
            flexDirection: "row",
            background: `url(${studentBackground}) no-repeat center/cover`,
          }}
        >
          <section className="student">
            <Link className="bln btn btn-dark btn-lg" to="/student/login">
              Student
            </Link>
          </section>

          <section className="faculty">
            <Link className="bln btn btn-dark btn-lg" to="/faculty/login">
              Faculty
            </Link>
          </section>
        </div>
      )}

      {isAndroid && (
        <div
          className="content"
          style={{
            ...commonStyle,
            flexDirection: "column", // Stack vertically for mobile
            width: "100%",
            padding: "20px", // Add padding for better spacing
            background: "linear-gradient(to bottom right, #fafafa, #00f2fe)", // Bluish 3D gradient background
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px", // 10px gap between buttons
            width: "100%",
          }}>
            <section className="student" style={{ 
              width: "100%",
              position: "relative",
              backgroundImage: `url("https://source.unsplash.com/random?student")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px", // Add padding around image
            }}>
              <div style={imageOverlayStyle}></div>
              <Link
                className="bln btn"
                to="/student/login"
                style={androidButtonStyle}
              >
                Student
              </Link>
            </section>

            <section className="faculty" style={{ 
              width: "100%",
              position: "relative",
              backgroundImage: `url("https://source.unsplash.com/random?faculty")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px", // Add padding around image
            }}>
              <div style={imageOverlayStyle}></div>
              <Link
                className="bln btn"
                to="/faculty/login"
                style={androidButtonStyle}
              >
                Faculty
              </Link>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Choose;
