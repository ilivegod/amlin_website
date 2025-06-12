"use client";

import React from "react";
import Challenge from "../components/Challenge";

import OurMission from "./components/OurMission";
import OurValues from "./components/OurValues";

function About() {
  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      <OurMission />
      <OurValues />
      <Challenge />
    </div>
  );
}

export default About;
