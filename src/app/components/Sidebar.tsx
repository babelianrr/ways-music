"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdOutlineLibraryMusic } from "react-icons/md";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="">
            <aside
                className={`fixed left-2 top-15 bg-gray-950 w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${sidebarOpen ? "translate-x-0" : ""} transition-transform duration-500 lg:translate-x-0`}
            >
                <div className="flex justify-between text-gray-100 items-center p-2 mb-4">
                    <h2 className="font-bold">Your Library</h2>
                    <Link href="upload">
                        <LuPlus size={20} />
                    </Link>
                </div>
                <div className="">
                    <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-800">
                        <Image
                            src="/images/cover.png"
                            alt="cover-image"
                            width={300}
                            height={300}
                            className="w-10 h-10 object-cover rounded-md"
                        />
                        <p className="hidden">
                            <Link
                                href="https://www.flaticon.com/free-icons/music"
                                title="music icons"
                            >
                                Music icons created by Freepik - Flaticon
                            </Link>
                        </p>
                        <div className="">
                            <p className="text-gray-100 font-semibold">
                                Sample Title
                            </p>
                            <p className="text-gray-200 text-sm">
                                Sample Subtitle
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            <button
                className="fixed bottom-5 left-5 bg-gray-900 w-12 h-12 lg:hidden grid place-items-center text-gray-100 rounded-full z-50 cursor-pointer"
                onClick={toggleSidebar}
            >
                <MdOutlineLibraryMusic />
            </button>
        </div>
    );
}
