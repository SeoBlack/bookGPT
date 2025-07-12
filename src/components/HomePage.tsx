import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center bg-gradient-to-br from-green-50 to-white">
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-green-700">
          Your AI Book Assistant
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Upload any book in PDF format and chat with it using AI. Get insights,
          summaries, and have meaningful discussions about your favorite books.
        </p>
      </div>

      {/* Main CTA */}
      <div className="mb-12">
        <Link to="/upload">
          <button className="bg-green-600 text-white rounded-full px-8 py-4 font-semibold shadow-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 text-lg">
            📚 Upload a Book
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-green-700 mb-2">
            Chat with Your Book
          </h3>
          <p className="text-sm text-gray-600">
            Ask questions, get insights, and have meaningful conversations with
            any book you upload.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="font-semibold text-green-700 mb-2">
            AI-Powered Analysis
          </h3>
          <p className="text-sm text-gray-600">
            Get intelligent summaries, key concepts, and detailed analysis using
            advanced AI technology.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-semibold text-green-700 mb-2">
            Deep Understanding
          </h3>
          <p className="text-sm text-gray-600">
            Explore books in depth with context-aware responses and
            comprehensive insights.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="font-semibold text-green-700 mb-4">How it works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              1
            </div>
            <span>Upload your PDF book</span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              2
            </div>
            <span>AI processes the content</span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              3
            </div>
            <span>Start chatting and exploring</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <p className="text-gray-600 text-sm">Quick actions:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/upload">
            <button className="bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-green-200 transition">
              📖 Upload New Book
            </button>
          </Link>
          <Link to="/chat" state={{ bookTitle: "Sample Book" }}>
            <button className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-200 transition">
              💬 Try Demo Chat
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-gray-500">
        <p>Transform your reading experience with AI</p>
        <p className="mt-1">Developed by Sorin</p>
      </div>
    </div>
  </div>
);

export default HomePage;
