import React, { useState } from "react";
import axios from "axios";

const SubmitForm = ({ questions, formTitle, formDesc }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = async () => {
    try {
      
      await axios.post("http://localhost:5000/submit", {
        formTitle,
        formDesc,
        answers,
      });
      setSubmitted(true); 
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  if (submitted) {
    return <h2>Thank you for your response! 🥳</h2>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>{formTitle}</h2>
      <p>{formDesc}</p>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <p>{q.questionText}</p>
          {q.options.map((opt, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitForm;
