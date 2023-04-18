"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./modalprovider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class">
                <ModalProvider>
                    {/* Notification to show when a user has logged in / signed up */}
                    <Toaster
                        toastOptions={{
                            success: {
                                style: {
                                    borderColor: "green",
                                    borderWidth: "2px",
                                },
                            },
                            error: {
                                style: {
                                    borderColor: "red",
                                    borderWidth: "2px",
                                    zIndex: 9999999,
                                },
                            },
                        }}
                    />
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
