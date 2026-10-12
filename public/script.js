const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const sparkleCanvas = document.querySelector(".sparkle-canvas");

if (
  sparkleCanvas instanceof HTMLCanvasElement &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const context = sparkleCanvas.getContext("2d");

  if (context) {
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.7 + Math.random() * 1.3,
      speed: 0.00012 + Math.random() * 0.00025,
      drift: (Math.random() - 0.5) * 0.00008,
      phase: Math.random() * Math.PI * 2,
      shimmer: 0.5 + Math.random() * 0.5,
      sparkle: Math.random() > 0.78,
    }));
    let animationFrame;
    let lastFrameTime = 0;

    function resizeCanvas() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      sparkleCanvas.width = Math.round(window.innerWidth * pixelRatio);
      sparkleCanvas.height = Math.round(window.innerHeight * pixelRatio);
      sparkleCanvas.style.width = `${window.innerWidth}px`;
      sparkleCanvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function drawFrame(time) {
      if (document.hidden) {
        animationFrame = undefined;
        return;
      }

      const elapsed = Math.min(time - lastFrameTime, 50);
      lastFrameTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.y += particle.speed * elapsed;
        particle.x += particle.drift * elapsed;
        particle.phase += elapsed * 0.001;

        if (particle.y > 1.02) {
          particle.y = -0.02;
          particle.x = Math.random();
        }
        if (particle.x < -0.02) particle.x = 1.02;
        if (particle.x > 1.02) particle.x = -0.02;

        const x = particle.x * window.innerWidth;
        const y = particle.y * window.innerHeight;
        const alpha = Math.min(0.9, (0.42 + (Math.sin(particle.phase) + 1) * 0.24) * particle.shimmer);

        context.beginPath();
        context.fillStyle = `rgba(255, 220, 145, ${alpha})`;
        context.arc(x, y, particle.radius * 1.2, 0, Math.PI * 2);
        context.fill();

        if (particle.sparkle) {
          context.strokeStyle = `rgba(255, 239, 196, ${alpha * 0.85})`;
          context.lineWidth = 0.9;
          context.beginPath();
          context.moveTo(x - particle.radius * 2.2, y);
          context.lineTo(x + particle.radius * 2.2, y);
          context.moveTo(x, y - particle.radius * 2.2);
          context.lineTo(x, y + particle.radius * 2.2);
          context.stroke();
        }
      });

      animationFrame = window.requestAnimationFrame(drawFrame);
    }

    function startAnimation() {
      if (!document.hidden && animationFrame === undefined) {
        lastFrameTime = performance.now();
        animationFrame = window.requestAnimationFrame(drawFrame);
      }
    }

    function stopAnimation() {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }

    resizeCanvas();
    startAnimation();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}
