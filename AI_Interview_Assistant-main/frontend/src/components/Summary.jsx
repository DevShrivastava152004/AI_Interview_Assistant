import React from "react";

export default function Summary({ questions, answers, feedbacks, user }) {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Interview Summary
      </h1>

      <div className="text-center text-gray-600 mb-10">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Topic:</strong> {user.topic}
        </p>
      </div>

      {questions.map((q, idx) => (
        <div
          key={idx}
          className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg shadow-sm"
        >
          <p className="text-gray-800 mb-2">
            <strong>Q{idx + 1}:</strong> {q}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Your Answer:</strong> {answers[idx]}
          </p>
          <p className="text-gray-700">
            <strong>AI Feedback:</strong> {feedbacks[idx]}
          </p>
        </div>
      ))}

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          Thank you for using the AI Interview Assistant. Keep practicing and improving!
        </p>
      </div>
    </div>
  );
}
