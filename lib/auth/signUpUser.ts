import { supabase } from "../SupabaseClient";

const signUpUser = async (name: string, email: string, password: string) => {
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (error) {
            console.log("Sign Up error", error);
            return { error: error.message };
        }
    } catch (err) {
        console.log("An unknown error occurred", err);
        return { error: "Something went wrong" };
    }
};

export default signUpUser;
