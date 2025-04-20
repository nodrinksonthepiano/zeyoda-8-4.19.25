// DOM Elements
const featuredVideo = document.getElementById('featured-video');
const playButton = document.getElementById('play-button');
const orbitContainer = document.querySelector('.orbit-container');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// App State
const state = {
    videoPlaying: false,
    authenticated: false,
    walletCreated: false,
    artistockMinted: false,
    messages: []
};

// Token Data (Placeholders for future content)
const tokens = [
    { id: 1, name: 'Void' },
    { id: 2, name: 'Nomad' },
    { id: 3, name: 'EchoSpace' },
    { id: 4, name: 'Stardust' },
    { id: 5, name: 'Nebula' }
];

// Initialize the app
function init() {
    createOrbitingTokens();
    setupEventListeners();
    
    // Simulate initial chat after page load
    setTimeout(() => {
        addSystemMessage("✨ This unlocks a rare GOSHEESH track.", true);
        
        setTimeout(() => {
            addAuthButtons();
        }, 500);
    }, 2000);

    // Set up particle animation
    createParticles();
}

// Create orbiting tokens with animation
function createOrbitingTokens() {
    tokens.forEach((token, index) => {
        const tokenElement = document.createElement('div');
        tokenElement.classList.add('token');
        tokenElement.setAttribute('data-id', token.id);
        tokenElement.textContent = token.name;
        orbitContainer.appendChild(tokenElement);

        // Set initial position
        const angle = (index / tokens.length) * Math.PI * 2;
        positionTokenAtAngle(tokenElement, angle);
    });

    // Start animation
    animateOrbit();
}

// Position token at specific angle on orbit
function positionTokenAtAngle(tokenElement, angle) {
    const orbitRadius = orbitContainer.clientWidth / 2 - 30;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;
    
    tokenElement.style.transform = `translate(${x}px, ${y}px)`;
}

// Animate orbiting tokens
function animateOrbit() {
    let angle = 0;
    const speed = 0.0005; // Controls orbit speed
    
    function animate() {
        angle += speed;
        
        const tokenElements = document.querySelectorAll('.token');
        tokenElements.forEach((tokenElement, index) => {
            const tokenAngle = angle + (index / tokens.length) * Math.PI * 2;
            positionTokenAtAngle(tokenElement, tokenAngle);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Create background particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'white';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `stars-movement ${20 + Math.random() * 80}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Video play/pause functionality
    playButton.addEventListener('click', toggleVideo);
    featuredVideo.addEventListener('click', toggleVideo);
    
    // When video ends, show play button again
    featuredVideo.addEventListener('ended', () => {
        playButton.style.display = 'flex';
    });
}

// Toggle video play/pause
function toggleVideo() {
    if (featuredVideo.paused) {
        featuredVideo.play();
        playButton.style.display = 'none';
        state.videoPlaying = true;
    } else {
        featuredVideo.pause();
        playButton.style.display = 'flex';
        state.videoPlaying = false;
    }
}

// Chat functionality
function addSystemMessage(text, isImportant = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'system');
    messageElement.innerHTML = text;
    
    if (isImportant) {
        messageElement.style.fontWeight = '500';
        messageElement.style.fontSize = '16px';
    }
    
    chatMessages.prepend(messageElement);
    state.messages.push({ type: 'system', text });
    
    // Restore opacity when in view
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });
    
    messageObserver.observe(messageElement);
    
    return messageElement;
}

// Add authentication buttons
function addAuthButtons() {
    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('message', 'buttons');
    
    const buttonTextContent = `
        <div>Choose how you'd like to support the artist and claim it:</div>
        <div class="message-button" data-auth="google">Continue with Google</div>
        <div class="message-button" data-auth="facebook">Continue with Facebook</div>
        <div class="message-button" data-auth="twitter">Continue with X (Twitter)</div>
        <div class="message-button" data-auth="phone">Continue with Phone Number</div>
        <div class="message-button" data-auth="email">Continue with Email</div>
    `;
    
    buttonsElement.innerHTML = buttonTextContent;
    chatMessages.prepend(buttonsElement);
    
    // Add event listeners to buttons
    const authButtons = buttonsElement.querySelectorAll('.message-button');
    authButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const authMethod = e.target.getAttribute('data-auth');
            handleAuthentication(authMethod);
        });
    });
}

// Handle authentication
function handleAuthentication(method) {
    // Simulate authentication process
    addSystemMessage(`Authenticating with ${method}...`);
    
    setTimeout(() => {
        state.authenticated = true;
        addSystemMessage("✅ You're in. Creating your secure wallet...");
        
        // Simulate wallet creation
        setTimeout(() => {
            state.walletCreated = true;
            addSystemMessage("✅ Wallet created. Now show support to add GOSHEESH to your orbit.");
            
            // Show payment options
            setTimeout(() => {
                addPaymentOptions();
            }, 1000);
        }, 1500);
    }, 1500);
}

// Add payment options
function addPaymentOptions() {
    const paymentElement = document.createElement('div');
    paymentElement.classList.add('message', 'buttons');
    
    const paymentButtons = `
        <div>Choose your payment method:</div>
        <div class="payment-buttons">
            <div class="payment-button" data-payment="venmo">Pay $5 with Venmo</div>
            <div class="payment-button" data-payment="paypal">PayPal</div>
            <div class="payment-button" data-payment="card">Card</div>
            <div class="payment-button" data-payment="crypto">Crypto</div>
        </div>
    `;
    
    paymentElement.innerHTML = paymentButtons;
    chatMessages.prepend(paymentElement);
    
    // Add event listeners to buttons
    const buttons = paymentElement.querySelectorAll('.payment-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const paymentMethod = e.target.getAttribute('data-payment');
            processPayment(paymentMethod);
        });
    });
}

// Process payment
function processPayment(method) {
    // Simulate payment process
    addSystemMessage(`Processing payment with ${method}...`);
    
    setTimeout(() => {
        addSystemMessage("✅ Payment received. Minting your coin...");
        
        // Simulate minting process
        setTimeout(() => {
            state.artistockMinted = true;
            addSystemMessage("✅ Artistock minted. GOSHEESH is now in your orbit.");
            addSystemMessage("You now own this track forever.");
            
            // Add follow-up options
            setTimeout(() => {
                addFollowUpOptions();
            }, 1000);
            
            // Play the video
            if (!state.videoPlaying) {
                toggleVideo();
            }
        }, 2000);
    }, 2000);
}

// Add follow-up options after successful minting
function addFollowUpOptions() {
    const optionsElement = document.createElement('div');
    optionsElement.classList.add('message', 'buttons');
    
    const optionsContent = `
        <div class="message-button" id="play-again">▶️ Watch Again</div>
        <div class="message-button" id="spotify-follow">🎧 Follow on Spotify</div>
        <div class="message-button" id="explore-more">🌌 Explore More Artists</div>
    `;
    
    optionsElement.innerHTML = optionsContent;
    chatMessages.prepend(optionsElement);
    
    // Add event listeners
    document.getElementById('play-again').addEventListener('click', () => {
        featuredVideo.currentTime = 0;
        if (!state.videoPlaying) {
            toggleVideo();
        }
    });
    
    document.getElementById('spotify-follow').addEventListener('click', () => {
        window.open('https://open.spotify.com/artist/spotify-id-here', '_blank');
    });
    
    document.getElementById('explore-more').addEventListener('click', () => {
        addSystemMessage("More artists coming soon to ZEYODA!");
    });
}

// Initialize app on load
window.addEventListener('load', init); 