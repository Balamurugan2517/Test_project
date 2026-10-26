document.addEventListener("DOMContentLoaded", () => {
    console.log("Agency.OS Frontend Loaded Successfully.");

    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMinimize = document.getElementById('chatbot-minimize');
    const chatbotClear = document.getElementById('chatbot-clear');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotBadge = document.getElementById('chatbot-badge');
    const quickReplies = document.querySelectorAll('.quick-reply');

    let isOpen = false;
    let unreadCount = 0;

    // Show notification badge
    function showBadge() {
        unreadCount++;
        chatbotBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        chatbotBadge.classList.remove('hidden');
    }

    // Hide notification badge
    function hideBadge() {
        unreadCount = 0;
        chatbotBadge.classList.add('hidden');
    }

    // Toggle chat window
    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatbotWindow.classList.remove('hidden');
            chatIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            hideBadge();
            chatbotInput.focus();
        } else {
            chatbotWindow.classList.add('hidden');
            chatIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Minimize chat window
    chatbotMinimize.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
        chatIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isOpen = false;
    });

    // Clear chat
    chatbotClear.addEventListener('click', () => {
        // Keep only welcome message
        chatbotMessages.innerHTML = '';
        addBotMessage("Hi! I'm the Agency.OS assistant. How can I help you today?");
    });

    // Add message to chat
    function addMessage(text, sender, showBadgeOnReceive = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const bubbleDiv = document.createElement('div');
        if (sender === 'user') {
            bubbleDiv.className = 'bg-indigo-600 text-white rounded-xl rounded-tl-none px-3 py-2 text-sm max-w-xs border border-indigo-500/50';
        } else {
            bubbleDiv.className = 'bg-slate-800 text-slate-100 rounded-xl rounded-tr-none px-3 py-2 text-sm max-w-xs border border-slate-700';
        }
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        if (showBadgeOnReceive && !isOpen) {
            showBadge();
        }
    }

    function addUserMessage(text) {
        addMessage(text, 'user');
    }

    function addBotMessage(text) {
        addMessage(text, 'bot', true);
    }

    // Typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex justify-start typing-indicator';
        typingDiv.id = 'typing-indicator';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'bg-slate-800 rounded-xl rounded-tr-none px-3 py-2 max-w-xs border border-slate-700';
        bubbleDiv.innerHTML = '<span class="text-slate-400 text-xs typing-dot">.</span><span class="text-slate-400 text-xs typing-dot">.</span><span class="text-slate-400 text-xs typing-dot">.</span>';

        typingDiv.appendChild(bubbleDiv);
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Get bot response based on user input (simple English)
    function getBotResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();

        // Greetings
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good afternoon') || msg.includes('good evening')) {
            return 'Hello! How can I help you today?';
        }

        // Services
        if (msg.includes('service') || msg.includes('offer') || msg.includes('what do you do') || msg.includes('what can you do')) {
            return 'We offer cloud infrastructure, e-commerce websites, custom dashboards, and enterprise architecture. Would you like details on any of these?';
        }

        // Cloud / Kubernetes
        if (msg.includes('cloud') || msg.includes('kubernetes') || msg.includes('k8s') || msg.includes('infrastructure')) {
            return 'Yes, we build cloud-native systems using Kubernetes and modern cloud platforms. Need help with your cloud setup?';
        }

        // Contact
        if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone') || msg.includes('talk to')) {
            return 'You can contact us through the Contact page on our website, or click "Get a Proposal" to start a conversation.';
        }

        // Proposal / Pricing
        if (msg.includes('proposal') || msg.includes('price') || msg.includes('pricing') || msg.includes('cost') || msg.includes('quote') || msg.includes('estimate')) {
            return 'We provide custom proposals based on your needs. Please click "Get a Proposal" on our website and fill in your details.';
        }

        // E-commerce
        if (msg.includes('ecommerce') || msg.includes('e-commerce') || msg.includes('online store') || msg.includes('shop')) {
            return 'Yes, we build high-converting e-commerce engines with secure payments and easy product management.';
        }

        // Dashboard
        if (msg.includes('dashboard') || msg.includes('admin') || msg.includes('panel')) {
            return 'We create custom dashboards and admin panels for data visualization and business management.';
        }

        // Help / Support
        if (msg.includes('help') || msg.includes('support') || msg.includes('assist') || msg.includes('guide')) {
            return 'I can answer questions about our services, contact info, proposals, cloud, e-commerce, and dashboards. What would you like to know?';
        }

        // About / Who
        if (msg.includes('who are you') || msg.includes('about') || msg.includes('company') || msg.includes('agency')) {
            return 'We are Agency.OS, a team that builds digital systems from first principles. We help businesses with cloud, web, and custom software.';
        }

        // Thank you
        if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx')) {
            return "You're welcome! Anything else I can help with?";
        }

        // Goodbye
        if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('exit')) {
            return 'Goodbye! Have a great day. Come back anytime.';
        }

        // Default response
        return "I'm not sure about that. You can ask about our services, contact info, proposals, cloud, e-commerce, or dashboards. Or visit our Contact page.";
    }

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        chatbotInput.value = '';

        // Show typing then respond
        showTyping();
        setTimeout(() => {
            hideTyping();
            const response = getBotResponse(message);
            addBotMessage(response);
        }, 1000);
    }

    // Event: Send button
    chatbotSend.addEventListener('click', sendMessage);

    // Event: Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Event: Quick reply buttons
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const msg = btn.getAttribute('data-msg');
            if (msg) {
                addUserMessage(msg);
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    const response = getBotResponse(msg);
                    addBotMessage(response);
                }, 1000);
            }
        });
    });
});