"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/services/store/authStore";
import { loginUser } from "@/services/api/clientApi";
import { useRouter } from "next/navigation";
import * as yup from "yup";

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
  const [isVisible, setIsVisible] = useState(false);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} placeholder="Email"></input>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("password")}
            type={isVisible ? "text" : "password"}
            placeholder="Password"
          ></input>
          {errors.password && <p>{errors.password.message}</p>}
          <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
            {!isVisible ? (
              <img src={"/eye-off.png"} />
            ) : (
              <img src={"/eye.png"} />
            )}
          </button>

          {errors.root && <p>{errors.root.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
