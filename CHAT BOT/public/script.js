$(document).ready(function () {
    console.log("✅ jQuery Loaded - Script Running");

    const chatBox = $("#chat-box");
    const userInput = $("#user-input");
    const sendButton = $("#send-btn");

    // 🔹 Send message on button click
    sendButton.on("click", function () {
        console.log("📩 Send button clicked");
        sendMessage();
    });

    // 🔹 Send message on pressing Enter key
    userInput.on("keypress", function (event) {
        if (event.which === 13) { // Enter key
            console.log("⏎ Enter key pressed");
            sendMessage();
        }
    });

    function sendMessage() {
        const userText = userInput.val().trim();
        if (userText === "") {
            console.log("⚠️ Empty input - No message sent");
            return;
        }

        console.log("📤 Sending message:", userText);
        appendMessage(userText, "user-message");

        $.ajax({
            url: "http://localhost:5000/chat",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: userText }),
            success: function (response) {
                console.log("✅ API Response:", response);
                appendMessage(response.result || "No response", "bot-message");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("❌ API Error:", textStatus, errorThrown);
                appendMessage("Error connecting to AI.", "bot-message");
            }
        });

        userInput.val(""); // Clear input field
    }

    function appendMessage(text, className) {
        console.log("💬 Displaying message:", text);
        const messageDiv = $("<div>").addClass(className).text(text);
        chatBox.append(messageDiv);
        chatBox.scrollTop(chatBox[0].scrollHeight);
    }
});
