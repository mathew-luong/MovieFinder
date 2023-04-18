"use client";

import { createContext, useState } from "react";

export interface loginType {
    openModal: any;
    closeModal: any;
}

export const LoginModalContext = createContext({
    show: false,
    openModal: () => {},
    closeModal: () => {},
});

export default function ModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // State to control if the login modal is open
    const [show, setShow] = useState(false);

    const openModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    return (
        <LoginModalContext.Provider value={{ show, openModal, closeModal }}>
            {children}
        </LoginModalContext.Provider>
    );
}
