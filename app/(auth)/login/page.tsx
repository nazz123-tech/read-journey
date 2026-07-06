import Image from "next/image";
export const metadata = {
  title: "Вхід | Read Journey",
};

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#141414] p-5 md:py-[32px] gap-[20px]">
      <LoginForm />
      <div className="flex items-center justify-center bg-blocks rounded-[30px] max-w-[375px] md:max-w-[704px] px-5 pt-[20px] md:py-[32px] overflow-hidden">
        <Image
          src="/iphone.png"
          alt="iphone"
          width={300}
          height={600}
          className="h-auto max-w-[300px] md:max-w-[704px] object-contain"
          priority
        />
      </div>
    </div>
  );
}
