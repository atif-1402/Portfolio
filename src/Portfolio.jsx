import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { FaGithub, FaReddit } from 'react-icons/fa';
import { useEffect, useRef } from "react";

// Falling dots animation with cursor ripple effect
function FallingDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Reduced number of dots for less crowded effect
    const dots = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 2,
      speed: 0.5 + Math.random() * 1.2,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2, // for subtle rotation effect
      angularSpeed: (Math.random() - 0.5) * 0.02
    }));

    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.7)";

      dots.forEach((dot) => {
        ctx.save();
        ctx.translate(dot.x, dot.y);
        ctx.rotate(dot.angle);
        ctx.beginPath();
        ctx.arc(0, 0, dot.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        dot.y += dot.speed + dot.vy;
        dot.x += dot.vx;
        dot.angle += dot.angularSpeed; // subtle rotation animation

        if (dot.y > canvas.height) {
          dot.y = -5;
          dot.x = Math.random() * canvas.width;
          dot.vx = 0;
          dot.vy = 0;
        }

        if (mouse.x && mouse.y) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 80) {
            const force = (80 - dist) / 20;
            dot.vx += dx/dist * force;
            dot.vy += dy/dist * force;
          }
        }

        dot.vx *= 0.92;
        dot.vy *= 0.92;
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-mono relative p-12 flex flex-col items-start justify-start space-y-12">
      <FallingDots />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full text-left z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-6"
        >
          <TerminalSquare className="w-14 h-14 mr-3" />
          <h1 className="text-4xl font-bold tracking-tight">Hi, I'm <span className="text-white">Atif</span></h1>
        </motion.div>

        <div className="mt-10 text-lg text-gray-400 mb-8 leading-relaxed space-y-2">
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>• I create clean and minimal themes for Arch Linux, Hyprland, and Omarchy.</motion.p>
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>• I design custom setups using CSS, JSONC, and Aether — all crafted in VS Code.</motion.p>
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>• I love exploring new design ideas and building simple, functional, visually pleasing setups.</motion.p>
        </div>

        <div className="space-y-1 font-mono text-green-400 mb-8">
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>{">"} <a href="https://github.com/atif-1402?tab=repositories" target="_blank">Omarchy Themes</a></motion.p>
          <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9 }}>{">"} <a href="https://github.com/atif-1402/minimal-waybar-omarchy" target="_blank">Waybar Themes</a></motion.p>
        </div>

        <div className="flex space-x-4 text-2xl">
          <motion.a href="https://github.com/atif-1402" target="_blank" whileHover={{ scale: 1.2 }} className="transition-transform text-gray-400 hover:text-white"><FaGithub /></motion.a>
          <motion.a href="https://www.reddit.com/user/Desperate_Lion5740/" target="_blank" whileHover={{ scale: 1.2 }} className="transition-transform text-gray-400 hover:text-white"><FaReddit /></motion.a>
        </div>
      </motion.div>
    </div>
  );
}
