import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Particles: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const requestRef = useRef<number | null>(null);
  // const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let materials: THREE.PointsMaterial[] = [];
    let geometry: THREE.BufferGeometry;
    let particleCount = 5400;

    const init = () => {
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;

      camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 3000);
      camera.position.z = 1000;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0007);

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        positions[index] = Math.random() * 2000 - 1000;
        positions[index + 1] = Math.random() * 2000 - 1000;
        positions[index + 2] = Math.random() * 2000 - 1000;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const parameters = [
        [[1, 1, 0.5], 5],
        [[0.95, 1, 0.5], 4],
        [[0.90, 1, 0.5], 3],
        [[0.85, 1, 0.5], 2],
        [[0.80, 1, 0.5], 1],
      ];

      for (let i = 0; i < parameters.length; i++) {
        const size = parameters[i][1] as number;

        const material = new THREE.PointsMaterial({ size });
        materials.push(material);

        particles = new THREE.Points(geometry, material);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add(particles);
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const onMouseMove = (event: MouseEvent) => {
        mouseX.current = event.clientX - window.innerWidth / 2;
        mouseY.current = event.clientY - window.innerHeight / 2;
      };

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousemove", onMouseMove);

      const animate = () => {
        requestRef.current = requestAnimationFrame(animate);
        const time = Date.now() * 0.00005;

        camera.position.x += (mouseX.current - camera.position.x) * 0.03;
        camera.position.y += (-mouseY.current - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        for (let i = 0; i < scene.children.length; i++) {
          const object = scene.children[i];
          if (object instanceof THREE.Points) {
            object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
          }
        }

        for (let i = 0; i < materials.length; i++) {
          const color = parameters[i][0] as number[];
          const h = (360 * (color[0] + time) % 360) / 360;
          materials[i].color.setHSL(h, color[1], color[2]);
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    };

    init();
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh", position: "fixed", zIndex: -1 }} />;
};

export default Particles;