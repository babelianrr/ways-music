import { FaTrash } from "react-icons/fa";
import { supabase } from "../../../lib/SupabaseClient";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteButtonProps {
    musicId: string;
    imagePath: string;
    audioPath: string;
}

export default function DeleteButton({
    musicId,
    imagePath,
    audioPath,
}: DeleteButtonProps) {
    const queryClient = useQueryClient();

    async function deleteMusic() {
        const confirm = window.confirm("Are you sure to delete the music?");

        if (!confirm) return;

        const { error: imgError } = await supabase.storage
            .from("cover-images")
            .remove([imagePath]);

        if (imgError) {
            console.log("Image deletion error:", imgError.message);
            return;
        }

        const { error: audioError } = await supabase.storage
            .from("musics")
            .remove([audioPath]);

        if (audioError) {
            console.log("Music deletion error:", audioError.message);
            return;
        }

        const { error: deleteMusicError } = await supabase
            .from("musics")
            .delete()
            .eq("id", musicId);

        if (deleteMusicError) {
            console.log("Music deletion error:", deleteMusicError.message);
            return;
        }

        queryClient.invalidateQueries({ queryKey: ["allMusics"] });
        queryClient.invalidateQueries({ queryKey: ["userMusics"] });
    }

    return (
        <button
            onClick={deleteMusic}
            className="text-gray-200 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block hover:text-red-600"
        >
            <FaTrash />
        </button>
    );
}
