function slowScrollTo(target, duration = 2000) {
  const start = window.pageYOffset;
  const targetPosition = target.offsetTop;
  const distance = targetPosition - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
	const timeElapsed = currentTime - startTime;
	const progress = Math.min(timeElapsed / duration, 1);

	// Ease-in-out cubic function for smooth motion
	const ease = progress < 0.5 
	  ? 4 * progress * progress * progress 
	  : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

	window.scrollTo(0, start + distance * ease);

	if (timeElapsed < duration) {
	  requestAnimationFrame(animateScroll);
	}
  }

  requestAnimationFrame(animateScroll);
}

// Apply to all navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', function (e) {
	  e.preventDefault();
	  const targetId = this.getAttribute('href');
	  const targetElement = document.querySelector(targetId);
	  if (targetElement) slowScrollTo(targetElement, 1000); // 1-second scroll
	});
  });
});