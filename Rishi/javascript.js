const text = `Welcome to the official site of Computer Science & Design 
Digital Platform and Information Hub! 🙌`; 
const typingText = document.getElementById("typingText");
let index = 0; // Track character index

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 60); // Typing speed
    } else {
        typingText.classList.remove("typing"); // Remove the class that controls cursor visibility
        typingText.style.setProperty('--cursor-opacity', '0'); // Optional: Set cursor opacity to 0
    }
}


type();

// curvy-text
function animateCurvyText() {
    const curvyText = document.querySelector('.curvy-text');
    curvyText.style.opacity = 0;
    curvyText.style.transform = 'translateY(20px)';

    setTimeout(() => {
        curvyText.style.transition = 'all 1s ease';
        curvyText.style.opacity = 1;
        curvyText.style.transform = 'translateY(0)';
    }, 500); // Delay 
}

// Initial animation when the page loads
window.addEventListener('load', () => {
    animateCurvyText();
});

// when "Home" clicked, restart all
document.getElementById("homeLink").addEventListener("click", function (event) {
    event.preventDefault(); 
    loadHomeScreen(); 
});

function loadHomeScreen() {
    typingText.textContent = ''; 
    index = 0; 
    typingText.classList.add("typing"); 
    typingText.style.setProperty('--cursor-opacity', '1'); 
    type(); 

    animateCurvyText();
}

// Detect when the image section is in view
window.addEventListener('scroll', function() {
    const imageSection = document.querySelector('.image-section');
    const circleCard = document.querySelector('.circle-card');
    const rect = imageSection.getBoundingClientRect();
    
    // Check if the image section is in the viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Add the class to trigger the animation
        circleCard.classList.add('circle-visible');
    } 
});

window.addEventListener('scroll', function() {
    var textBox = document.getElementById('textBoxCard');
    var imageSection = document.querySelector('.image-section');
    var sectionPosition = imageSection.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.5;

    if (sectionPosition < screenPosition) {
        textBox.classList.add('active'); // Add 'active' class when in view
    }
});
