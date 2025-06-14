import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Не удалось получить контекст 2D из canvas');
      return;
    }

    // Устанавливаем размеры canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const colors = [
      'rgba(41, 128, 185, 0.5)',
      'rgba(52, 152, 219, 0.4)',
      'rgba(26, 188, 156, 0.3)',
      'rgba(22, 160, 133, 0.4)'
    ];

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor(canvas: HTMLCanvasElement) {
        this.radius = Math.random() * 5 + 2;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
    }

    // Создаем частицы
    const particles: Particle[] = Array(50)
      .fill(null)
      .map(() => new Particle(canvas));

    // Функция анимации
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(canvas);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    // Запускаем анимацию
    animate();

    // Обработчик изменения размера окна
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        width: '100vw', 
        height: '100vh'
      }} 
    />
  );
};

export default AnimatedBackground;