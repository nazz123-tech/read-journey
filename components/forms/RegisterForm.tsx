"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/services/store/authStore";
import { registerUser } from "@/services/api/clientApi";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Input } from "../shared/Input";
import Image from "next/image";
import Link from "next/link";

export const registerSchema = yup.object({
  name: yup.string().min(2, "Мінімум 2 символи").required("Імʼя обовʼязкове"),
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

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await registerUser(data);
    setAuth(res);
    router.push("/recommended");
  };

  return (
    <div className="flex flex-col bg-blocks rounded-[30px] w-[335px] px-[20px] pt-[20px] pb-[40px]">
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
        <div>
          <Input
            {...register("name")}
            label="Name:"
            placeholder="Ilona Vasykina"
            status="basic"
            error={errors.name?.message}
            success={!!touchedFields.name && !!watch("name") && !errors.name}
          ></Input>
          {errors.name && (
            <p className="text-[10px] font-medium leading-[12px] tracking-tight pt-0 text-destructured pl-[14px]">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("email")}
            label="Mail:"
            placeholder="Your@email.com"
            error={errors.email?.message}
            success={!!touchedFields.email && !!watch("email") && !errors.email}
            status="basic"
          ></Input>
          {errors.email && (
            <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured pl-[14px]">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("password")}
            label="Password:"
            error={errors.password?.message}
            success={
              !!touchedFields.password &&
              !!watch("password") &&
              !errors.password
            }
            status="password"
            placeholder="Yourpasswordhere"
          ></Input>
          {errors.password && (
            <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured pl-[14px]">
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured pl-[14px]">
            {errors.root.message}
          </p>
        )}
        <div className="flex flex-row items-center gap-[14px] mtv-[20px]">
          <button
            className="white-button font-main font-bold py-3 px-11 hover:bg-inputs hover:text-foreground border hover:border-zinc-50/20"
            type="submit"
          >
            Registration
          </button>
          <Link
            className="text-xs font-medium leading-[14px] text-inactive tracking-tight underline hover:text-foreground"
            href="/login"
          >
            Have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};
