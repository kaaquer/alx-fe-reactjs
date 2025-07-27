import React from "react";

function Footer() {
  return (
    <footer className="footer-bg text-center py-4 text-gray-500 text-sm border-t">
      <p>&copy; {new Date().getFullYear()} MEA CO₂ Capture Analysis</p>
    </footer>
  );
}

export default Footer;