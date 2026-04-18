import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-4 px-6">
      <span className="inline-block font-playfair-display text-2xl leading-8 text-accent-red italic">
        Promisecard
      </span>
      <nav className="flex items-center gap-x-8 font-inter">
        <Link
          href="/"
          className="text-[10px] text-unactive-link hover:underline underline-offset-4 uppercase"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-[10px] text-unactive-link hover:underline underline-offset-4 uppercase"
        >
          The Heirloom
        </Link>
        <Link
          href="/contact"
          className="text-[10px] text-unactive-link hover:underline underline-offset-4 uppercase"
        >
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-x-2">
        <Link
          href="/login"
          className="rounded-sm py-2 px-4 bg-accent-red text-white font-inter text-sm font-medium"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-sm py-2 px-4 bg-secondary text-button-green font-inter text-sm font-medium"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
