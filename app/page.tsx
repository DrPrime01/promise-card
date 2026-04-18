// import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import CakeIcon from "@/components/vectors/cake-icon";
import CalendarIcon from "@/components/vectors/calendar-icon";
import RightArrow from "@/components/vectors/right-arrow";
import ShareIcon from "@/components/vectors/share-icon";
import VerifiedIcon from "@/components/vectors/verified-icon";
import WriteIcon from "@/components/vectors/write-icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col bg-primary">
      <Navbar />
      <section className="px-6 pt-24 pb-40 flex items-center gap-x-12">
        <div className="flex-1 flex flex-col gap-y-6">
          <h1 className="font-playfair-display text-[6rem] leading-[6rem] text-accent-red italic">
            Digital Keepsakes, Timeless Traditions.
          </h1>
          <div className="flex flex-col gap-y-8 p-8 max-w-[32rem] bg-tertiary rounded-[12px]">
            <p className="text-unactive-link font-inter text-xl">
              Create a promise card for your next occasion. No account
              needed—just pick an occasion and start your list.
            </p>
            <div className="flex items-center gap-x-4">
              <button className="rounded-sm border border-dashed border-light-red outline-4 outline-accent-red py-3 px-8 bg-linear-to-r from-accent-red to-accent-red-2 text-white font-inter text-lg leading-7 font-medium cursor-pointer flex items-center gap-x-2">
                <span>Create Your Card</span> <CakeIcon />
              </button>
              <button className="rounded-sm py-4 px-8 bg-secondary text-button-green font-inter text-lg leading-7 font-medium cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/images/promise-card-on-aged-paper.png"
            alt="promise-card-on-aged-paper"
            width={536}
            height={536}
          />
          <div className="bg-white rounded-lg p-4 font-noto-serif text-sm leading-5 text-accent-red -rotate-6 w-fit absolute bottom-10">
            Est. 1924 Heritage
          </div>
        </div>
      </section>
      <section className="px-6 py-24 flex flex-col gap-y-16">
        <div className="flex flex-col gap-y-2">
          <span className="uppercase font-inter text-[10px] leading-[15px] text-accent-red">
            The Process
          </span>
          <h2 className="text-5xl leading-[3rem] font-playfair-display text-dark">
            Crafting Your Heirloom
          </h2>
        </div>
        <div className="flex gap-x-8">
          <div className="bg-white p-8 rounded-[12px] flex flex-col gap-y-6">
            <div className="size-12 rounded-full grid place-items-center bg-accent-red/10">
              <CalendarIcon />
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="text-2xl leading-8 text-dark font-playfair-display">
                1. Pick an Occasion
              </span>
              <p className="text-base leading-[26px] font-inter text-brown">
                Whether it&apos;s a Wedding, Birthday, or a Simple Thank You, we
                have the perfect canvas for your words.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-x-2">
              <div className="uppercase rounded-full bg-light-cream py-1 px-3 text-[10px] leading-[15px] text-dark">
                birthday
              </div>
              <div className="uppercase rounded-full bg-light-cream py-1 px-3 text-[10px] leading-[15px] text-dark">
                wedding
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[12px] flex flex-col gap-y-6">
            <div className="size-12 rounded-full grid place-items-center bg-button-green/10">
              <WriteIcon />
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="text-2xl leading-8 text-dark font-playfair-display">
                2. Add your wishes
              </span>
              <p className="text-base leading-[26px] font-inter text-brown">
                Whether it&apos;s a Wedding, Birthday, or a Simple Thank You, we
                have the perfect canvas for your words.
              </p>
            </div>
            <div className="pt-4">
              <progress value={65} max={100} className="progress w-full" />
            </div>
          </div>
          <div className="bg-white p-8 rounded-[12px] flex flex-col gap-y-6">
            <div className="size-12 rounded-full grid place-items-center bg-pine-green/10">
              <ShareIcon />
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="text-2xl leading-8 text-dark font-playfair-display">
                3. Share with friends
              </span>
              <p className="text-base leading-[26px] font-inter text-brown">
                Send your digital card instantly via a private link. No login
                required for them to view your keepsake.
              </p>
            </div>
            <div className="pt-4">
              <div className="relative">
                <div className="size-8 rounded-full border-2 bg-gray-300 border-white text-[10px] leading-[15px] text-white"></div>
                <div className="size-8 rounded-full border-2 bg-gray-300 border-white text-[10px] leading-[15px] text-white absolute top-0 left-6"></div>
                <div className="size-8 rounded-full border-2 bg-accent-red border-white text-[10px] leading-[15px] text-white absolute top-0 left-12 grid place-items-center">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-24 flex items-center gap-x-16">
        <div className="flex-1 relative">
          <Image
            src="/images/preserving-moments.png"
            alt="preserving-moments"
            width={512}
            height={512}
          />
          <div className="rounded-full size-24 border-4 border-yellow bg-pine-green grid place-items-center absolute right-16 -bottom-2.5">
            <VerifiedIcon />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-y-8">
            <h2 className="text-5xl leading-[3rem] font-playfair-display text-accent-red">
              Preserving Moments in a Faster World
            </h2>
            <div className="flex flex-col gap-y-6">
              <p className="font-inter text-lg leading-[30px] text-brown">
                In an age of fleeting notifications and temporary stories,
                Promisecard offers a place for permanence. Our cards aren&apos;t
                just messages; they are digital heirlooms designed to be
                revisited years from now.
              </p>
              <p className="font-inter text-lg leading-[30px] text-brown">
                Inspired by the tactile warmth of paper and the thoughtful pace
                of traditional correspondence, we&apos;ve built a platform that
                respects your time and your memories.
              </p>
            </div>
            <Link
              href="/"
              className="text-accent-red text-xl leading-7 font-playfair-display italic flex items-center gap-x-2"
            >
              <span>Discover the Heritage</span> <RightArrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-24 bg-accent-red flex flex-col gap-y-8 items-center justify-center text-center">
        <h2 className="text-[60px] leading-[60px] font-playfair-display text-white italic">
          Ready to make a promise?
        </h2>
        <p className="font-inter text-xl leading-7 text-pink">
          Start your list today. No sign-up required, no strings attached. Just
          pure intention.
        </p>
        <div className="pt-4 flex items-center gap-x-6">
          <button className="rounded-lg bg-primary py-5 px-10 text-accent-red font-inter font-bold text-xl leading-7 cursor-pointer">
            Create Your Card Now
          </button>
          <Link
            href="/login"
            className="rounded-lg py-5 px-10 border border-pink font-inter font-bold text-xl leading-7 text-white"
          >
            Log In
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
