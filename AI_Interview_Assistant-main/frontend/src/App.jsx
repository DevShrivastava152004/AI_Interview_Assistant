import React, { useState } from "react";
import UserSetup from "./components/UserSetup";
import QuestionCard from "./components/QuestionCard";
import Summary from "./components/Summary";
import "./styles.css"; // Optional: Tailwind already included in index.html

// Sample questions — you can replace with dynamic questions later
const questions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "What are your weaknesses?",
  "Why do you want this job?",
];

export default function App() {
  const [step, setStep] = useState(0); // 0 = user setup, 1+ = questions
  const [user, setUser] = useState({ name: "", topic: "" });
  const [answers, setAnswers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Start interview
  const handleStart = (name, topic) => {
    setUser({ name, topic });
    setStep(1);
  };

  // Handle answer + feedback, go to next question or summary
  const handleNext = (answer, feedback) => {
    setAnswers([...answers, answer]);
    setFeedbacks([...feedbacks, feedback]);
    setStep(step + 1);
  };

  // Render logic
  if (step === 0) {
    return <UserSetup onStart={handleStart} />;
  }

  if (step <= questions.length) {
    return (
      <QuestionCard
        question={questions[step - 1]}
        index={step}
        total={questions.length}
        onSubmit={handleNext}
      />
    );
  }

  // Final summary
  return (
    <Summary
      questions={questions}
      answers={answers}
      feedbacks={feedbacks}
      user={user}
    />
  );
}
