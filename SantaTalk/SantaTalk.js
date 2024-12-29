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

function formatBotResponse(text) {
    const santaPhrases = [
        "Ho ho ho! ",
        "My dear friend, ",
        "Ho ho! ",
        "Well well! ",
        "Oh my! "
    ];
    
    const randomPhrase = santaPhrases[Math.floor(Math.random() * santaPhrases.length)];
    const christmasEmojis = ["🎅", "🎄", "✨", "❄️", "🎁"];
    const randomEmoji = christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)];
    
    return `${randomPhrase}${text} ${randomEmoji}`;
}

async function handleSubmit(event) {
    event.preventDefault();

    let input = inputField.value;
    if (!input) return;
    
    spinner.style.display = "inline-block";

    if (input.toLowerCase().includes("my name is ")) {
        userName = input.split("my name is ")[1].trim();
        const welcomeMessage = `Ho ho ho! Welcome ${userName}! It's wonderful to meet you! 🎅 What can Santa help you with today? 🎄`;
        displayBotMessage(welcomeMessage);
        spinner.style.display = "none";
        return;
    }

    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = input;
    chatHistory.appendChild(userMessage);

    conversationHistory.push({ role: "user", text: input });

    inputField.value = "";

    const apiKey = 'AIzaSyChfZotVn8q350VaeRvqUvxLecllbLbGu8';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const data = {
        contents: [{
            parts: [{
                text: `You are Santa Claus responding to: "${input}". 
                Previous context: ${conversationHistory.slice(-3).map(msg => msg.text).join(" | ")}
                Respond in a jolly, warm, and friendly manner, using Christmas-themed language.
                Keep the response concise but magical.`
            }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
       
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        let botMessageText;
        if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts) {
            botMessageText = formatBotResponse(result.candidates[0].content.parts[0].text);
        } else {
            botMessageText = "Ho ho ho! Let me tell you about the magic of Christmas instead! Would you like to hear about my workshop? 🎅";
        }
        
        console.log(botMessageText)

        displayBotMessage(botMessageText);

    } catch (error) {
        console.error('Error:', error);
        const fallbackResponses = [
            "Ho ho ho! The elves are currently updating Santa's magical communication device! Would you like to tell me about your Christmas wishes? 🎅",
            "Ho ho ho! My crystal snow globe needs a moment to warm up! Tell me, have you been good this year? 🎄",
            "Ho ho ho! The North Pole's candy cane network is a bit busy! Shall we talk about Christmas magic? ✨",
            "Ho ho ho! Even Santa's workshop needs a quick break sometimes! What's your favorite holiday tradition? 🎁"
        ];
        const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        displayBotMessage(randomFallback);
    } finally {
        spinner.style.display = "none";
        console.log("end");
    }
}

function displayBotMessage(text) {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");
    botMessage.textContent = text;
    chatHistory.appendChild(botMessage);
    
    conversationHistory.push({ role: "bot", text: text });
    
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function autoSendHelloSanta() {
    const helloSantaMessage = "Hello Santa! 🎅";
    inputField.value = helloSantaMessage;
    handleSubmit({ preventDefault: () => {} });
}

window.addEventListener('load', autoSendHelloSanta);
