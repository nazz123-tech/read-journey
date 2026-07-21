import Image from "next/image";
export const metadata = {
  title: "Вхід | Read Journey",
};

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center min-h-screen w-full bg-[#141414] p-5 md:py-[32px] gap-[20px]">
      <LoginForm />
      <div className="flex items-end justify-center bg-blocks px-[40px] pt-[20px] md:hidden xl:flex rounded-[30px] w-[335px] xl:w-[600px] xl:h-[736px]">
        <Image
          src="/images/iphone.png"
          alt="iphone"
          width={300}
          height={600}
          className="block xl:hidden"
        />
        <Image
          src="/images/iphone-dekstop.png"
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
