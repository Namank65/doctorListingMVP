import { Toaster } from "react-hot-toast";
import SideBar from "./components/filter";
import Header from "./components/header";
import "./globals.css";
import { UserProvider } from "./utils/context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 ">
        <UserProvider>
          <Header />
          <div className="flex">
            <SideBar />
            {children}
          </div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
