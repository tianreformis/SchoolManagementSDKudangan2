import { currentUser, User } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Home09Icon, UserIcon, TeacherIcon, StudentsIcon, Books01Icon, StackStarIcon, TeachingIcon, Brain02Icon, Task01Icon, CheckmarkSquare03Icon, PresentationOnlineIcon, Calendar03Icon, Mail01Icon, PromotionIcon, UserAccountIcon, Settings02Icon, LogoutSquare02Icon } from "hugeicons-react";
import { SignOutButton } from "@clerk/nextjs";



const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <Home09Icon size={24} color="#333" />,
        label: "Halaman Awal",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <TeacherIcon size={24} color="#333" />,
        label: "Daftar Guru",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <StudentsIcon size={24} color="#333" />,
        label: "Daftar Murid",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <UserIcon size={24} color="#333" />,
        label: "Orang Tua",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <Books01Icon size={24} color="#333" />,
        label: "Mata Pelajaran",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: <StackStarIcon size={24} color="#333" />,
        label: "Daftar Kelas",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <TeachingIcon size={24} color="#333" />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <Brain02Icon size={24} color="#333" />,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Task01Icon size={24} color="#333" />,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <CheckmarkSquare03Icon size={24} color="#333" />,
        label: "Nilai",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <PresentationOnlineIcon size={24} color="#333" />,
        label: "Kehadiran",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Calendar03Icon size={24} color="#333" />,
        label: "Acara",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Mail01Icon size={24} color="#333" />,
        label: "Pesan",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <PromotionIcon size={24} color="#333" />,
        label: "Pengumuman",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <UserAccountIcon size={24} color="#333" />,
        label: "Profil",
        href: "/list/user-profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Settings02Icon size={24} color="#333" />,
        label: "Pengaturan",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },

    ],
  },
];

const Menu = async () => {

  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  const [, pathname] = fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];

  console.log(pathname);



  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden md:hidden xl:block  text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`
                    flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight
                  ${pathname === item.href
                      ? "font-bold bg-lamaSkyLight"
                      : ""}
                    `}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}

        </div>
      ))}

      <SignOutButton redirectUrl="/">
        <div className="flex flex-col gap-2">
        <button className=" flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight       ">
          <LogoutSquare02Icon size={24} color="#333" />
          <span className="hidden lg:block">Keluar</span>
        </button>
        </div>
        
      </SignOutButton>
    </div>
  );
};

export default Menu;