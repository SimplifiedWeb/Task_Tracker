import React from "react";

const TextAnimation = () => {
  return (
    <main className="animation-container">
      <p className="mb-5 text-#e5e5e5">Task</p>
      <section className="animation mt-3">
        <div className="first">
          <div>Create a task</div>
        </div>
        <div className="second">
          <div>Edit your tasks</div>
        </div>
        <div className="third">
          <div>Complete tasks</div>
        </div>
      </section>
    </main>
  );
};

export default TextAnimation;
