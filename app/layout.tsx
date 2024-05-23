"use client"

import React from "react";
import '@/app/ui/global.css';
import {dmsans} from '@/app/ui/fonts';
import {NextUIProvider} from "@nextui-org/react";
import {Provider} from "react-redux";
import store from "@/app/redux/store";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${dmsans.className} antialiased`}>
        <NextUIProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </NextUIProvider>
        </body>
        </html>
    );
}
