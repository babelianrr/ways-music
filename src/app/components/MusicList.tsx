import Image from "next/image";
import { IoMdPlay } from "react-icons/io";

export default function MusicList() {
    const music = [
        {
            id: 1,
            title: "This World",
            artist: "True Hertz",
        },
        {
            id: 2,
            title: "Applause",
            artist: "True Hertz",
        },
    ];

    return (
        <div className="min-h-[90vh] bg-gray-950 my-15 p-4 lg:ml-80 rounded-lg mx-4">
            <h2 className="text-2xl text-white mb-3 font-semibold">
                Discover Music
            </h2>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {music.map((v, k) => {
                    return (
                        <div
                            className="relative bg-gray-950 p-3 cursor-pointer rounded-md hover:bg-gray-900 group"
                            key={k}
                        >
                            <button className="bg-white w-12 h-12 rounded-full grid place-items-center absolute bottom-8 opacity-0 right-5 group-hover:opacity-100 group-hover:bottom-18 transition-all duration-300 ease-in-out cursor-pointer">
                                <IoMdPlay />
                            </button>
                            <Image
                                src="/images/cover.png"
                                alt="cover"
                                width={500}
                                height={500}
                                className="w-full object-cover rounded-md shrink-0"
                            />
                            <div className="mt-2">
                                <p className="text-gray-100 font-semibold">
                                    {v.title}
                                </p>
                                <p className="text-gray-200 text-sm">
                                    {v.artist}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
