export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Higgs</h1>
        <p className="text-gray-600 mb-8">AI Video Generation Platform</p>
        <a
          href="/text-to-video"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Generating Videos
        </a>
      </div>
    </main>
  );
}
