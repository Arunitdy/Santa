
console.log("start");

let conversationHistory = []; 
let userName = ""; 

const form = document.querySelector(".input-container");
const inputField = document.querySelector(".inputdata");
const submitButton = document.querySelector(".submit");
const spinner = document.querySelector(".spinner");
const chatHistory = document.getElementById("chatHistory");

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(event);
    }
});

submitButton.addEventListener("click", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    let input = inputField.value;
    if (!input) return;
    
    spinner.style.display = "inline-block";

    
    if (input.toLowerCase().includes("my name is ")) {
        userName = input.split("my name is ")[1].trim(); 
    }

    conversationHistory.push({ role: "user", text: input });

   
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = input;
    chatHistory.appendChild(userMessage);

    chatHistory.scrollTop = chatHistory.scrollHeight;

   
    inputField.value = "";

    const apiKey = 'AIzaSyBf40hpO1zx4XFE8QGXNH_eXrfOD1tKzs0';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const data = {
        contents: conversationHistory.map(message => ({
            parts: [{ text: message.text }]
        }))
    };

   
    if (userName) {
        data.contents.push({
            parts: [{ text: `The user's name is ${userName}.` }]
        });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

   
        let botMessageText = "I'm sorry, I couldn't process your request at the moment.";
        if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts) {
            botMessageText = result.candidates[0].content.parts[0].text;
        }

     
        conversationHistory.push({ role: "bot", text: botMessageText });

     
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = botMessageText;
        chatHistory.appendChild(botMessage);

        console.log(botMessageText);

      
        chatHistory.scrollTop = chatHistory.scrollHeight;

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");
        errorMessage.textContent = "Sorry, there was an error processing your request.";
        chatHistory.appendChild(errorMessage);
    } finally {
     
        spinner.style.display = "none";
        console.log("end");
    }
}