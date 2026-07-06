import { Header } from "@/components/shared/Header";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#141414]">
        <div className="container w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
