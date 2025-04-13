import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QuestionBlock from "./component/QuestionBlock";
import Sidebar from "./component/Sidebar";
import FormHeader from "./component/FormHeader";
// import SubmitForm from "./component/SubmitForm";

function App() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDesc, setFormDesc] = useState("Form description");
  const [questions, setQuestions] = useState([
    {
      questionText: "Untitled Question",
      options: ["Option 1"],
      required: false,
      type: "Multiple Choice",
    },
  ]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the droppable area or in the same position, do nothing
    if (!destination || source.index === destination.index) return;

    const updatedQuestions = Array.from(questions);
    const [removed] = updatedQuestions.splice(source.index, 1);
    updatedQuestions.splice(destination.index, 0, removed);

    setQuestions(updatedQuestions);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: 24 }}>
              <FormHeader
                title={formTitle}
                setTitle={setFormTitle}
                desc={formDesc}
                setDesc={setFormDesc}
              />

              {/* DragDropContext and Droppable components to enable drag-and-drop */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions" direction="vertical">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {questions.map((question, index) => (
                        <QuestionBlock
                          key={index}
                          index={index}
                          questions={questions}
                          setQuestions={setQuestions}
                        />
                      ))}
                      {provided.placeholder} {/* Ensures spacing between draggable items */}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Sidebar questions={questions} setQuestions={setQuestions} />

              {/* Submit Form */}
              {/* <SubmitForm
                questions={questions}
                formTitle={formTitle}
                formDesc={formDesc}
              /> */}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
