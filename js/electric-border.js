/**
 * Electric Border - Vanilla JS Implementation
 * Wrap elements with animated electric borders.
 */

class ElectricBorder {
    constructor(element, options = {}) {
        this.element = element;
        this.color = options.color || '#5227FF';
        this.speed = options.speed || 1;
        this.chaos = options.chaos || 0.12;
        this.borderRadius = options.borderRadius || 24;
        
        this.time = 0;
        this.lastFrameTime = performance.now();
        this.animationRef = null;
        
        this.init();
    }

    // Noise functions
    random(x) {
        return (Math.sin(x * 12.9898) * 43758.5453) % 1;
    }

    noise2D(x, y) {
        const i = Math.floor(x);
        const j = Math.floor(y);
        const fx = x - i;
        const fy = y - j;

        const a = this.random(i + j * 57);
        const b = this.random(i + 1 + j * 57);
        const c = this.random(i + (j + 1) * 57);
        const d = this.random(i + 1 + (j + 1) * 57);

        const ux = fx * fx * (3.0 - 2.0 * fx);
        const uy = fy * fy * (3.0 - 2.0 * fy);

        return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }

    octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
        let y = 0;
        let amplitude = baseAmplitude;
        let frequency = baseFrequency;

        for (let i = 0; i < octaves; i++) {
            let octaveAmplitude = amplitude;
            if (i === 0) {
                octaveAmplitude *= baseFlatness;
            }
            y += octaveAmplitude * this.noise2D(frequency * x + seed * 100, time * frequency * 0.3);
            frequency *= lacunarity;
            amplitude *= gain;
        }

        return y;
    }

    getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
        const angle = startAngle + progress * arcLength;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    }

    getRoundedRectPoint(t, left, top, width, height, radius) {
        const straightWidth = width - 2 * radius;
        const straightHeight = height - 2 * radius;
        const cornerArc = (Math.PI * radius) / 2;
        const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
        const distance = t * totalPerimeter;

        let accumulated = 0;

        // Top edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + radius + progress * straightWidth, y: top };
        }
        accumulated += straightWidth;

        // Top-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Right edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left + width, y: top + radius + progress * straightHeight };
        }
        accumulated += straightHeight;

        // Bottom-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Bottom edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + width - radius - progress * straightWidth, y: top + height };
        }
        accumulated += straightWidth;

        // Bottom-left corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        // Left edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left, y: top + height - radius - progress * straightHeight };
        }
        accumulated += straightHeight;

        // Top-left corner
        const progress = (distance - accumulated) / cornerArc;
        return this.getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }

    init() {
        // Create container structure
        this.element.style.position = 'relative';
        
        // Wrap original content if not already wrapped
        if (!this.element.querySelector('.eb-content')) {
            const content = document.createElement('div');
            content.className = 'eb-content';
            content.style.position = 'relative';
            content.style.zIndex = '2';
            content.style.height = '100%';
            
            while (this.element.firstChild) {
                content.appendChild(this.element.firstChild);
            }
            this.element.appendChild(content);
        }

        // Add glow layers
        const layers = document.createElement('div');
        layers.className = 'eb-layers';
        layers.innerHTML = `
            <div class="eb-glow-1" style="background: radial-gradient(circle at 50% 50%, ${this.color}40 0%, transparent 60%);"></div>
            <div class="eb-glow-2" style="background: radial-gradient(circle at 50% 50%, ${this.color}20 0%, transparent 70%);"></div>
        `;
        this.element.appendChild(layers);

        // Add canvas
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'eb-canvas-container';
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'eb-canvas';
        canvasContainer.appendChild(this.canvas);
        this.element.appendChild(canvasContainer);

        this.ctx = this.canvas.getContext('2d');
        
        // Configuration
        this.octaves = 10;
        this.lacunarity = 1.6;
        this.gain = 0.7;
        this.amplitude = this.chaos;
        this.frequency = 10;
        this.baseFlatness = 0;
        this.displacement = 14; // Aumentado de 10 para deixar o raio mais irregular e pontiagudo
        this.borderOffset = 15;

        // Start animation
        this.updateSize();
        
        // Create ResizeObserver
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(() => this.updateSize());
            this.resizeObserver.observe(this.element);
        } else {
            window.addEventListener('resize', () => this.updateSize());
        }

        this.drawElectricBorder = this.drawElectricBorder.bind(this);
        this.animationRef = requestAnimationFrame(this.drawElectricBorder);
    }

    updateSize() {
        const rect = this.element.getBoundingClientRect();
        const width = rect.width + this.borderOffset * 2;
        const height = rect.height + this.borderOffset * 2;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(dpr, dpr);

        this.width = width;
        this.height = height;
        this.lastDpr = dpr;
    }

    drawElectricBorder(currentTime) {
        if (!this.canvas || !this.ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (dpr !== this.lastDpr) {
            this.updateSize();
        }

        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.time += deltaTime * this.speed;
        this.lastFrameTime = currentTime;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(dpr, dpr);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 3.5; // Ainda mais espesso e visível
        this.ctx.shadowBlur = 15; // Brilho no próprio canvas mais forte
        this.ctx.shadowColor = this.color;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const scale = this.displacement;
        const left = this.borderOffset;
        const top = this.borderOffset;
        const borderWidth = this.width - 2 * this.borderOffset;
        const borderHeight = this.height - 2 * this.borderOffset;
        const maxRadius = Math.min(borderWidth, borderHeight) / 2;
        const radius = Math.min(this.borderRadius, maxRadius);

        const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
        const sampleCount = Math.floor(approximatePerimeter / 2);

        this.ctx.beginPath();

        for (let i = 0; i <= sampleCount; i++) {
            const progress = i / sampleCount;

            const point = this.getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

            const xNoise = this.octavedNoise(
                progress * 8,
                this.octaves,
                this.lacunarity,
                this.gain,
                this.amplitude,
                this.frequency,
                this.time,
                0,
                this.baseFlatness
            );

            const yNoise = this.octavedNoise(
                progress * 8,
                this.octaves,
                this.lacunarity,
                this.gain,
                this.amplitude,
                this.frequency,
                this.time,
                1,
                this.baseFlatness
            );

            const displacedX = point.x + xNoise * scale;
            const displacedY = point.y + yNoise * scale;

            if (i === 0) {
                this.ctx.moveTo(displacedX, displacedY);
            } else {
                this.ctx.lineTo(displacedX, displacedY);
            }
        }

        this.ctx.closePath();
        this.ctx.stroke();

        this.animationRef = requestAnimationFrame(this.drawElectricBorder);
    }
}

// Inicializar todas as classes .card
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        // Ignorar se já foi inicializado
        if (card.querySelector('.eb-content')) return;

        card.style.borderRadius = '16px';
        
        let color = '#ff1111'; // Padrão: vermelho intenso
        
        // Mapear as cores baseadas nas classes originais dos cards
        if (card.classList.contains('red-card')) color = '#ff1111';
        else if (card.classList.contains('blue-card')) color = '#00aaff';
        else if (card.classList.contains('orange-card')) color = '#ff8800';
        else if (card.classList.contains('green-card')) color = '#00ff44';
        else if (card.classList.contains('yellow-card') || card.innerHTML.toLowerCase().includes('mérito') || card.innerHTML.toLowerCase().includes('merito')) color = '#ffdd00';
        else if (card.classList.contains('purple-card')) color = '#a855f7';
        else if (card.classList.contains('gray-card')) color = '#aaaaaa';

        new ElectricBorder(card, { color, chaos: 0.4, speed: 2, borderRadius: 16 });
    });
});
