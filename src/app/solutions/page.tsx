import React from "react";
import Challenge from "../components/Challenge";
import IndustrySolutions from "./components/IndustrySolutions";
import SolutionsThatWork from "./components/SolutionsThatWork";

function Solutions() {
  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      <IndustrySolutions />
      <SolutionsThatWork />
      <Challenge />
    </div>
  );
}

export default Solutions;
