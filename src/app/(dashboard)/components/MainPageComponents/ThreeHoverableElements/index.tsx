import Link from "next/link";
import Project from "./Project";
import Assembly from "./Assembly";
import Execution from "./Execution";

export default function ThreeHoverableElements() {
  return (
    <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 w-full bg-[#242323]">
      <Project />
      <Execution />
      <Assembly />
    </div>
  );
}
