import { throttle } from './modules/throttle.js';

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu > li');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      const currentActiveMenuItem = document.querySelector('.menu > .active');
      if (currentActiveMenuItem) {
        currentActiveMenuItem.classList.remove('active');
      }
      this.classList.add('active');
      const target = this.dataset.target;
      document.querySelector(`#${target}`).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  let lastScrollY = window.scrollY;

  /**
   * Handles the scroll event and updates the active menu item based on the scroll position.
   */
  function handleScroll() {
    const activeMenuItem = document.querySelector('.menu > .active');
    if (!activeMenuItem) return;
    
    const targetElement = document.querySelector(`#${activeMenuItem.dataset.target}`);
    if (!targetElement) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    const targetBottom = targetRect.y + targetRect.height;
    const targetTop = targetRect.y;

    const scrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    if (scrollingDown && targetBottom < 0) {
      const nextMenuItem = activeMenuItem.nextElementSibling;
      if (nextMenuItem) {
        activeMenuItem.classList.remove('active');
        nextMenuItem.classList.add('active');
      }
    } else if (!scrollingDown && targetTop > 0) {
      const prevMenuItem = activeMenuItem.previousElementSibling;
      if (prevMenuItem) {
        activeMenuItem.classList.remove('active');
        prevMenuItem.classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', throttle(handleScroll, 100));
});
