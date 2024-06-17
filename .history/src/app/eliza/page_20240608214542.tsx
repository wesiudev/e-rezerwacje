import Link from "next/link";

/**
 * This is the Eliza page component.
 * It is a page that displays information about Eliza, an AI developed by the Codeium engineering team.
 * The page includes a header with a hero image, a description of Eliza, and a call to action to sign up for the Codeium service.
 */
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-green-100 !text-purple-800">
      {/* Header */}
      <header className="w-full px-4 py-6 bg-green-500">
        <h1 className="text-white text-3xl font-bold text-center">
          Meet Eliza
        </h1>
      </header>

      {/* Hero */}
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src="https://placehold.co/1200x400"
          alt="Eliza"
          className="w-full h-[300px] object-cover"
        />
        <p className="text-center text-white text-lg mt-4">
          Eliza is an AI developed by the Codeium engineering team. She is
          trained on a wide range of programming languages and can assist with
          code autocomplete, search, and chat-based assistance.
        </p>
        <Link
          href="/signup"
          className="px-4 py-2 bg-green-800 rounded-md text-white mt-4"
        >
          Sign Up for Eliza
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full px-4 py-6 bg-green-500">
        <p className="text-white text-center text-sm">
          Copyright &copy; 2022 Codeium. All rights reserved.
        </p>
      </footer>
      {/* About */}
      <div className="w-full flex flex-col items-center justify-center mt-12">
        <h2 className="text-center text-purple-800 text-2xl font-bold">
          About the Developer
        </h2>
        <p className="text-center text-white text-lg mt-4">
          I am a passionate developer with a strong interest in AI and machine
          learning. I have experience in building web applications using Next.js
          and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
