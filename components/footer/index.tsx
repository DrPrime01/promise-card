import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 flex flex-col gap-y-6 items-center justify-center text-center">
      <h3 className="text-2xl leading-8 text-accent-red font-playfair-display italic">
        Promisecard
      </h3>
      <div className="flex items-center gap-x-8">
        <Link href="/" className="text-xs leading-4 text-brown font-inter">
          Terms of Service
        </Link>
        <Link href="/" className="text-xs leading-4 text-brown font-inter">
          About the Heirloom
        </Link>
        <Link href="/" className="text-xs leading-4 text-brown font-inter">
          Privacy Policy
        </Link>
      </div>
      <p className="text-xs leading-4 text-brown font-inter">
        &copy; {new Date().getFullYear()} Promisecard. Handcrafted for your
        memories. All rights reserved.
      </p>
    </footer>
  );
}
