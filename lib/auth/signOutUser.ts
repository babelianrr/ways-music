import { supabase } from "../SupabaseClient";

const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("Sign Out error", error);
        return { error: error.message };
    }
};

export default signOutUser;
