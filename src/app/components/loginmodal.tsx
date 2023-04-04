"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

export default function LoginModal() {
    let [isOpen, setIsOpen] = useState(false);
    let [mode, setMode] = useState("Login");

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setMode("Login");

        setIsOpen(true);
    }

    function switchMode() {
        if (mode === "Login") {
            setMode("Sign Up");
        } else {
            setMode("Login");
        }
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex justify-center w-full sm:justify-start">
                <button
                    type="button"
                    onClick={openModal}
                    className="flex justify-center w-full gap-4 px-4 py-3 text-sm align-middle rounded-md sm:bg-white sm:dark:bg-darkbg drop-shadow-sm sm:justify-start text-graytext dark:text-white focus:outline-none hover:text-redtheme dark:hover:text-redtheme"
                >
                    <BiLogIn
                        size="24"
                        className="self-center w-[36px] h-[36px] sm:w-[24px] sm:h-[24px] sm:self-start text-center"
                    />
                    <span className="hidden sm:block">Login</span>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-darkbg rounded-2xl">
                                    <Dialog.Title
                                        as="h2"
                                        className="text-xl leading-6 text-gray-900 dark:text-white"
                                    >
                                        {mode}
                                    </Dialog.Title>
                                    <button
                                        className="absolute top-6 right-6"
                                        type="button"
                                        onClick={closeModal}
                                        aria-label="Close Modal"
                                    >
                                        <IoMdClose
                                            size="24"
                                            className="hover:text-redtheme"
                                        />
                                    </button>
                                    <form
                                        className="flex flex-col gap-3 mt-6"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                            {mode === "Login" &&
                                                "Login to your Movie Finder account to favourite movies and access other features."}
                                            {mode === "Sign Up" &&
                                                "Create an account on Movie Finder to favourite movies and access many other features."}
                                        </p>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            placeholder="user@mail.com"
                                            type="email"
                                            className="px-4 py-2 rounded-md bg-lightbg dark:bg-graybg"
                                        ></input>
                                        <label htmlFor="password" className="">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            className="px-4 py-2 rounded-md bg-lightbg dark:bg-graybg"
                                        ></input>
                                        {mode === "Sign Up" && (
                                            <>
                                                <label htmlFor="confirm">
                                                    Confirm your Password
                                                </label>
                                                <input
                                                    id="confirm"
                                                    placeholder="Password"
                                                    type="password"
                                                    className="px-4 py-2 rounded-md bg-lightbg dark:bg-graybg"
                                                ></input>
                                            </>
                                        )}
                                        <div className="flex justify-between gap-4 mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-transparent border-2 rounded-md text-redtheme hover:text-white dark:text-white border-redtheme hover:bg-redtheme focus:outline-none active:bg-reddark"
                                                onClick={switchMode}
                                            >
                                                {mode === "Login"
                                                    ? "Create an Account"
                                                    : "Login to your account"}
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-redtheme focus:outline-none active:bg-reddark"
                                                aria-label="Submit"
                                            >
                                                {mode}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
