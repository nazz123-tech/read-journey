import type { Metadata } from "next";
export const metadata = {
  title: "Реєстрація | Read Journey",
};

import { RegisterForm } from "@/components/forms/RegisterForm";
export default function RegisterPage() {
  return <RegisterForm />;
}
