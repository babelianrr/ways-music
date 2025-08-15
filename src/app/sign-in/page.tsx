"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import signInUser from "../../../lib/auth/signInUser";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/SupabaseClient";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingSession, setLoadingSession] = useState(true);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please fill required fields.");
            return;
        }

        const result = await signInUser(email, password);

        if (result?.error) {
            setErrorMessage(result.error);
        } else {
            setMessage("Sign in successful.");
            setMessage("");
            setErrorMessage("");
            setLoading(false);
            router.push("/");
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
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
                    {"Sign in to WaysMusic"}
                </h2>
                <form onSubmit={handleSignIn}>
                    {message && (
                        <p className="bg-green-500 font-semibold text-center mb-4 py-1">
                            {message}
                        </p>
                    )}
                    {errorMessage && (
                        <p className="bg-red-500 font-semibold text-center mb-4 py-1">
                            {errorMessage}
                        </p>
                    )}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Your email*"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your password*"
                        className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-gray-200 placeholder-neutral-600 mb-6 focus:text-gray-100"
                    />
                    <button
                        className="bg-gray-100 py-3 rounded-full w-full font-bold cursor-pointer hover:bg-white"
                        type="submit"
                    >
                        Sign in
                    </button>
                    <div className="text-gray-200 text-center my-6">
                        <span>Don&apos;t have an account?</span>
                        <Link
                            className="ml-2 text-gray-100 underline hover:text-white"
                            href="sign-up"
                        >
                            Sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
