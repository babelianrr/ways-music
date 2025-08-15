import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../lib/SupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Music } from "../../../types/musics";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { PlayerContext } from "../../../layouts/FrontendLayout";

interface UserMusicProps {
    userId: string | undefined;
}

export default function UserMusic({ userId }: UserMusicProps) {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context must be within a provider.");
    }

    const { setQueue, setCurrentIndex } = context;

    async function getUserMusics() {
        const { data, error } = await supabase
            .from("musics")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            console.log("Fetch music by user error:", error);
        }

        return data;
    }

    const {
        data: musics,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryFn: getUserMusics,
        queryKey: ["userMusics"],
    });

    function startPlayingMusic(musics: Music[], index: number) {
        setCurrentIndex(index);
        setQueue(musics);
    }

    return (
        <div>
            {musics?.length === 0 && <h2 className="text-center text-gray-100 text-md">{"No musics in your library."}</h2> }
            {isError && <h2>{error.message}</h2>}
            {isLoading && (
                <div className="flex gap-2 animate-pulse mb-4">
                    <div className="w-10 h-10 rounded-md bg-gray-700"></div>
                    <div className="h-5 w-[80%] rounded-md bg-gray-700"></div>
                </div>
            )}
            {!isLoading &&
                musics?.map((music: Music, index: number) => {
                    return (
                        <div
                            className="flex relative gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-800 group"
                            key={music.id}
                            onClick={() => startPlayingMusic(musics, index)}
                        >
                            <DeleteButton
                                musicId={music.id}
                                imagePath={music.cover_image_url}
                                audioPath={music.audio_url}
                            />
                            <Image
                                src={music.cover_image_url}
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
                                    {
                                        "Music icons created by Freepik - Flaticon"
                                    }
                                </Link>
                            </p>
                            <div className="">
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
    );
}
