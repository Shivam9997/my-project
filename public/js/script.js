// ========================================
// BOOTSTRAP FORM VALIDATION
// ========================================
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading spinner
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.classList.add('hidden');
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  // Add shadow when scrolled
  if (currentScroll > 50) {
    navbar?.classList.add('scrolled')
  } else {
    navbar?.classList.remove('scrolled')
  }

  lastScroll = currentScroll
})

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        
        // Add fade-in effect
        img.style.opacity = '0'
        img.style.transition = 'opacity 0.5s ease-in'
        
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
        }
        
        img.addEventListener('load', () => {
          img.style.opacity = '1'
        })
        
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })
}

// ========================================
// CARD STAGGER ANIMATION
// ========================================
const animateCards = () => {
  const cards = document.querySelectorAll('.listing-card')
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }, index * 100) // Stagger effect
        cardObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  cards.forEach(card => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    cardObserver.observe(card)
  })
}

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateCards)
} else {
  animateCards()
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
const createBackToTop = () => {
  const backToTopButton = document.createElement('button')
  backToTopButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'
  backToTopButton.className = 'back-to-top'
  backToTopButton.setAttribute('aria-label', 'Back to top')
  
  // Add styles
  const style = document.createElement('style')
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #fe424d 0%, #e63946 100%);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(254, 66, 77, 0.3);
      z-index: 999;
    }
    
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .back-to-top:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(254, 66, 77, 0.4);
    }
    
    .back-to-top:active {
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .back-to-top {
        width: 45px;
        height: 45px;
        bottom: 20px;
        right: 20px;
      }
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(backToTopButton)
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible')
    } else {
      backToTopButton.classList.remove('visible')
    }
  })
  
  // Scroll to top on click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

createBackToTop()

// ========================================
// LOADING SPINNER
// ========================================
const showLoadingSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'loading-spinner'
  spinner.innerHTML = `
    <div class="spinner-ring"></div>
  `
  
  const style = document.createElement('style')
  style.textContent = `
    .loading-spinner {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    .loading-spinner.hidden {
      opacity: 0;
      pointer-events: none;
    }
    
    .spinner-ring {
      width: 60px;
      height: 60px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #fe424d;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  
  document.head.appendChild(style)
  document.body.appendChild(spinner)
  
  // Hide spinner after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      spinner.classList.add('hidden')
      setTimeout(() => spinner.remove(), 300)
    }, 500)
  })
}

// Only show spinner if page is still loading
if (document.readyState === 'loading') {
  showLoadingSpinner()
}

// ========================================
// SEARCH INPUT ENHANCEMENT
// ========================================
const searchInput = document.querySelector('.search-input')
if (searchInput) {
  searchInput.addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)'
    this.style.boxShadow = '0 4px 12px rgba(254, 66, 77, 0.15)'
  })
  
  searchInput.addEventListener('blur', function() {
    this.style.transform = 'scale(1)'
    this.style.boxShadow = 'none'
  })
  
  // Add transition
  searchInput.style.transition = 'all 0.3s ease'
}

// ========================================
// CARD HOVER SOUND EFFECT (Optional)
// ========================================
const cards = document.querySelectorAll('.listing-card')
cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.willChange = 'transform'
  })
  
  card.addEventListener('mouseleave', function() {
    this.style.willChange = 'auto'
  })
})

// ========================================
// PARALLAX EFFECT FOR SHOW PAGE IMAGE
// ========================================
const showImg = document.querySelector('.show-img')
if (showImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * 0.3
    showImg.style.transform = `translateY(${rate}px)`
  })
}

// ========================================
// RIPPLE EFFECT FOR BUTTONS
// ========================================
const createRipple = (event) => {
  const button = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add('ripple')

  const ripple = button.getElementsByClassName('ripple')[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Add ripple effect style
const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// Apply ripple to all buttons
document.querySelectorAll('button, .btn').forEach(button => {
  button.addEventListener('click', createRipple)
})

// ========================================
// NOTIFICATION TOAST (for flash messages)
// ========================================
const enhanceFlashMessages = () => {
  const alerts = document.querySelectorAll('.alert')
  alerts.forEach((alert, index) => {
    // Animate in
    setTimeout(() => {
      alert.style.opacity = '1'
      alert.style.transform = 'translateY(0)'
    }, index * 100)
    
    // Add transition
    alert.style.opacity = '0'
    alert.style.transform = 'translateY(-20px)'
    alert.style.transition = 'all 0.4s ease'
  })
}

enhanceFlashMessages()

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Skip to main content link
const createSkipLink = () => {
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.className = 'skip-link'
  skipLink.textContent = 'Skip to main content'
  
  const style = document.createElement('style')
  style.textContent = `
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #fe424d;
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      z-index: 10000;
      transition: top 0.3s;
    }
    
    .skip-link:focus {
      top: 0;
    }
  `
  document.head.appendChild(style)
  document.body.insertBefore(skipLink, document.body.firstChild)
}

createSkipLink()

// Add main content ID to container
const container = document.querySelector('.container')
if (container && !container.id) {
  container.id = 'main-content'
}

console.log('✨ WanderLust - Enhanced UI Loaded Successfully!')
