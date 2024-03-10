
import "./globals.css";
import 'react-modern-drawer/dist/index.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoneJob.ie",
  description: "DoneJob - Aliança de Serviços",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
    className=" bg-custom-blue" 
     lang="en">
      <body className={inter.className}>
      
        {children}
      </body>
    </html>
  );
}






