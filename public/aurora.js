import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

class AuroraBackground {
    constructor() {
        this.init();
    }

    init() {
        // Hot reload safety: remove existing if any
        if (document.getElementById('aurora-bg')) {
            document.getElementById('aurora-bg').remove();
        }

        // 1. Create and inject canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'aurora-bg';
        
        // 2. Apply styles via JS only
        Object.assign(this.canvas.style, {
            position: 'fixed',
            inset: '0',
            zIndex: '-1',
            pointerEvents: 'none',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            margin: '0',
            padding: '0',
            display: 'block'
        });
        
        // Append as first element inside body
        document.body.insertBefore(this.canvas, document.body.firstChild);

        // 3. Setup Three.js
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
        
        // Handle devicePixelRatio, cap at 2 for performance
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Use orthographic camera for full screen quad
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();

        // 2x2 Plane fills the screen
        this.geometry = new THREE.PlaneGeometry(2, 2);

        this.uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2() }
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uResolution;
            varying vec2 vUv;

            // Hash function
            float hash(vec2 p) {
                p = fract(p * vec2(123.34, 456.21));
                p += dot(p, p + 45.32);
                return fract(p.x * p.y);
            }

            // 2D Value Noise
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                           mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
            }

            // Fractional Brownian Motion (fbm)
            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                for (int i = 0; i < 5; i++) {
                    value += amplitude * noise(p * frequency);
                    // Rotate and scale to reduce lattice artifacts
                    p *= mat2(1.6, 1.2, -1.2, 1.6);
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                return value;
            }

            // Domain Warping for organic fluid flow
            float pattern(vec2 p, out vec2 q, out vec2 r) {
                q.x = fbm(p + vec2(0.0,0.0) + 0.05 * uTime);
                q.y = fbm(p + vec2(5.2,1.3) + 0.02 * uTime);

                r.x = fbm(p + 4.0 * q + vec2(1.7,9.2) + 0.15 * uTime);
                r.y = fbm(p + 4.0 * q + vec2(8.3,2.8) + 0.126 * uTime);

                return fbm(p + 4.0 * r);
            }

            void main() {
                // Correct proportions
                vec2 fragCoord = vUv * uResolution;
                vec2 uv = (fragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
                
                // Scale coordinate space
                uv *= 1.5;

                vec2 q, r;
                float f = pattern(uv, q, r);

                // Deep blue -> Cyan glow palette
                // Base deep blue
                vec3 col = mix(vec3(0.02, 0.05, 0.2), vec3(0.05, 0.2, 0.5), f);
                
                // Cyan plasma highlights where warping intersects
                col = mix(col, vec3(0.1, 0.7, 0.9), dot(r, q) * 0.8);

                // Subtle brightness breathing
                col *= 0.85 + 0.15 * sin(uTime * 0.2);

                // Vignette edges (darken corners)
                float vignette = length(vUv - 0.5);
                vignette = smoothstep(0.8, 0.2, vignette);
                col *= vignette;

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: this.uniforms
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        // Initial sizing
        this.resize();
        
        // Event listeners
        this.onResize = this.resize.bind(this);
        window.addEventListener('resize', this.onResize);

        this.clock = new THREE.Clock();
        this.isPlaying = true;
        
        // Pause animation when tab is not visible
        this.onVisibilityChange = () => {
            if (document.hidden) {
                this.isPlaying = false;
            } else {
                this.isPlaying = true;
                this.clock.getDelta(); // Clear accumulated delta
                this.animate();
            }
        };
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        // Start render loop
        this.animate = this.animate.bind(this);
        this.animate();
    }

    resize() {
        if (!this.renderer) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.uniforms.uResolution.value.set(width, height);
    }

    animate() {
        if (!this.isPlaying || !this.renderer) return;
        
        requestAnimationFrame(this.animate);
        
        const delta = this.clock.getDelta();
        // Slow organic motion modifier (no visible short loops)
        this.uniforms.uTime.value += delta * 0.3;
        
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
        if (this.renderer) {
            this.renderer.dispose();
            this.geometry.dispose();
            this.material.dispose();
            if (this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            this.renderer = null;
        }
    }
}

// Hot reload safe initialization handling
if (window.__auroraBgInstance) {
    window.__auroraBgInstance.destroy();
}
window.__auroraBgInstance = new AuroraBackground();
