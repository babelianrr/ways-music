import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen flex justify-center items-center w-full bg-gray-950">
            <div className="bg-gray-900 flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={500}
                        height={500}
                        className="h-15 w-15"
                    />
                </Link>
                <h2 className="text-2xl font-bold text-gray-100 my-2 mb-8 text-center">
                    Log in to WaysMusic
                </h2>
                <form>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Your email"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your password"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <button
                        className="bg-gray-100 py-3 rounded-full w-full font-bold cursor-pointer hover:bg-white"
                        type="submit"
                    >
                        Log in
                    </button>
                    <div className="text-gray-200 text-center my-6">
                        <span>Don&apos;t have an account?</span>
                        <Link
                            className="ml-2 text-gray-100 underline hover:text-white"
                            href="register"
                        >
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
