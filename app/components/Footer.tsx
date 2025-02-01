import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 text-center text-white">
      <p>
        &copy; 2025 Plant Identifier. Made with ❣️ by{" "}
        <Link href={"https://www.linkedin.com/in/bhupendra-nath-838887233/"}>
          Bhupendra Nath
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
