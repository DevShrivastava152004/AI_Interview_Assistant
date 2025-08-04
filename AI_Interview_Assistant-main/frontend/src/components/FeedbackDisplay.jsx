import React from "react";

export default function FeedbackDisplay({ feedback }) {
  // Determine color based on keywords
  const getColorClass = () => {
    const lower = feedback.toLowerCase();
    if (lower.includes("good") || lower.includes("well done") || lower.includes("excellent")) {
      return "text-green-600 border-green-300 bg-green-50";
    } else if (lower.includes("improve") || lower.includes("weak") || lower.includes("not clear")) {
      return "text-red-600 border-red-300 bg-red-50";
    } else {
      return "text-yellow-600 border-yellow-300 bg-yellow-50";
    }
  };

  return (
    <div className={`p-4 rounded-md border mt-4 ${getColorClass()}`}>
      <strong>AI Feedback:</strong>
      <p className="mt-1">{feedback}</p>
    </div>
  );
}
