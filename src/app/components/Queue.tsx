import Image from "next/image";
import { useContext } from "react";
import { PlayerContext } from "../../../layouts/FrontendLayout";

export default function Queue() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context must be within a provider.");
    }

    const { queueModal } = context;

    if (!queueModal) return;

    const nowPlaying = [
        {
            id: 1,
            title: "This World",
            artist: "True Hertz",
        },
    ];

    const queue = [
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
        <div className="fixed top-35 right-10 z-50 max-w-[300px] w-full h-[75vh] bg-black border-1 p-4 overflow-y-auto rounded-md">
            <h2>{"Queue"}</h2>
            <div className="mt-8">
                <h2 className="text-gray-100 font-bold mb-3">
                    {"Now Playing"}
                </h2>
                {nowPlaying.map((v, k) => {
                    return (
                        <div
                            className="flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-900"
                            key={k}
                        >
                            <Image
                                alt={`now-playing-${v.id}`}
                                className="w-10 h-10 object-cover rounded-md"
                                height={300}
                                src="/images/cover.png"
                                width={300}
                            />
                            <div className="">
                                <p className="text-red-600 font-semibold">
                                    {v.title}
                                </p>
                                <p className="text-sm text-gray-200">
                                    {v.artist}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-8">
                <h2 className="text-gray-100 font-bold mb-3">{"Queue List"}</h2>
                {queue.map((v, k) => {
                    return (
                        <div
                            className="flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-900"
                            key={k}
                        >
                            <Image
                                alt={`now-playing-${v.id}`}
                                className="w-10 h-10 object-cover rounded-md"
                                height={300}
                                src="/images/cover.png"
                                width={300}
                            />
                            <div className="">
                                <p className="text-gray-100 font-semibold">
                                    {v.title}
                                </p>
                                <p className="text-sm text-gray-200">
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
