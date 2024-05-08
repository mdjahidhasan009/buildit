"use client"

import Header from "../../../components/shared/Header";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const router = useRouter();

    const createDesign = async () => {
        router.push('/design/create?type=create&width=600&height=450');
    }

    return (
      <Header>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <div>
          {pathname.includes('dashboard') && (
            <button
              onClick={createDesign}
              className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'
            >
              Create a Design
            </button>
          )}
        </div>
      </Header>
    );
}