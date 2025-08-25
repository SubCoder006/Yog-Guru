// app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-300 via-[#97e8db] to-sky-300">
      {/* Hero Section */}
      <section className="text-center p-8 max-w-3xl">
        <h1 className="text-6xl font-bold text-white mb-4 custom-shadow-blue">
          Yog-Guru
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Discover the ancient practice of yoga with step-by-step guides,
          lifestyle plans, and personalized consultations. Start your journey
          toward balance and wellness today.
        </p>
        <div className="flex gap-4 justify-center items-center">
          <Link href="/yoga">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-500 rounded-lg text-sm px-6 py-3 text-center me-2 mb-2 font-bold"
            >
              Explore Yoga
            </button>
          </Link>
          <Link href="/auth/signup">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-6 py-3 text-center me-2 mb-2 font-bold"
            >
              Join Premium
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 mt-12 px-6 max-w-6xl">
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Yoga Guides
          </h2>
          <p className="text-gray-600 text-sm">
            Learn step-by-step poses with photos. Limited poses free, unlock all
            with premium.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Diet & Lifestyle
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Get diet plans and yoga routines tailored to your lifestyle & goals.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Expert Consultation
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Connect with yoga experts for guidance and personalized sessions.
          </p>
        </div>
      </section>
    </main>
  );
}
