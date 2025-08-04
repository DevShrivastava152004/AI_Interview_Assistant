import React, { useState } from "react";
import { getFeedback } from "../api";
import FeedbackDisplay from "./FeedbackDisplay";

export default function QuestionCard({ question, index, total, onSubmit }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetFeedback = async () => {
    setLoading(true);
    try {
      const res = await getFeedback(answer);
      setFeedback(res.feedback || "No feedback received.");
    } catch (err) {
      setFeedback("Error fetching feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {index} of {total}
        </h2>
        <p className="text-gray-700 mt-2">{question}</p>
      </div>

      <textarea
        className="w-full h-36 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {!feedback ? (
        <button
          className="mt-4 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
          onClick={handleGetFeedback}
          disabled={!answer || loading}
        >
          {loading ? "Analyzing..." : "Get Feedback"}
        </button>
      ) : (
        <div className="mt-6">
          <FeedbackDisplay feedback={feedback} />
          <button
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => onSubmit(answer, feedback)}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
