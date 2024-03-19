"use client";
import React from "react";
import Button from "@/components/form/Button/Button";
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      await response.json();

      toast.success("Successfully registered!");
      router.push("/login");
    } catch (error) {
      toast.error(`An error occured`);
      console.log(error);
    }
  };



  return (
    <main className=" bg-white p-8  mx-8 flex flex-col items-center rounded-lg ">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            id="name"
            error={errors.name?.message}
            register={register}
          />

          <TextInput
            label="Surname"
            id="surname"
            error={errors.surname?.message}
            register={register}
          />

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
          <div className="py-6">
          <Button isLoading={isSubmitting} type="submit" className="mt-3 -z-1 ">
            Sign Up
          </Button>
          </div>
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
  );
};


export default SignUp;