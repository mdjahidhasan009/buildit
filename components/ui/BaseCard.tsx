import Link from "next/link";
import Image from 'next/image';
import React, { FC, ReactNode } from "react";

interface BaseCardProps {
  imageUrl: string;
  link?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const BaseCard: FC<BaseCardProps> = ({ imageUrl, link, onClick, children }) => {
  const content = (
    <div className={`h-[200px] w-full`} onClick={onClick}>
      <div className="items-center relative w-full h-full">
        <Image
          src={imageUrl || ""}
          alt="Design image"
          fill
          objectFit="fill"
          className={`relative rounded-md p-[20px]`}
        />
      </div>
    </div>
  );

  return link ? (
    <div className={`w-full bg-gray-700 relative rounded-md group`}>
      <Link href={link} className={`flex justify-center items-center w-full h-full`}>{content}</Link>
      {children}
    </div>
  ) : (
    <div className={`w-full h-full block bg-gray-700 rounded-md`}>
      <div className="w-full h-full">{content}</div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default BaseCard;
