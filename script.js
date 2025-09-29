// Smooth scroll and basic interactions for Stake Guide
document.addEventListener("DOMContentLoaded", function () {
  // Update current year in footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
  
  // Smooth scrolling for anchor links
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = 80;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Promo code copy functionality
  const promoCodeElements = document.querySelectorAll('.promo-code-display');
  promoCodeElements.forEach((element) => {
    element.style.cursor = 'pointer';
    element.title = '클릭하여 코드 복사';
    
    element.addEventListener('click', function() {
      const codeText = 'AAKK';
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(codeText).then(() => {
          const originalText = this.innerHTML;
          this.innerHTML = '✅ 코드가 복사되었습니다!';
          this.style.background = 'rgba(76, 175, 80, 0.3)';
          
          setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = 'rgba(255,255,255,0.2)';
          }, 2000);
        }).catch(() => {
          fallbackCopyText(codeText);
        });
      } else {
        fallbackCopyText(codeText);
      }
    });
  });
  
  // Fallback copy function for older browsers
  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('프로모 코드 AAKK가 복사되었습니다!');
    } catch (err) {
      alert('코드를 복사할 수 없습니다. 수동으로 입력해주세요: AAKK');
    }
    
    document.body.removeChild(textArea);
  }

  // Add lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    images.forEach(img => {
      img.src = img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Simple back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s;
    display: none;
  `;
  
  document.body.appendChild(backToTopButton);
  
  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
      }, 10);
    } else {
      backToTopButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'none';
      }, 300);
    }
  });
  
  // Back to top functionality
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});