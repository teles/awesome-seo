import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Made with ❤️ by{' '}
            <a 
              href="https://github.com/teles" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Jota Teles
            </a>
          </p>
          <p className="text-sm text-gray-400">
            Data automatically synchronized from the{' '}
            <a 
              href="https://github.com/teles/awesome-seo" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              main repository
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
