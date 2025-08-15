"use client";
import Image from "next/image";
import { IoMdPlay } from "react-icons/io";
import { supabase } from "../../../lib/SupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Music } from "../../../types/musics";
import { useContext } from "react";
import { PlayerContext } from "../../../layouts/FrontendLayout";

export default function MusicList() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context must be within a provider.");
    }

    const { setQueue, setCurrentIndex } = context;

    const getAllMusics = async () => {
        const { data, error } = await supabase.from("musics").select("*");

        if (error) {
            console.log("Fetch all music error:", error);
        }

        return data;
    };

    const {
        data: musics,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryFn: getAllMusics,
        queryKey: ["allMusics"],
    });

    function startPlayingMusic(musics: Music[], index: number) {
        setCurrentIndex(index);
        setQueue(musics);
    }

    return (
        <div className="min-h-[90vh] bg-gray-950 my-15 p-4 lg:ml-80 rounded-lg mx-4">
            <h2 className="text-2xl text-white mb-3 font-semibold">
                {"Discover Music"}
            </h2>
            {isError && <h2>{error.message}</h2>}
            {isLoading && (
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-pulse mb-4">
                    <div className="">
                        <div className="w-full h-100 rounded-md mb-2 bg-gray-700"></div>
                        <div className="h-3 w-[80%] bg-gray-700 rounded-md"></div>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {musics?.map((music: Music, index: number) => {
                        return (
                            <div
                                className="relative bg-gray-950 p-3 cursor-pointer rounded-md hover:bg-gray-900 group"
                                key={music.id}
                                onClick={() => startPlayingMusic(musics, index)}
                            >
                                <button className="bg-gray-200 w-12 h-12 rounded-full grid place-items-center absolute bottom-8 opacity-0 right-5 group-hover:opacity-100 group-hover:bottom-18 transition-all duration-300 ease-in-out hover:bg-blue-400 cursor-pointer">
                                    <IoMdPlay />
                                </button>
                                <Image
                                    src={music.cover_image_url}
                                    alt="cover"
                                    width={500}
                                    height={500}
                                    className="w-full object-cover rounded-md shrink-0"
                                />
                                <div className="mt-2">
                                    <p className="text-gray-100 font-semibold">
                                        {music.title}
                                    </p>
                                    <p className="text-gray-200 text-sm">
                                        {music.artist}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
