import Image from "next/image";
import { RegisterForm } from "@/components/forms/RegisterForm";
export const metadata = {
  title: "Реєстрація | Read Journey",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-[10px]">
      <RegisterForm />
      <div className="flex items-center justify-center bg-blocks px-[20px] pt-[20px] rounded-[30px] w-[335px]">
        <Image
          src="/iphone.png"
          alt="iphone"
          width={300}
          height={600}
          className=""
        />
      </div>
    </div>
  );
}
