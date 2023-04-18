"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { LoginModalContext } from "./modalprovider";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginModal() {
    const [mode, setMode] = useState("Login");

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Context for if the modal should be open or closed
    const { show, openModal, closeModal } = useContext(LoginModalContext);

    function switchMode() {
        if (mode === "Login") {
            reset();
            setMode("Sign Up");
        } else {
            reset();
            setMode("Login");
        }
    }

    function handleLogin(data: FieldValues) {
        // pass in username, password into next-auth authenticator
        signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        }).then((callback) => {
            // successful authentication
            if (callback?.ok) {
                router.refresh();
                reset();
                toast.success("Logged in", {
                    id: "login",
                });
                exitModal();
            }
            if (callback?.error) {
                toast.error("Invalid Credentials", {
                    id: "loginerror",
                });
            }
        });
    }

    function handleSignup(data: FieldValues) {
        axios
            .post("/api/register", data)
            .then((response) => {
                toast.success("Successfully created account", {
                    id: "signup",
                });
                setMode("Login");
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    id: "signuperror",
                });
            });
        reset();
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (mode === "Login") {
            handleLogin(data);
        } else {
            handleSignup(data);
        }
    };

    function exitModal() {
        setMode("Login");
        reset();
        closeModal();
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
            {/* <Toaster /> */}
            <Transition appear show={show} as={Fragment}>
                {/* <Transition appear show={isOpen} as={Fragment}> */}
                <Dialog as="div" className="relative z-10" onClose={exitModal}>
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
                                        onClick={exitModal}
                                        aria-label="Close Modal"
                                    >
                                        <IoMdClose
                                            size="24"
                                            className="hover:text-redtheme"
                                        />
                                    </button>
                                    <form
                                        className="flex flex-col gap-3 mt-6"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                                            {mode === "Login" &&
                                                "Login to your Movie Finder account to favourite movies and access other features."}
                                            {mode === "Sign Up" &&
                                                "Create an account on Movie Finder to favourite movies and access many other features."}
                                        </p>
                                        <label htmlFor="email">Username</label>
                                        <input
                                            id="username"
                                            placeholder="Username"
                                            type="text"
                                            className="px-4 py-2 rounded-md bg-lightbg dark:bg-graybg"
                                            required
                                            {...register("username", {
                                                pattern: /^[A-Za-z0-9]*$/,
                                            })}
                                        ></input>
                                        {/* errors will return when field validation fails  */}
                                        {errors.username && (
                                            <span className="text-redtheme">
                                                Username must only contain
                                                letters and/or numbers.
                                            </span>
                                        )}
                                        <label htmlFor="password" className="">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            className="px-4 py-2 rounded-md bg-lightbg dark:bg-graybg"
                                            minLength={5}
                                            required
                                            {...register("password")}
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
                                                    minLength={5}
                                                    required
                                                    {...register(
                                                        "confirmPassword",
                                                        {
                                                            validate: (
                                                                value,
                                                                formValues
                                                            ) =>
                                                                value ===
                                                                formValues.password,
                                                        }
                                                    )}
                                                ></input>
                                                {/* errors will return when field validation fails  */}
                                                {errors.confirmPassword && (
                                                    <span className="text-redtheme">
                                                        Passwords don&apos;t
                                                        match
                                                    </span>
                                                )}
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
