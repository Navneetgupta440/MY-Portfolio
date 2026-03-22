const canvas = document.getElementById("bgCanvas");
if (!canvas) {
    console.error("Canvas element not found");
} else {
    const ctx = canvas.getContext("2d");
    
    // Responsive canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let nodes = [];

    function initNodes() {
        nodes = [];
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2
            });
        }
    }
    initNodes();
    window.addEventListener("resize", initNodes);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];

            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#60a5fa";
            ctx.fill();

            for (let j = i + 1; j < nodes.length; j++) {
                let m = nodes[j];
                let dist = Math.hypot(n.x - m.x, n.y - m.y);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(m.x, m.y);
                    ctx.strokeStyle = "rgba(96,165,250,0.2)";
                    ctx.stroke();
                }
            }

            n.x += n.dx;
            n.y += n.dy;

            if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Smooth scroll with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});