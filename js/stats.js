// stats.js
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-num");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 50; // lower = faster

    const updateCount = () => {
      const increment = Math.ceil(target / speed);
      if(count < target) {
        count += increment;
        if(count > target) count = target;
        counter.textContent = count + '+'; // Add the plus sign here
        setTimeout(updateCount, 20);
      }
    };

    updateCount();
  });
});
