import Image from "next/image";
import { useContext } from "react";
import { PlayerContext } from "../../../layouts/FrontendLayout";
import { Music } from "../../../types/musics";

export default function Queue() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context must be within a provider.");
    }

    const {
        queueModal,
        currentMusic,
        currentIndex,
        setCurrentIndex,
        queue,
        setQueue,
    } = context;

    if (!queueModal) return;

    function startPlayingMusic(musics: Music[], index: number) {
        setCurrentIndex(index);
        setQueue(musics);
    }

    return (
        <div className="fixed top-35 right-10 z-50 max-w-[300px] w-full h-[75vh] bg-black border-1 p-4 overflow-y-auto rounded-md">
            {currentMusic ? (
                <div className="mt-2">
                    <h2 className="text-gray-100 font-bold mb-3">
                        {"Now Playing"}
                    </h2>
                    <div className="flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-900">
                        <Image
                            src={currentMusic.cover_image_url}
                            alt="now-playing"
                            className="w-10 h-10 object-cover rounded-md"
                            height={300}
                            width={300}
                        />
                        <div>
                            <p className="text-blue-400 font-semibold">
                                {currentMusic.title}
                            </p>
                            <p className="text-sm text-gray-200">
                                {currentMusic.artist}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="mt-8">
                <h2 className="text-gray-100 font-bold mb-3">{"Queue List"}</h2>
                {queue.map((music: Music, index: number) => {
                    return (
                        <div
                            className="flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-900"
                            key={music.id}
                            onClick={() => startPlayingMusic(queue, index)}
                        >
                            <Image
                                alt={`now-playing-${index}`}
                                className="w-10 h-10 object-cover rounded-md"
                                height={300}
                                src={music.cover_image_url}
                                width={300}
                            />
                            <div>
                                <p
                                    className={`${currentIndex === index ? "text-blue-400" : "text-gray-100"} font-semibold`}
                                >
                                    {music.title}
                                </p>
                                <p
                                    className={`${currentIndex === index ? "text-blue-300" : "text-gray-200"} text-sm`}
                                >
                                    {music.artist}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
