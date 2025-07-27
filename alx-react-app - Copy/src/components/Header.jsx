import React from "react";
import reactLogo from '../assets/react.svg'

function Header() {
  return (
    <header className="header-bg flex items-center gap-4 px-8 py-4 shadow-md">
      <img src={reactLogo} alt="React Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-bold tracking-tight text-blue-700">MEA CO₂ Capture Dashboard</h1>
    </header>
  );
}

export default Header;