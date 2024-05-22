import React from "react";
import '@/app/ui/global.css';
import { inter, dmsans } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`${dmsans.className} antialiased`}>{children}</body>
      </html>
  );
}
