import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";

export default function Navbar() {
    return (
        <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-black z-100">
            <div className="flex gap-6 items-center">
                <Link
                    href="/"
                    className="bg-gray-950 w-11 h-11 grid place-items-center text-white text-3xl rounded-full"
                >
                    <Image
                        src="/images/logo-white.png"
                        alt="logo"
                        width={500}
                        height={500}
                        className="w-10 h-10"
                    />
                </Link>
                <div className="bg-gray-950 hidden lg:flex items-center h-11 w-90 px-3 gap-3 text-gray-100 rounded-full">
                    <GoSearch className="text-gray-100 shrink-0" />
                    <input
                        className="h-full w-full outline-none placeholder:text-gray-100"
                        type="text"
                        name=""
                        id=""
                        placeholder="What do you want to play?"
                    />
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-4 text-gray-200 font-bold border-r-2 border-gray-100 pr-6">
                    <a href="#" className="hover:text-gray-100">
                        Support Us
                    </a>
                    <a href="#" className="hover:text-gray-100">
                        Help
                    </a>
                    <a href="#" className="hover:text-gray-100">
                        Download
                    </a>
                </div>
                <div className="">
                    <Link
                        href="/login"
                        className="h-11 bg-gray-200 text-gray-950 rounded-full font-bold hover:bg-gray-100 grid px-8 place-items-center"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
