"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/services/store/authStore";
import { registerUser } from "@/services/api/clientApi";
import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().min(2, "Мінімум 2 символи").required("Імʼя обовʼязкове"),
  email: yup.string().email("Невалідний email").required("Email обовʼязковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обовʼязковий"),
});

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormProps {
  onDone: () => void;
}
export const RegisterForm = ({ onDone }: RegisterFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await registerUser(data);
    setAuth(res);
    onDone();
  };

  return (
    <div>
      <form>
        <div>
          <input {...register("name")} placeholder="Name"></input>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder="Email"></input>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("password")} placeholder="Password"></input>
          {errors.password && <p>{errors.password.message}</p>}
          <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
            {!isVisible ? (
              <img src={"/eye-off/png"} />
            ) : (
              <img src={"/eye.png"} />
            )}
          </button>

          {errors.root && <p className={css.error}>{errors.root.message}</p>}
        </div>
        <button onClick={() => onSubmit}></button>
      </form>
    </div>
  );
};
