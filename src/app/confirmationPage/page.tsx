"use client";
// pages/confirmationPage.js
import Head from 'next/head';

export default function ConfirmationPage() {
   
  const clear = () =>{
    localStorage.clear()
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Booking Confirmation</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Thank you for your booking!</h1>
        </header>
        <main className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Booking Details</h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Your booking has been successfully confirmed. Here are the details:</p>
            </div>
            <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
              <li>Date and Time: [Date/Time]</li>
              <li>Service: [Service Name]</li>
              <li>Confirmation Number: [ID]</li>
            </ul>
            <div className="mt-5">
              <p>For any questions or changes, please contact us at xxx@xxx.com or by phone at (XX) XXXX-XXXX.</p>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 flex justify-center gap-4">
            <a href="/" onClick={clear} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Back to Homepage
            </a>
            
          </div>
        </main>
        <footer className="text-center mt-6 text-sm text-gray-600">
          <p>For more information, visit our <a href="/faq" className="text-blue-600 hover:text-blue-700">FAQ</a> or our <a href="/contact" className="text-blue-600 hover:text-blue-700">contact page</a>.</p>
        </footer>
      </div>
    </div>
  );
}
