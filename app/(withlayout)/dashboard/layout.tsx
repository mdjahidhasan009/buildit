"use client";

import { FaHome, FaFileCode } from 'react-icons/fa'
import { BsFolder, BsGrid1X2, BsFillDiagram3Fill } from 'react-icons/bs'
import {cn} from "@/lib/cn";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode; // Use React.ReactNode for typing 'children'
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts
  //Navigating across multiple root layouts will cause a full page load (as opposed to a client-side navigation). For example, navigating from /cart that uses app/(shop)/layout.js to /blog that uses app/(marketing)/layout.js will cause a full page load. This only applies to multiple root layouts.
  const SidebarLink = ({ href, icon, text }: { href: string; icon: JSX.Element; text: string }) => {
    const pathname = usePathname();

    const linkClass = cn(
      "text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 rounded-[4px]",
      { 'bg-[#ffffff26]': pathname === href }
    );

    return (
      <li>
        <Link href={href} prefetch={true}>
          <div className={linkClass}>
            <span className='text-xl'>{icon}</span>
            <span className='font-medium'>{text}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className='bg-[#18191b] min-h-screen w-full'>
      <div className='w-full flex mt-16'>
        <div className='sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed'>
          <ul className='px-4 flex flex-col gap-2'>
            <SidebarLink href="/" icon={<FaHome/>} text="Home"/>
            <SidebarLink href="/projects" icon={<BsFolder/>} text="Projects"/>
            <SidebarLink href="/templates" icon={<BsGrid1X2/>} text="Templates"/>
            <SidebarLink href="/snippet" icon={<FaFileCode/>} text="Codes"/>
            <SidebarLink href="/diagram" icon={<BsFillDiagram3Fill/>} text="Diagrams"/>
          </ul>
        </div>
        <div className='ml-[300px] w-[calc(100%-300px)]'>
          <div className='py-4 pr-4'>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout