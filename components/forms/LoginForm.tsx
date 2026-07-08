"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/services/store/authStore";
import { loginUser } from "@/services/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as yup from "yup";
import { Input } from "../shared/Input";
import Link from "next/link";
import { toast } from "react-toastify";

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
    setError,
    formState: { errors, touchedFields },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      setAuth(res);
      router.push("/recommended");
    } catch (error) {
      const err = error as Error & {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        err.response?.data?.message ||
        "Користувача не знайдено або пароль невірний";

      setError("root.serverError", {
        type: "manual",
        message: errorMessage,
      });
      toast.warn(`${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col bg-blocks rounded-[30px] w-full max-w-[335px] md:max-w-[704px] xl:max-w-[600px] px-[20px] pt-[20px] pb-[40px] md:px-[64px] md:pt-[40.5px] md:h-[960px] xl:h-[736px]">
      <Image
        src="/images/logo-mobile.png"
        alt="logo"
        width={50}
        height={20}
        className="mb-[40px] md:mb-[157px] xl:mb-[107px]"
      ></Image>
      <h2 className="font-title font-extrabold text-[32px] md:text-[64px] mb-[20px] md:mb-[40px] leading-none tracking-wide">
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
          error={errors.email?.message}
          success={!!touchedFields.email && !!watch("email") && !errors.email}
        ></Input>
        {errors.email && (
          <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured pl-[14px]">
            {errors.email.message}
          </p>
        )}
        <Input
          {...register("password")}
          label="Password:"
          status="password"
          placeholder="Yourpasswordhere"
          error={errors.password?.message}
          success={
            !!touchedFields.password && !!watch("password") && !errors.password
          }
        ></Input>
        {errors.password && (
          <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured pl-[14px]">
            {errors.password.message}
          </p>
        )}

        {errors.root && (
          <p className="text-[10px] font-medium leading-[12px] tracking-tight text-destructured  pl-[14px]">
            {errors.root.message}
          </p>
        )}
        <div className="flex flex-row items-center gap-[14px] mt-[72px] md:mt-[146hpx]">
          <button
            className="white-button font-main font-bold hover:bg-inputs hover:text-foreground border hover:border-zinc-50/20 py-3 px-11"
            type="submit"
          >
            Log in
          </button>
          <Link
            className="text-xs font-medium leading-[14px] text-inactive tracking-tight underline hover:text-foreground"
            href="/register"
          >
            Dont have an account?h
          </Link>
        </div>
      </form>
    </div>
  );
};
