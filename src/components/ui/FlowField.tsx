import { useEffect, useRef } from 'react';

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ 
    x: 0, 
    y: 0, 
    targetX: 0, 
    targetY: 0, 
    active: false,
    strength: 0 
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update mouse interpolated position
      const mouse = mouseRef.current;
      const targetStrength = mouse.active ? 1 : 0;
      mouse.strength += (targetStrength - mouse.strength) * 0.08;
      
      if (mouse.active || mouse.strength > 0.01) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      }

      ctx.lineWidth = 0.4;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + mouse.strength * 0.15})`; // Slightly brighten on hover
      
      const lineSpacing = 6;
      const step = 8;
      const noiseScale = 0.0035;
      
      for (let y = -200; y < height + 200; y += lineSpacing) {
        ctx.beginPath();
        
        for (let x = -step; x <= width + step; x += step) {
          let xOffset = x * noiseScale;
          let yOffset = y * noiseScale;
          
          let distortion = 
            Math.sin(xOffset * 1.5 + time * 0.4) * 80 +
            Math.sin(yOffset * 1.2 - time * 0.3) * 50 +
            Math.sin((xOffset * 2 + yOffset * 1.5) * 3 + time * 0.5) * 30 +
            Math.cos(xOffset * 0.5 - time * 0.2) * 40;

          // Mouse interaction with lerped position and strength
          if (mouse.strength > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const radius = 350;
            
            if (distSq < radius * radius) {
              const dist = Math.sqrt(distSq);
              const power = Math.pow((radius - dist) / radius, 2); // Sharper falloff at edge, smoother in center
              
              // Organic warp
              distortion += (dy / (dist + 1)) * power * 150 * mouse.strength;
            }
          }

          if (x === -step) {
            ctx.moveTo(x, y + distortion);
          } else {
            ctx.lineTo(x, y + distortion);
          }
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      time += 0.01;
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
}
