"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { deleteJobById, insertJob, updateJobById } from "@/utils/supabase/queries";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/dashboard/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/dashboard/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const addJobAction = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const companyName = formData.get("company_name")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();
  const jobType = formData.get("job_type")?.toString();

  if (!title || !companyName || !description || !location || !jobType) {
    return encodedRedirect("error", "/dashboard/add-job", "All fields are required");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to add a job");
  }

  const newJob = await insertJob({
    title,
    company_name: companyName,
    description,
    location,
    job_type: jobType,
    created_by: user.id,
  });

  return redirect("/dashboard");
};

export const updateJobAction = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const companyName = formData.get("company_name")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();
  const jobType = formData.get("job_type")?.toString();

  if (!id || !title || !companyName || !description || !location || !jobType) {
    return encodedRedirect("error", `/dashboard/edit-job/${id}`, "All fields are required");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to update a job");
  }

  const updated = await updateJobById(Number.parseInt(id), {
    title,
    company_name: companyName,
    description,
    location,
    job_type: jobType,
  });

  if (!updated) {
    return encodedRedirect("error", `/dashboard/edit-job/${id}`, "Failed to update job");
  }

  return redirect(`/dashboard`);
};

export const deleteJobAction = async (formData: FormData) => {
  const id = formData.get("id")?.toString();

  if (!id) {
    return encodedRedirect("error", `/dashboard/delete-job/${id}`, "All fields are required");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to update a job");
  }

  const updated = deleteJobById(Number.parseInt(id));

  if (!updated) {
    return encodedRedirect("error", `/dashboard/delete-job/${id}`, "Failed to update job");
  }

  return redirect(`/dashboard`);
};
