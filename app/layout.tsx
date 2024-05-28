import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Importing Poppins font
import ReactQueryProvider from "./utils/ReactQueryProvider";
import "./globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] }); // Using Poppins font

export const metadata: Metadata = {
  title: "Gotruhub Admin",
  description: "Gotruhub Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="../images/favicon.svg" type="image/x-icon" />
      </head>
      <body className={poppins.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
