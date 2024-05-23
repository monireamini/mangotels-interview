import React from "react";
import '@/app/ui/global.css';
import {inter, dmsans} from '@/app/ui/fonts';
import {NextUIProvider} from "@nextui-org/react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${dmsans.className} antialiased`}>
        <NextUIProvider>
            {children}
        </NextUIProvider>
        </body>
        </html>
    );
}
