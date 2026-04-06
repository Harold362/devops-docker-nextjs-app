import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Mi App",
  description: "App con Login y Dashboard",
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
