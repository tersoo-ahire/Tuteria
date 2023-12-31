import "../app/styles/globals.css";
import "../app/styles/desktop.css";
import "../app/styles/tablet_large.css";
import "../app/styles/tablet_small.css";
import "../app/styles/mobile.css";
import Navigation from "./components/navigation";
import Footer from "./components/Footer";

export const metadata = {
  title: "Tutor App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/icon.svg" type="image/x-icon" />
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
