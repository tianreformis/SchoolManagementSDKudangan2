import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">

      <div className="w-[14%] md:w-[8%] xl:w-[14%] p-4">
        <Link href='/' className="flex items-center justify-center lg:justify-start gap-2">
          <Image src="/logo.png" width={30} height={30} alt="logo" />
          <span className="hidden lg:block">Kudangan 2 School</span>
        </Link>
        <Menu />
      </div>

      <div className="w-[86%] md:w-[92%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll">
        <Navbar />
        {children}
      </div>

    </div>

  );
}
