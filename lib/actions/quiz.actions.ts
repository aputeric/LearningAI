'use server';

import { createSupabaseClient } from "@/lib/supabase";


//create quiz
export const createQuiz = async (
  difficulty: string,
  topic: string,
  subject: string,
  questions: string[],
  userid: string,
) => {  

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("quiz")
    .insert([
      {
        difficulty,
        topic,
        subject,
        userid,
        questions, // Make sure this is a `json` column in Supabase
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data?.[0];
};


// GET ALL QUIZZES BY USER
export const getAllQuizzes = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// GET A SINGLE QUIZ BY ID
export const getQuiz = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
