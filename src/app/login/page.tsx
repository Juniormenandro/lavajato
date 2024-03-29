"use client";
import React from "react";
import Button from "@/components/form/Button/Button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextInput from "@/components/form/TextInput/TextInput";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    surname: string;
  };
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },   
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData: LoginResponse = await response.json();

      localStorage.setItem("token", responseData.token);

      toast.success(`Welcome ${responseData.user.name}`);
  
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error(`An error occured`);
      console.error("An error occurred:", error);
    }
  };  

  return (
    
    <>
    <p className="mt-4 text-center">
      <Link href="/" className="bg-blue-500 p-2 rounded-2xl text-white hover:text-blue-700">
        RETURN TO BEGINNING
      </Link>
    </p>
    <main className="flex flex-col items-center min-h-screen p-10">
      <div className="w-full max-w-lg">
        <h2 className="mb-5 text-3xl text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            id="email"
            error={errors.email?.message}
            register={register}
            type="email"
          />

          <TextInput
            label="Password"
            id="password"
            error={errors.password?.message}
            register={register}
            type="password"
          />
         
          <Button isLoading={isSubmitting} type="submit" className="mt-3">
            Sign In
          </Button>
        </form>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </main>
</>
  );
};

export default SignIn; 