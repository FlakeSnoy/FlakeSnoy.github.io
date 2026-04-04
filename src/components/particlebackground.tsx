import { useEffect, useRef } from 'react';

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  angle: number;
  spin: number;
}

function drawSnowflake(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number, opacity: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = r * 0.12;
  ctx.lineCap = 'round';

  const arms = 6;
  for (let i = 0; i < arms; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / arms);
    // Main arm
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r);
    ctx.stroke();
    // Side branches
    const b = r * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.5);
    ctx.lineTo(b * 0.6, -r * 0.5 - b * 0.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.5);
    ctx.lineTo(-b * 0.6, -r * 0.5 - b * 0.6);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let flakes: Flake[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 10 + 4,
        speed: Math.random() * 0.4 + 0.15,
        drift: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.12 + 0.04,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
      }));
    };

    init();
    window.addEventListener('resize', init);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const f of flakes) {
        drawSnowflake(ctx, f.x, f.y, f.r, f.angle, f.opacity);
        f.y += f.speed;
        f.x += f.drift;
        f.angle += f.spin;
        if (f.y > canvas.height + f.r * 2) {
          f.y = -f.r * 2;
          f.x = Math.random() * canvas.width;
        }
        if (f.x < -f.r * 2) f.x = canvas.width + f.r;
        if (f.x > canvas.width + f.r * 2) f.x = -f.r;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}