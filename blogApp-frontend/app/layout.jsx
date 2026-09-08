import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "blogApp | Share Your Story",
  description: "A modern blog management application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

