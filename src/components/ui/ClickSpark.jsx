"use client";

import { useRef, useEffect, useCallback } from 'react';
import './ClickSpark.css';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  global = false,
  className = '',
  style = {},
  onClick = undefined,
  children = null,
  ...props
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      if (global) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        return;
      }

      const parent = canvas.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    let ro;
    if (global) {
      window.addEventListener('resize', handleResize);
    } else {
      const parent = canvas.parentElement;
      if (parent) {
        ro = new ResizeObserver(handleResize);
        ro.observe(parent);
      }
    }

    resizeCanvas();

    return () => {
      if (ro) ro.disconnect();
      if (global) window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [global]);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;

    const draw = timestamp => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationId = requestAnimationFrame(draw);
      } else {
        startTimeRef.current = null;
        animatingRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animatingRef.current = true;
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  const addSparks = useCallback((x, y) => {
    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);

    if (!animatingRef.current) {
      startAnimation();
    }
  }, [sparkCount, startAnimation]);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addSparks(x, y);

    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    if (!global) return;

    const handleWindowClick = e => {
      addSparks(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleWindowClick, { capture: true });

    return () => {
      window.removeEventListener('click', handleWindowClick, { capture: true });
    };
  }, [global, addSparks]);

  if (global) {
    return (
      <canvas
        ref={canvasRef}
        className={`click-spark-canvas click-spark-global ${className}`.trim()}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          userSelect: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          ...style
        }}
        {...props}
      />
    );
  }

  return (
    <div
      className={`click-spark-container ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style
      }}
      onClick={handleClick}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="click-spark-canvas"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
