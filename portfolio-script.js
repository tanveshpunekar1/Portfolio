// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function() {
  nav.classList.toggle('active');
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    nav.classList.remove('active');
  });
});

// Scroll reveal - elements appear as they come into view
const scrollElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  const elementHeight = el.offsetHeight;
  
  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
  );
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 80)) {
      el.classList.add('scrolled');
    }
  });
};

// Listen for scroll events
window.addEventListener('scroll', () => {
  handleScrollAnimation();
});

// Check on load as well
window.addEventListener('load', () => {
  handleScrollAnimation();
});

// Animation for typing effect
const textElement = document.querySelector('.tagline');
const text = "I build interactive web experiences";

let charIndex = 0;
function typeText() {
  if (charIndex < text.length && textElement) {
    textElement.textContent = text.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeText, 100);
  }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  if (textElement) {
    textElement.textContent = '';
    setTimeout(typeText, 1000);
  }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Normally would send to a server, but for demo purposes just simulate submission
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Change button text to show loading
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    
    // Simulate server request
    setTimeout(() => {
      // Reset form
      this.reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      // Show success message
      alert("Thanks for your message! I'll get back to you soon.");
    }, 1500);
  });
}

// 3D Experience section effects
document.addEventListener('DOMContentLoaded', function() {
  const experienceSection = document.querySelector('#experience');
  
  if (experienceSection) {
    // Create 3D elements for the experience section
    const createExperienceElements = () => {
      const orbitEl = document.querySelector('.orbit');
      if (!orbitEl) return;
      
      // Create planets with random sizes and animations
      for (let i = 0; i < 5; i++) {
        const planet = document.createElement('div');
        planet.className = `planet planet-${i}`;
        
        // Apply random styles and animations
        const size = 20 + Math.random() * 40;
        const animationDuration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const color = i % 2 === 0 ? '#0EA5E9' : '#8B5CF6';
        
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.backgroundColor = color;
        planet.style.animation = `planetMove ${animationDuration}s infinite ${delay}s`;
        
        orbitEl.appendChild(planet);
      }
    };
    
    createExperienceElements();
    
    // Add parallax effect to the experience section
    window.addEventListener('scroll', function() {
      const offset = window.pageYOffset;
      const planets = document.querySelectorAll('.planet');
      
      planets.forEach((planet, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = offset * speed;
        planet.style.transform = `translateY(${-yPos}px) rotate(${yPos * 0.2}deg)`;
      });
    });
  }
  
  // Social media hover effects
  const socialLinks = document.querySelectorAll('.social-icons a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    link.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

// Add social media icons hover effect styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes planetMove {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(50px, 20px); }
    50% { transform: translate(0, 50px); }
    75% { transform: translate(-30px, 20px); }
  }
  
  .social-icons a {
    transition: all 0.3s ease;
  }
  
  .social-icons a:hover {
    box-shadow: 0 0 15px rgba(14, 165, 233, 0.7);
  }
  
  .social-icons a:nth-child(1):hover {
    background-color: #171515; /* GitHub */
  }
  
  .social-icons a:nth-child(2):hover {
    background-color: #0077B5; /* LinkedIn */
  }
  
  .social-icons a:nth-child(3):hover {
    background-color: #E4405F; /* Instagram */
  }
  
  .social-icons a:nth-child(4):hover {
    background-color: #1877F2; /* Facebook */
  }
  
  .social-icons a:nth-child(5):hover {
    background-color: #1DA1F2; /* Twitter/X */
  }
`;
document.head.appendChild(styleSheet);
