function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.querySelector(".chat-box .scroll-area");
    const chatInput = document.querySelector(".chat-message input");
    const sendButton = document.querySelector(".chat-message button");

    // Function to add a new chat message
    function addMessage(sender, text) {
        const messageElement = document.createElement("li");
        messageElement.innerHTML = `
            <span class="avatar ${sender}">${sender === "bot" ? "AI" : "User"}</span>
            <div class="message">${text}</div>
        `;
        document.getElementById("chat-id").appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to send the user input to the OpenAI API
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        addMessage("user", userMessage);
        chatInput.value = "";  // Clear input

        // Add loading indicator for bot response
        addMessage("bot", "Thinking...");

        // Set up request to OpenAI
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer  ${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}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",  // or use "gpt-4" if available
                    messages: [
                        { role: "system", content: "You are an AI assistant knowledgeable about Vijay's resume and skills." },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 100,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            // Remove loading indicator and add the actual response
            document.getElementById("chat-id").lastChild.remove();
            addMessage("bot", botMessage);

        } catch (error) {
            console.error("Error fetching the chatbot response:", error);
            document.getElementById("chat-id").lastChild.remove();
            addMessage("bot", "Sorry, I'm having trouble right now. Please try again later.");
        }
    }

    // Send message when clicking the send button
    sendButton.addEventListener("click", sendMessage);

    // Send message when pressing Enter
    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    if (darkModeIcon) {
        darkModeIcon.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Toggle icon class
            if (document.body.classList.contains('dark-mode')) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        });
    } else {
        console.error("Dark mode icon not found");
    }
});
