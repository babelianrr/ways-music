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
                    Upload to WaysMusic
                </h2>
                <form>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <input
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <label
                        id="audio"
                        htmlFor="audio"
                        className="block text-gray-200"
                    >
                        Audio
                    </label>
                    <input
                        type="file"
                        name="file"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <label
                        id="cover"
                        htmlFor="cover"
                        className="block text-gray-200"
                    >
                        Cover Image
                    </label>
                    <input
                        type="file"
                        name="file"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <button
                        className="bg-gray-100 py-3 rounded-full w-full font-bold cursor-pointer hover:bg-white"
                        type="submit"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}
