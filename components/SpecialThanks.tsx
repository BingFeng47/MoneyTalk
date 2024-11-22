import React from 'react'
import Marquee from './ui/marquee'
import { cn } from '@/lib/utils';
import Image from 'next/image';

const files = [
    {
      name: "AWS",
      image: "/logo/aws.png",
    },
    {
      name: "Riot",
      image: "/logo/riot.png",

    },
    {
        name: "Valorant",
        image: "/logo/valorant.png",
  
    },
    {
      name: "Devpost",
      image: "/logo/devpost.png",

    },
    {
      name: "Vercel",
      image: "/logo/vercel.png",

    },
    {
      name: "Next",
      image: "/logo/next.png",

    },
  ];
  
  export default function SpecialThanks() {
    return (
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-muted to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-muted to-transparent pointer-events-none z-10"></div>
        <Marquee className="[--duration:20s] items-center flex gap-6 pt-10 ">
          {files.map((f, idx) => (
        <figure
          key={idx}
          className={cn(
            "relative w-124 cursor-pointer justify-center items-center flex flex-row gap-5 mx-12 pt-14"
          )}
        >
          <Image
            src={f.image.replace('.png', '-light.png')}
            alt={`${f.name}`}
            width={200}
            height={200}
            className="dark:hidden block"
          />
          <Image
            src={f.image.replace('.png', '-dark.png')}
            alt={`${f.name}`}
            width={200}
            height={200}
            className="dark:block hidden"
          />
        </figure>
          ))}
        </Marquee>
      </div>
    );
  }