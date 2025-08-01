import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "NextMatch",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id || null;

  return (
    <html lang="en">
      <body className="overflow-x-hidden w-full">
        <Providers userId={userId}>
          <div className="w-full max-w-full">
            <TopNav userInfo={session?.user}/>
            <main className='container mx-auto px-4'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}