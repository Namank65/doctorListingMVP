import { Toaster } from "react-hot-toast";
import SideBar from "./components/filter";
import Header from "./components/header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-100 '>
        <Header/>
        <div className="flex">
        <SideBar/>
        {children}
        </div>
        <Toaster/>
      </body>
    </html>
  );
}
