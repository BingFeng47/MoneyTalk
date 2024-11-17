// app/not-found.js
import { Bird } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4 text-primary dark:text-white flex flex-row items-end gap-2">4<span className='text-sm '><Bird className='text-primary dark:text-white'/>???</span>4</h1>
      <p className="text-lg mb-6 ">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/">
        <h1 className="text-blue-500 underline hover:text-blue-700">Go Back Home</h1>
      </Link>
    </div>
  );
}