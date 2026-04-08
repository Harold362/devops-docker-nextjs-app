import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "APP WASHING TO SHOES",
  description: "APP WITH LOGIN AND DASHBOARD",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
