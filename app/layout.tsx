import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Research Lab",
  description: "Frontend assignment with Next.js + ShadCN UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50 min-h-screen"}>
        <div className="container mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Pokemon Research Lab</h1>
            <p className="text-sm text-muted-foreground">
              Next.js + ShadCN UI + Zustand + TanStack
            </p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
