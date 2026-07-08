import Image from "next/image";
import { RegisterForm } from "@/components/forms/RegisterForm";
export const metadata = {
  title: "Реєстрація | Read Journey",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col xl:flex-row  items-center justify-center min-h-screen w-full bg-[#141414] p-5 md:py-[32px] gap-[20px]">
      <RegisterForm />
      <div className="md:hidden xl:flex flex items-end justify-center bg-blocks px-[40px] pt-[20px] rounded-[30px] w-[335px] xl:w-[600px] xl:h-[736px]">
        <Image
          src="/iphone.png"
          alt="iphone"
          width={300}
          height={600}
          className="block xl:hidden"
        />
        <Image
          src="/iphone-dekstop.png"
          alt="iphone"
          width={405}
          height={600}
          className="hidden xl:block"
          priority
        />
      </div>
    </div>
  );
}
