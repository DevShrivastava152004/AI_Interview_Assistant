import React, { useState } from "react";

export default function UserSetup({ onStart }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const isDisabled = name.trim() === "" || topic.trim() === "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome to AI Interview Assistant
        </h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Select Topic</label>
        <input
          type="text"
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., React, Python, HR"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => onStart(name, topic)}
          disabled={isDisabled}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
