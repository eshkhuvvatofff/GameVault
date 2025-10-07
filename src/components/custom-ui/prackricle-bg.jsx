"use client"
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeJsScene = () => {
    const containerRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const windowHalfX = useRef(0); // defer reading window to effect
    const windowHalfY = useRef(0); // defer reading window to effect
    const cameraZ = useRef(1000);
    const scene = useRef(new THREE.Scene());
    const camera = useRef(null);
    const renderer = useRef(null);
    const geometry = useRef(null);
    const materials = useRef([]);
    const particles = useRef([]);
    const parameters = useRef([
        [[1, 1, 0.5], 5],
        [[0.95, 1, 0.5], 4],
        [[0.9, 1, 0.5], 3],
        [[0.85, 1, 0.5], 2],
        [[0.8, 1, 0.5], 1]
    ]);

    // Set client state on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Initialize the scene and start animation only once
    useEffect(() => {
        // Only run on client side
        if (isClient && typeof window !== 'undefined') {
            init();
            animate();
        }
        return () => {
            // Cleanup on component unmount
            if (typeof window !== 'undefined') {
                window.removeEventListener("resize", onWindowResize);
                document.removeEventListener("mousemove", onDocumentMouseMove);
            }
        };
    }, [isClient]);

    // Initialize WebGL scene
    function init() {
        // Initialize window dimensions safely
        windowHalfX.current = window.innerWidth / 2;
        windowHalfY.current = window.innerHeight / 2;

        camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 3000);
        camera.current.position.z = cameraZ.current;

        renderer.current = new THREE.WebGLRenderer();
        renderer.current.setPixelRatio(window.devicePixelRatio);
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.current.domElement);

        geometry.current = new THREE.BufferGeometry();
        const particleCount = 2000;
        const positions = [];
        for (let i = 0; i < particleCount; i++) {
            positions.push(Math.random() * 2000 - 1000);
            positions.push(Math.random() * 2000 - 1000);
            positions.push(Math.random() * 2000 - 1000);
        }
        geometry.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        // Create particles with different colors and sizes
        parameters.current.forEach(([color, size], i) => {
            materials.current[i] = new THREE.PointsMaterial({ size: size, color: new THREE.Color(color[0], color[1], color[2]) });
            particles.current[i] = new THREE.Points(geometry.current, materials.current[i]);
            particles.current[i].rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
            scene.current.add(particles.current[i]);
        });

        // Event listeners for window resizing and mouse movement
        window.addEventListener("resize", onWindowResize);
        document.addEventListener("mousemove", onDocumentMouseMove);
    }

    // Handle mouse movement
    function onDocumentMouseMove(event) {
        mouseX.current = (event.clientX - windowHalfX.current) / 2;
        mouseY.current = (event.clientY - windowHalfY.current) / 2;
    }

    // Handle window resizing
    function onWindowResize() {
        windowHalfX.current = window.innerWidth / 2;
        windowHalfY.current = window.innerHeight / 2;
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    // Render the scene with time-based rotations and color adjustments
    function render() {
        const time = Date.now() * 0.00005;

        camera.current.position.x += (mouseX.current - camera.current.position.x) * 1.5;
        camera.current.position.y += (-mouseY.current - camera.current.position.y) * 0.05;
        camera.current.lookAt(scene.current.position);

        // Rotate particles
        scene.current.children.forEach((object, i) => {
            if (object instanceof THREE.Points) {
                object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
            }
        });

        // Update particle colors over time
        materials.current.forEach((material, i) => {
            const color = parameters.current[i][0];
            const h = ((360 * (color[0] + time)) % 360) / 360;
            material.color.setHSL(h, color[1], color[2]);
        });

        renderer.current.render(scene.current, camera.current);
    }

    // Only render on client side
    if (!isClient) {
        return <div className="w-full fixed top-0 left-0 -z-10" />;
    }

    return <div ref={containerRef} className="w-full fixed top-0 left-0 -z-10" />;
};

export default ThreeJsScene;
