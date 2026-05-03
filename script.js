const GRADIO_LINK = "https://e62735c7fb38762446.gradio.live";

async function askQuestion() {
  const question = document.getElementById("question").value;

  const answerCard = document.getElementById("answerCard");
  const answerText = document.getElementById("answerText");
  const citationText = document.getElementById("citationText");
  const sourceText = document.getElementById("sourceText");

  if (!question.trim()) {
    alert("Please write a question first.");
    return;
  }

  // show card
  answerCard.classList.remove("hidden");

  // loading effect ✨
  answerText.innerHTML = "Wethaq.AI is analyzing verified sources... ⏳";
  citationText.innerText = "";
  sourceText.innerText = "";

  try {
    const app = await window.Client.connect(GRADIO_LINK);

    const result = await app.predict("/predict", {
      question: question
    });

    let answer = result.data[0];
    let citation = result.data[1];
    let source = result.data[2];

    // ✨ clean formatting
    answer = answer.replace(/\n/g, "<br><br>");

    answerText.innerHTML = answer;
    citationText.innerText = citation;
    sourceText.innerText = source;

  } catch (error) {
    answerText.innerHTML = "⚠️ Could not connect. Make sure your Colab is running.";
    citationText.innerText = "";
    sourceText.innerText = error.message;
  }
}
