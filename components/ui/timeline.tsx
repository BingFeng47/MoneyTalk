"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const AceTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white dark:bg-inherit font-sans md:px-20" ref={containerRef} >
      <div className="max-w-screen py-20">
        <h2 className="text-lg md:text-4xl mb-2 text-black dark:text-white max-w-4xl">
          Competitive History
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm lg:text-lg md:text-base ">
          We&apos;ve been staying competitive in International Hackathon for the last years. Here&apos;s a timeline of our journey.
        </p>
      </div>

      <div ref={ref} className="relative max-w-screen pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className=" h-4 md:h-10 absolute left-6 md:left-3 w-4 md:w-10 rounded-full bg-primary dark:bg-primary flex items-center justify-center">
                <div className=" hidden md:block h-2 md:h-4 w-2 md:w-4 rounded-full bg-neutral-200 dark:bg-white border" />
              </div>
              <h3 className="hidden md:block text-xl  md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-white ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-10 pr-4 md:pl-4 w-full">
              <h2 className="md:hidden block pl-2 text-lg mb-2 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h2>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-accent via-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
