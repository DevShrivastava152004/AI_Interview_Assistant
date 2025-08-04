export async function getFeedback(answer) {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });
  
      if (!response.ok) {
        throw new Error("API call failed");
      }
  
      const data = await response.json();
      return data; // Expected format: { feedback: "Your answer is good..." }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return { feedback: "Error connecting to the AI backend." };
    }
  }
  