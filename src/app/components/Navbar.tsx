import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import useUserSession from "../../../hooks/useUserSession";
import signOutUser from "../../../lib/auth/signOutUser";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { session, loading } = useUserSession();

    const handleSignOut = async () => {
        const result = await signOutUser();

        if (!result?.error) {
            router.push("/");
        }
    };

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
                <p className="hidden">
                    <Link
                        href="https://www.flaticon.com/free-icons/voice-message-app"
                        title="voice message app icons"
                    >
                        Voice message app icons created by Flipicon - Flaticon
                    </Link>
                </p>
                <div className="bg-gray-950 hidden lg:flex items-center h-11 w-90 px-3 gap-3 text-gray-100 rounded-full">
                    <GoSearch className="text-gray-100 shrink-0" size={20} />
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
                <div className="hidden md:flex gap-4 text-gray-100 font-bold border-r-2 border-gray-100 pr-6">
                    <a href="#" className="hover:text-blue-400">
                        {"Support Us"}
                    </a>
                    <a href="#" className="hover:text-blue-400">
                        {"Help"}
                    </a>
                    <a href="#" className="hover:text-blue-400">
                        {"Download"}
                    </a>
                </div>
                <div>
                    {!loading && (
                        <>
                            {session ? (
                                <button
                                    onClick={handleSignOut}
                                    className="cursor-pointer h-11 bg-gray-100 text-gray-950 rounded-full font-bold hover:bg-blue-400 grid px-8 place-items-center"
                                >
                                    {"Sign out"}
                                </button>
                            ) : (
                                <Link
                                    href="sign-in"
                                    className="cursor-pointer h-11 bg-gray-100 text-gray-950 rounded-full font-bold hover:bg-blue-400 grid px-8 place-items-center"
                                >
                                    {"Sign in"}
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
