export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-arcade">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The infinite glitch couldn't find this page.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
        >
          Return to IJG
        </a>
      </div>
    </div>
  );
}
