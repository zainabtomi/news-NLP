
import axios from "axios";
import { validateURL } from "./URLChecker";

const getElement = (selector) => document.querySelector(selector);

const displayMessage = (selector, message, isVisible) => {
  const element = getElement(selector);
  if (message) {
    element.innerHTML = `<p>${message}</p>`;
  } else {
    element.innerHTML = "";
  }
  element.style.display = isVisible ? "block" : "none";
};

const toggleVisibility = (selector, isVisible) => {
  const element = getElement(selector);
  element.style.visibility = isVisible ? "visible" : "hidden";
};

const handleURLValidation = (url) => {
  if (!validateURL(url)) {
    displayMessage(".msgDisplay", "Enter a valid URL", true);
    return false;
  }
  return true;
};

const renderResponse = (data) => {
  const results = getElement("#results");

  if (!data || data.error) {
    const errorMessage = data?.error || "Internal error";
    displayMessage(".alert", errorMessage, true);
    return;
  }

  const { score_tag, agreement, subjectivity, confidence, irony } = data;
  results.innerHTML = `
    <p class="resultData">Score: ${score_tag}</p>
    <p class="resultData">Agreement: ${agreement}</p>
    <p class="resultData">Subjectivity: ${subjectivity}</p>
    <p class="resultData">Confidence: ${confidence}</p>
    <p class="resultData">Irony: ${irony}</p>
  `;
};

const handleFormSubmission = async (event) => {
  event.preventDefault();

  const input = getElement("#myform input");
  displayMessage(".msgDisplay", "", false);
  displayMessage(".alert", "", false);

  if (!handleURLValidation(input.value)) return;

  toggleVisibility(".loader", true);

  try {
    const response = await axios.post("http://localhost:8000/", { url: input.value });
    renderResponse(response.data);
    displayMessage(".msgDisplay", "Success :)", true);
  } catch (error) {
    console.error(error);
    displayMessage(".alert", "Failed to analyze the URL. Please try again later.", true);
  } finally {
    toggleVisibility(".loader", false);
  }
};

export { handleFormSubmission };
