var lastSentTime = 0; // Initialize last sent time

// Load saved name from local storage
document.getElementById("name").value = localStorage.getItem("savedName");

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var currentTime = Date.now();
    if (currentTime - lastSentTime < 3000) {
        alert("Please wait before sending another message.");
        return;
    }
    sendMessage();
    lastSentTime = currentTime; // Update last sent time
});

document.getElementById("message").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        var currentTime = Date.now();
        if (currentTime - lastSentTime < 3000) {
            alert("Please wait before sending another message.");
            return;
        }
        sendMessage();
        lastSentTime = currentTime; // Update last sent time
    }
});

document.getElementById("uploadButton").addEventListener("click", function() {
    // Create a hidden file input element
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    // Trigger the file input click event
    fileInput.click();

    // Add an event listener to handle file selection
    fileInput.addEventListener("change", function(event) {
        var files = event.target.files;
        // You can handle the selected files here, for example:
        console.log("Selected files:", files);
    });
});

function sendMessage() {
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    if (!message.trim()) {
        alert("Please enter a message.");
        return;
    }
    var webhookURL = "https://discord.com/api/webhooks/1238220176651063437/HBWuJmJy8QpBRNKMU_tAYWqnBUCfA46ou7aiH416O-pegUSDKWZQi49WyIqZuHrQeSS3";

    // Save name to local storage
    localStorage.setItem("savedName", name);

    var fullMessage = name ? "**From:** " + name + "\n**Message:** " + message : message;

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: fullMessage
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to send message.");
        }
        alert("Message sent successfully!");
        document.getElementById("message").value = "";
    })
    .catch(error => {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again later.");
    });
}
