import Link from "next/link";

export default function Home() {
  return (
    <div className="h-svh flex flex-col items-center justify-center p-6 md:p-8">
      <div className="flex items-center gap-x-3">
        <Link
          href="/login"
          className="border px-4 py-2.5 rounded-md text-sm font-medium bg-transparent text-black"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="border px-4 py-2.5 rounded-md text-sm font-medium bg-transparent text-black"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
