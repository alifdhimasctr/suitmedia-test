// layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar";  // Mengimpor Navbar dari file yang sudah dibuat

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SuitMedia App",
  description: "App By Suitmedia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
