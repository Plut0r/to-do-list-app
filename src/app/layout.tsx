import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/shared/sidebar";
import { ProjectNavigation } from "@/components/shared/project-navigation";
import { Navbar } from "@/components/shared/navbar";
import ThemeManager from "@/contexts/theme-manager";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do List App",
  description: "To-Do List App Assessment with 3D Twist ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo2.variable} antialiased flex h-screen overflow-hidden`}
      >
        <ThemeManager>
          <Sidebar />
          <ProjectNavigation />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-auto">
              <div className="container h-full">{children}</div>
            </main>
          </div>
        </ThemeManager>
      </body>
    </html>
  );
}
