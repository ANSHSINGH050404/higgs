'use client';

export default function TextToVideo() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Text to Video</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={4}
              placeholder="Describe the video you want to generate..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
            <select className="w-full p-3 border rounded-lg">
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <select className="w-full p-3 border rounded-lg">
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4k">4K</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
            <select className="w-full p-3 border rounded-lg">
              <option value="16:9">16:9 (Landscape)</option>
              <option value="9:16">9:16 (Portrait)</option>
              <option value="1:1">1:1 (Square)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Frame</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Frame</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reference Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Generate Video
          </button>
        </form>
      </div>
    </main>
  );
}
