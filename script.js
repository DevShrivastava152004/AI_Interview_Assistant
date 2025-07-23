// Global variables
let apiKey = '';
let chatHistory = [];
let isTyping = false;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if API key exists in session storage
    const savedKey = sessionStorage.getItem('openai_api_key');
    if (savedKey) {
        apiKey = savedKey;
    }
});

// Demo functions
function startDemo() {
    const demoText = document.getElementById('demo-text');
    demoText.innerHTML = "Great! Let's start with a simple question. Try asking the AI Interview Coach below about common interview questions!";
    
    // Open chatbot
    toggleChat();
}

function startMockInterview() {
    const demoText = document.getElementById('demo-text');
    demoText.innerHTML = "Perfect! Use the AI Interview Coach chatbot to start your mock interview. Ask for industry-specific questions or general interview tips!";
    
    // Open chatbot and suggest starting an interview
    toggleChat();
    setTimeout(() => {
        addMessage("Let's start a mock interview! What position are you interviewing for? I can provide relevant questions and feedback.", 'bot');
    }, 1000);
}

// Chatbot functions
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.querySelector('.chat-toggle');
    
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'flex';
        chatToggle.style.display = 'none';
        
        // Check if API key is set
        if (!apiKey) {
            showApiModal();
        }
    } else {
        chatbot.style.display = 'none';
        chatToggle.style.display = 'block';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    if (!apiKey) {
        showApiModal();
        return;
    }

    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Send to AI
    sendToAI(message);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'block';
    isTyping = true;
    
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'none';
    isTyping = false;
}

async function sendToAI(message) {
    try {
        // Add to chat history
        chatHistory.push({ role: 'user', content: message });
        
        // Prepare system message for interview coaching context
        const systemMessage = {
            role: 'system',
            content: `You are an expert AI Interview Coach. Your role is to help users prepare for job interviews by:
            
1. Providing common and industry-specific interview questions
2. Offering detailed feedback on answers
3. Giving tips for interview techniques, body language, and communication
4. Helping users practice behavioral questions using the STAR method
5. Providing guidance on salary negotiation and follow-up
6. Offering encouragement and building confidence

Be supportive, professional, and constructive in your responses. Tailor your advice to the user's industry or role when mentioned. Keep responses conversational but informative.`
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [systemMessage, ...chatHistory.slice(-10)], // Keep last 10 messages for context
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Add AI response to history
        chatHistory.push({ role: 'assistant', content: aiResponse });
        
        // Hide typing and show response
        hideTyping();
        
        // Type out the response with animation
        typeResponse(aiResponse);
        
    } catch (error) {
        console.error('Error:', error);
        hideTyping();
        
        let errorMessage = 'Sorry, I encountered an error. ';
        if (error.message.includes('401')) {
            errorMessage += 'Please check your API key.';
            showApiModal();
        } else if (error.message.includes('429')) {
            errorMessage += 'Rate limit exceeded. Please try again in a moment.';
        } else {
            errorMessage += 'Please try again later.';
        }
        
        addMessage(errorMessage, 'bot');
    }
}

function typeResponse(text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            bubbleDiv.textContent += text.charAt(i);
            i++;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            clearInterval(typeInterval);
        }
    }, 30);
}

// API Key Modal functions
function showApiModal() {
    document.getElementById('apiModal').style.display = 'block';
}

function closeApiModal() {
    document.getElementById('apiModal').style.display = 'none';
}

function saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    const key = input.value.trim();
    
    if (key.startsWith('sk-') && key.length > 20) {
        apiKey = key;
        sessionStorage.setItem('openai_api_key', key);
        closeApiModal();
        addMessage("Great! I'm ready to help you with your interview preparation. What would you like to practice?", 'bot');
    } else {
        alert('Please enter a valid OpenAI API key (starts with sk-)');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('apiModal');
    if (event.target === modal) {
        closeApiModal();
    }
}

// Form submission (placeholder)