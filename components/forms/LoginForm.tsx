"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/services/store/authStore";
import { loginUser } from "@/services/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as yup from "yup";
import { Input } from "../shared/Input";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Невалідний email")
    .required("Email обовʼязковий")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
  password: yup
    .string()
    .min(7, "Мінімум 7 символів")
    .required("Пароль обовʼязковий"),
});

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();

  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await loginUser(data);
    setAuth(res);
    router.push("/recommended");
  };

  return (
    <div className="flex flex-col bg-blocks rounded-[30px] w-[335px] h-[411px] p-[20px]">
      <Image
        src="/images/logo-mobile.png"
        alt="logo"
        width={50}
        height={20}
        className="mb-[40px]"
      ></Image>
      <h2 className="font-title text-[32px] mb-[20px] leading-none tracking-wide">
        Expand your mind, reading{" "}
        <span className="text-[rgba(227,227,227,0.5)]"> a book</span>
      </h2>
      <form
        className="flex flex-col gap-[8px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email")}
          label="Mail:"
          placeholder="Your@email.com"
          status="basic"
        ></Input>
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          {...register("password")}
          label="Password:"
          status="password"
          placeholder="Yourpasswordhere"
        ></Input>
        {errors.password && <p>{errors.password.message}</p>}

        {errors.root && <p>{errors.root.message}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
