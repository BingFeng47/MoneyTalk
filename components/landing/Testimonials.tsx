import { AnimatedTestimonials } from "./animated_testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "With this platform, we’ve redefined how users interact with their finances. The seamless integration of AI and automation allows for smarter financial management, saving users both time and effort.",
      name: "Calvin Koay",
      designation: "Product Manager",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "We’ve engineered this product to adapt to every user’s unique financial needs. The dynamic dashboard, real-time insights, and voice command features set it apart as a truly next-gen financial tool.",
      name: "Bing Feng",
      designation: "Fullstack Developer",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Our goal was to make financial management not only accessible but enjoyable. By combining cutting-edge AI with simple, intuitive design, we’ve created a platform that empowers users to take full control of their financial future.",
      name: "Chee Yee",
      designation: "UI/UX Designer",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials}/>;
}
