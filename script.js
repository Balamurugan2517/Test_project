document.addEventListener("DOMContentLoaded", () => {
    console.log("Agency.OS Frontend Loaded Successfully.");

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMinimize = document.getElementById('chatbot-minimize');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    let isOpen = false;

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatbotWindow.classList.remove('hidden');
            chatIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            chatbotInput.focus();
        } else {
            chatbotWindow.classList.add('hidden');
            chatIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Minimize chatbot
    chatbotMinimize.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
        chatIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isOpen = false;
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 600);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = sender === 'user'
            ? 'bg-indigo-600 text-white rounded-lg px-3 py-2 max-w-xs text-sm'
            : 'bg-slate-800 text-slate-100 rounded-lg px-3 py-2 max-w-xs text-sm';
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you with Agency.OS services today?';
        } else if (lowerMessage.includes('services')) {
            return 'We offer cloud-native infrastructure, e-commerce engines, custom dashboards, and more. Would you like to learn about any specific service?';
        } else if (lowerMessage.includes('contact')) {
            return 'You can reach us through our contact page or request a proposal directly from our website.';
        } else if (lowerMessage.includes('pricing') || lowerMessage.includes('proposal')) {
            return 'We provide custom proposals based on your specific needs. Click "Get a Proposal" on our website to start the conversation.';
        } else if (lowerMessage.includes('kubernetes') || lowerMessage.includes('cloud')) {
            return 'We specialize in cloud-native Kubernetes infrastructure and enterprise solution architecture.';
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Feel free to ask if you have any other questions.";
        } else {
            return 'Thank you for your message. Our team will get back to you shortly, or you can visit our contact page for immediate assistance.';
        }
    }

    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});