import { supabase } from "../SupabaseClient";

const signInUser = async (email: string, password: string) => {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log("Sign In error", error);
            return { error: error.message };
        }
    } catch (err) {
        console.log("An unknown error occurred", err);
        return { error: "Something went wrong" };
    }
};

export default signInUser;
