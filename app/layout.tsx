"use client"

import React from "react";
import '@/app/ui/global.css';
import {dmsans} from '@/app/ui/fonts';
import {NextUIProvider} from "@nextui-org/react";
import {Provider} from "react-redux";
import {store, persistor} from "@/app/redux/store";
import {PersistGate} from 'redux-persist/integration/react';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${dmsans.className} antialiased`}>
        <NextUIProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </NextUIProvider>
        </body>
        </html>
    );
}
