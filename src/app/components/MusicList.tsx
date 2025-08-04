import Image from "next/image";

export default function MusicList() {
    return (
        <div className="min-h-[90vh] bg-gray-950 my-15 p-4 lg:ml-80 rounded-lg mx-4">
            <h2 className="text-2xl text-white mb-3 font-semibold">
                Discover Music
            </h2>
            <div className="grid gap-2 grod-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="bg-gray-950 p-3 cursor-pointer rounded-md hover:bg-gray-900">
                    <Image
                        src="/images/cover.png"
                        alt="cover"
                        width={500}
                        height={500}
                        className="w-full object-cover rounded-md shrink-0"
                    />
                    <div className="mt-2">
                        <p className="text-gray-100 font-semibold">
                            Sample Title
                        </p>
                        <p className="text-gray-200 text-sm">Sample Subtitle</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
