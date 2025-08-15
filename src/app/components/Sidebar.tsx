"use client";
import Link from "next/link";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdOutlineLibraryMusic } from "react-icons/md";
import useUserSession from "../../../hooks/useUserSession";
import UserMusic from "./UserMusic";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { loading, session } = useUserSession();

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            {session ? (
                <div>
                    <aside
                        className={`fixed left-2 top-15 bg-gray-950 w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${sidebarOpen ? "translate-x-0" : ""} transition-transform duration-500 lg:translate-x-0`}
                    >
                        <div className="flex justify-between text-gray-100 items-center p-2 mb-4">
                            <h2 className="font-bold">{"Your Library"}</h2>
                            {!loading && (
                                <Link href="upload">
                                    <LuPlus
                                        size={20}
                                        className="hover:text-blue-400"
                                    />
                                </Link>
                            )}
                        </div>
                        <UserMusic userId={session.user.id} />
                    </aside>

                    <button
                        className="fixed bottom-5 left-5 bg-gray-900 w-12 h-12 lg:hidden grid place-items-center text-gray-100 rounded-full z-50 cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <MdOutlineLibraryMusic />
                    </button>
                </div>
            ) : (
                <div>
                    <aside
                        className={`fixed left-2 top-15 bg-gray-950 w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${sidebarOpen ? "translate-x-0" : ""} transition-transform duration-500 lg:translate-x-0`}
                    >
                        <div className="py-8 text-center">
                            <Link
                                href="/sign-in"
                                className="bg-gray-200 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
                            >
                                {"Sign in"}
                            </Link>
                            <p className="mt-4 text-white">
                                {"Sign in to view your library."}
                            </p>
                        </div>
                    </aside>

                    <button
                        className="fixed bottom-5 left-5 bg-gray-900 w-12 h-12 lg:hidden grid place-items-center text-gray-100 rounded-full z-50 cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <MdOutlineLibraryMusic />
                    </button>
                </div>
            )}
        </>
    );
}
