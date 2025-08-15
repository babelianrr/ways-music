"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/SupabaseClient";
import { useRouter } from "next/navigation";
import useUserSession from "../../../hooks/useUserSession";

export default function Page() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingSession, setLoadingSession] = useState(true);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const { session } = useUserSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "artist") {
            setArtist(e.target.value);
        } else if (e.target.name === "audio") {
            const files = e.target.files;

            if (!files) return;

            const file = files[0];
            setAudioFile(file);
        } else if (e.target.name === "cover") {
            const files = e.target.files;

            if (!files) return;

            const file = files[0];
            setImageFile(file);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const errMsgs: string[] = [];

        if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
            errMsgs.push("Please fill required fields.");
            setLoading(false);
            return;
        }

        try {
            if (!session) return;
            const timestamp = Date.now();

            const imagePath = `/${timestamp}_${imageFile.name}`;
            const { error: imgError } = await supabase.storage
                .from("cover-images")
                .upload(imagePath, imageFile);

            if (imgError) {
                errMsgs.push(imgError.message);
                setErrorMessage(errMsgs);
                setLoading(false);
                return;
            }

            const {
                data: { publicUrl: imageUrl },
            } = supabase.storage.from("cover-images").getPublicUrl(imagePath);

            const audioPath = `/${timestamp}_${audioFile.name}`;

            const { error: audioError } = await supabase.storage
                .from("musics")
                .upload(audioPath, audioFile);

            if (audioError) {
                errMsgs.push(audioError.message);
                setErrorMessage(errMsgs);
                setLoading(false);
                return;
            }

            const {
                data: { publicUrl: audioUrl },
            } = supabase.storage.from("musics").getPublicUrl(audioPath);

            const { error: insertError } = await supabase
                .from("musics")
                .insert({
                    title,
                    artist,
                    cover_image_url: imageUrl,
                    audio_url: audioUrl,
                    user_id: session.user.id,
                });

            if (insertError) {
                errMsgs.push(insertError.message);
                setErrorMessage(errMsgs);
                setLoading(false);
                return;
            }

            setTitle("");
            setArtist("");
            setAudioFile(null);
            setImageFile(null);
            setMessage("Song uploaded successfully.");
            setErrorMessage([]);
            router.push("/");
        } catch (err) {
            console.log("Upload error", err);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.push("/");
            } else {
                setLoadingSession(false);
            }
        });
    }, [router]);

    if (loadingSession) return null;

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
                    {"Upload to WaysMusic"}
                </h2>
                <form onSubmit={handleUpload}>
                    {message && (
                        <p className="bg-green-500 font-semibold text-center mb-4 py-1">
                            {message}
                        </p>
                    )}
                    {errorMessage.length > 0 &&
                        errorMessage.map((v, k) => {
                            return (
                                <p
                                    className="bg-red-500 font-semibold text-center mb-4 py-1"
                                    key={k}
                                >
                                    {v}
                                </p>
                            );
                        })}
                    <input
                        value={title}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="title"
                        placeholder="Title*"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                        disabled={loading}
                    />
                    <input
                        value={artist}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="artist"
                        placeholder="Artist*"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                        disabled={loading}
                    />
                    <label
                        id="audio"
                        htmlFor="audio"
                        className="block text-gray-200"
                    >
                        {"Audio*"}
                    </label>
                    <input
                        accept="audio/*"
                        type="file"
                        name="audio"
                        onChange={(e) => handleChange(e)}
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100 cursor-pointer"
                        disabled={loading}
                    />
                    <label
                        id="cover"
                        htmlFor="cover"
                        className="block text-gray-200"
                    >
                        {"Cover Image*"}
                    </label>
                    <input
                        accept="images/*"
                        type="file"
                        name="cover"
                        onChange={(e) => handleChange(e)}
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100 cursor-pointer"
                        disabled={loading}
                    />
                    <button
                        className="bg-gray-100 py-3 rounded-full w-full font-bold cursor-pointer hover:bg-white"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
}
