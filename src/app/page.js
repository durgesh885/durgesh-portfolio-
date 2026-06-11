"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Inline SVG Developer Icons Components
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M14.7 16.3c-.4-.4-.4-1 0-1.4l3.6-3.6-3.6-3.6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l4.3 4.3c.4.4.4 1 0 1.4l-4.3 4.3c-.4.4-1 .4-1.4 0zM9.3 7.7c.4.4.4 1 0 1.4L5.7 12.7l3.6 3.6c.4.4.4 1 0 1.4-.4.4-1.4.4-1.8 0L3.2 13.4c-.4-.4-.4-1 0-1.4l4.3-4.3c.4-.4 1.4-.4 1.8 0z" />
  </svg>
);

const BackendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.02-10-4.5v-3.32c1.93 1.46 5.67 2.32 10 2.32s8.07-.86 10-2.32v3.32c0 2.48-4.48 4.5-10 4.5zm0-6c-5.52 0-10-2.02-10-4.5v-3.32c1.93 1.46 5.67 2.32 10 2.32s8.07-.86 10-2.32v3.32c0 2.48-4.48 4.5-10 4.5z" />
  </svg>
);

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
  </svg>
);

const LearningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.18 11.5L12 15.22l6.82-3.72L12 7.78 5.18 11.5zM12 18.5c-2.67 0-5.18-.72-7.18-1.93v3.36c2 1.21 4.51 1.93 7.18 1.93s5.18-.72 7.18-1.93v-3.36c-2 1.21-4.51 1.93-7.18 1.93z" />
  </svg>
);

const ProjectWebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 12 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
  </svg>
);

const ProjectChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
  </svg>
);

const ProjectCloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
  </svg>
);

const ProjectNodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
    <path d="M13.13 22.19L20.5 18c.9-.52 1.5-1.48 1.5-2.5v-8.5c0-1.02-.6-1.98-1.5-2.5L13.13 1.8c-.7-.4-1.56-.4-2.26 0L3.5 6c-.9.52-1.5 1.48-1.5 2.5v8.5c0 1.02.6 1.98 1.5 2.5l7.37 4.19c.7.4 1.56.4 2.26 0zM12 4.13l5.5 3.12-5.5 3.12-5.5-3.12 5.5-3.12zM4 9.3l7 3.98v8.03l-7-3.98V9.3zm9 12.01v-8.03l7-3.98v8.03l-7 3.98z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function Home() {
  // SSR Safety
  const [mounted, setMounted] = useState(false);

  // Layout States
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Typing Effect State
  const [typeText, setTypeText] = useState("");

  // Refs for Three.js Canvas mounting
  const canvasContainerRef = useRef(null);
  const scrollRef = useRef(0);

  // Dynamic Loader Progress State
  const [progress, setProgress] = useState(0);

  // DevOps live CloudWatch logs simulation state
  const [logs, setLogs] = useState([
    "[SYS] Route53 routing request to active server group.",
    "[SYS] VPC flow logs verified. Security check passed.",
    "[CICD] Build success for durgesh-portfolio:latest.",
    "[SYS] AWS CloudWatch agent status: RUNNING."
  ]);

  // Loader log sequence targets
  const loaderLogs = [
    { pct: 0, text: "[SYSTEM] Booting Durgesh Cloud Engine v3.0..." },
    { pct: 15, text: "[NETWORK] Handshaking with AWS Route53 DNS gateway..." },
    { pct: 35, text: "[COMPUTE] Allocating EC2-t3.medium cluster nodes..." },
    { pct: 55, text: "[STORAGE] Mounting secure S3 asset buckets (SSL Enabled)..." },
    { pct: 75, text: "[DATABASE] Synchronizing MongoDB and relational databases..." },
    { pct: 90, text: "[PIPELINE] Deploying CI/CD container flow targets..." },
    { pct: 100, text: "[SUCCESS] All cloud subsystems operational. Launching portfolio..." }
  ];

  // Set mount safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // DevOps Logs simulation interval
  useEffect(() => {
    if (!mounted) return;
    const devopsLogsList = [
      "[SYS] Route53 routing request to active server group.",
      "[SYS] VPC flow logs verified. Security check passed.",
      "[CICD] Build success for durgesh-portfolio:latest.",
      "[SYS] AWS CloudWatch agent status: RUNNING.",
      "[SYS] EC2 CPU utilization stable at 24.5%.",
      "[SYS] S3 bucket sync: Backup completed successfully.",
      "[SYS] DB connection pool optimized (12 active).",
      "[SYS] CloudFront edge caches invalidated.",
      "[CICD] Deploying container v2.0.4 to cluster...",
      "[SYS] Health check status 200 OK for target-group."
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = devopsLogsList[Math.floor(Math.random() * devopsLogsList.length)];
        return [...prev.slice(1), nextLog];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Dynamic Loader Progress Loop
  useEffect(() => {
    if (!mounted) return;
    
    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds loading boot sequence
    let animationFrameId;

    const updateLoader = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setLoaderHidden(true);
        }, 400); // smooth fade transition
      }
    };

    animationFrameId = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted]);

  // Typing animation loop
  useEffect(() => {
    if (!mounted) return;

    const roles = [
      'AWS Cloud Specialist',
      'DevOps Engineer',
      'MCA Software Engineer',
      'Infrastructure Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypeText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypeText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

  // Navbar Scroll & Scrolled State Effect
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Active section tracker via scroll observer
  useEffect(() => {
    if (!mounted) return;

    const observedSections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      threshold: 0.2,
      rootMargin: "-120px 0px -40% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    observedSections.forEach((sec) => observer.observe(sec));
    return () => observedSections.forEach((sec) => observer.unobserve(sec));
  }, [mounted]);

  // Scroll Reveal Observer
  useEffect(() => {
    if (!mounted || !loaderHidden) return;

    const reveals = document.querySelectorAll(".reveal");
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, [mounted, loaderHidden]);

  // Three.js Interactive Neural Cloud Constellation simulation
  useEffect(() => {
    if (!mounted || !canvasContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Main background network group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const geometriesToDispose = [];
    const materialsToDispose = [];

    // Create 80 floating network nodes (Neural net)
    const nodeCount = 80;
    const nodePositions = [];
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 2
      );
      nodePositions.push(pos);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006
      );
      nodeVelocities.push(vel);
    }

    // Standard floating nodes geometries
    const nodeSphereGeom = new THREE.SphereGeometry(0.045, 6, 6);
    geometriesToDispose.push(nodeSphereGeom);

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5
    });
    materialsToDispose.push(nodeMat);

    const nodeMeshes = [];
    nodePositions.forEach((pos) => {
      const mesh = new THREE.Mesh(nodeSphereGeom, nodeMat);
      mesh.position.copy(pos);
      networkGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Special Service Hubs representing cloud systems
    const serviceNodes = [
      { id: "Route53", name: "DNS Gateway", type: "dns", pos: new THREE.Vector3(-2.8, 1.4, -2.5), color: 0x3b82f6 },
      { id: "EC2", name: "Compute Node", type: "ec2", pos: new THREE.Vector3(2.6, 1.0, -2.0), color: 0x00f0ff },
      { id: "RDS", name: "DB Node", type: "rds", pos: new THREE.Vector3(1.2, -1.2, -2.0), color: 0xec4899 },
      { id: "S3", name: "Storage Bucket", type: "s3", pos: new THREE.Vector3(-1.8, -1.0, -2.5), color: 0xa855f7 }
    ];

    const serviceMeshes = [];
    serviceNodes.forEach((s) => {
      const sGroup = new THREE.Group();
      sGroup.position.copy(s.pos);
      networkGroup.add(sGroup);

      let coreGeom, coreMat;
      coreMat = new THREE.MeshPhongMaterial({
        color: s.color,
        emissive: s.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85
      });
      materialsToDispose.push(coreMat);

      if (s.type === "dns") {
        coreGeom = new THREE.IcosahedronGeometry(0.24, 0);
      } else if (s.type === "ec2") {
        coreGeom = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      } else {
        coreGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.36, 10);
      }
      geometriesToDispose.push(coreGeom);

      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      sGroup.add(coreMesh);

      // Add a rotating wireframe ring around special hubs
      const ringGeom = new THREE.TorusGeometry(0.38, 0.012, 6, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: s.color,
        transparent: true,
        opacity: 0.45
      });
      geometriesToDispose.push(ringGeom);
      materialsToDispose.push(ringMat);

      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      sGroup.add(ringMesh);

      serviceMeshes.push({
        group: sGroup,
        ring: ringMesh,
        core: coreMesh,
        config: s
      });
    });

    // Dynamic Line Segments connecting close nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending
    });
    materialsToDispose.push(lineMat);

    const lineGeometry = new THREE.BufferGeometry();
    geometriesToDispose.push(lineGeometry);

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMat);
    networkGroup.add(lineMesh);

    // Traveling packets representing active data flows
    const packetGeom = new THREE.SphereGeometry(0.035, 6, 6);
    geometriesToDispose.push(packetGeom);

    const packets = [];
    for (let i = 0; i < 8; i++) {
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xa855f7,
        transparent: true,
        opacity: 0.8
      });
      materialsToDispose.push(pMat);

      const pMesh = new THREE.Mesh(packetGeom, pMat);
      networkGroup.add(pMesh);

      // Start/End selection
      const fromNodeIdx = Math.floor(Math.random() * nodeCount);
      let toNodeIdx = Math.floor(Math.random() * nodeCount);
      while (toNodeIdx === fromNodeIdx) {
        toNodeIdx = Math.floor(Math.random() * nodeCount);
      }

      packets.push({
        mesh: pMesh,
        fromIdx: fromNodeIdx,
        toIdx: toNodeIdx,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004
      });
    }

    // Space nebula star field background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 200;
    const starPos = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 25;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    geometriesToDispose.push(starsGeometry);

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    materialsToDispose.push(starsMaterial);

    const starParticles = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starParticles);

    camera.position.z = 7;

    // Mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 220;
      mouseY = (event.clientY - windowHalfY) / 220;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Responsive setup
    const checkModelVisibility = () => {
      if (window.innerWidth < 968) {
        networkGroup.position.set(0, 0, 0);
        networkGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        // Positioned in background to have balance
        networkGroup.position.set(0, 0, 0);
        networkGroup.scale.set(1.0, 1.0, 1.0);
      }
    };
    checkModelVisibility();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      checkModelVisibility();
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let animationFrameId;
    let targetScrollY = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      targetX = mouseX * 0.35;
      targetY = mouseY * 0.35;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (-targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Scroll interpolation
      const currentScroll = scrollRef.current;
      targetScrollY += (currentScroll - targetScrollY) * 0.05;

      const scrollFactor = targetScrollY * 0.0008;

      // Subtly rotate and shift the network based on scroll factor (stays in view always)
      networkGroup.position.y = (window.innerWidth < 968 ? 0.3 : 0) - (scrollFactor * 0.25);
      networkGroup.rotation.y = scrollFactor * 0.15 + Date.now() * 0.0001;

      // Update Node positions (Drifting animation)
      for (let i = 0; i < nodeCount; i++) {
        const pos = nodePositions[i];
        const vel = nodeVelocities[i];

        pos.add(vel);

        // Boundary checks
        if (pos.x < -6.5 || pos.x > 6.5) vel.x *= -1;
        if (pos.y < -4.5 || pos.y > 4.5) vel.y *= -1;
        if (pos.z < -6.5 || pos.z > 0) vel.z *= -1;

        nodeMeshes[i].position.copy(pos);
      }

      // Rotate Special Cloud Nodes
      serviceMeshes.forEach((s) => {
        s.group.rotation.y += 0.008;
        s.ring.rotation.z -= 0.012;
      });

      // Update Connections (Lines between close nodes)
      const linePositionsArray = [];
      for (let i = 0; i < nodeCount; i++) {
        const posA = nodePositions[i];
        
        // Check connections between floating nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const posB = nodePositions[j];
          const dist = posA.distanceTo(posB);
          if (dist < 2.0) {
            linePositionsArray.push(posA.x, posA.y, posA.z, posB.x, posB.y, posB.z);
          }
        }

        // Check connections from floating nodes to special hubs
        serviceNodes.forEach((s) => {
          const dist = posA.distanceTo(s.pos);
          if (dist < 2.2) {
            linePositionsArray.push(posA.x, posA.y, posA.z, s.pos.x, s.pos.y, s.pos.z);
          }
        });
      }

      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositionsArray, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      // Update data packets along lines
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1.0) {
          p.progress = 0;
          p.fromIdx = Math.floor(Math.random() * nodeCount);
          p.toIdx = Math.floor(Math.random() * nodeCount);
          while (p.toIdx === p.fromIdx) {
            p.toIdx = Math.floor(Math.random() * nodeCount);
          }
        }
        
        const posA = nodePositions[p.fromIdx];
        const posB = nodePositions[p.toIdx];
        p.mesh.position.lerpVectors(posA, posB, p.progress);
      });

      // Slowly rotate background stars
      starParticles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());

      scene.remove(starParticles);
      scene.remove(networkGroup);

      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mounted]);

  // Smooth scroll handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  if (!mounted) {
    return null; // Safe guard against SSR flashes
  }

  return (
    <>
      {/* Loading Screen */}
      <div className={`loader ${loaderHidden ? "hidden" : ""}`} id="loader">
        <div className="loader-console">
          <div className="console-header">
            <span className="console-title mono">AWS Cloud DevOps Console - Booting...</span>
          </div>
          <div className="console-screen mono">
            {loaderLogs.map((log, index) => {
              if (progress >= log.pct) {
                return (
                  <div key={index} className="console-log-line">
                    <span className="log-success">[OK]</span> {log.text}
                  </div>
                );
              }
              return null;
            })}
            <div className="console-input-line">
              <span className="console-prompt">$</span> <span className="blinking-cursor">_</span>
            </div>
          </div>
          <div className="loader-line-container">
            <div className="loader-line" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loader-progress-pct mono">{progress}%</div>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div id="canvas-container" ref={canvasContainerRef}></div>

      {/* DevOps HUD Console (Desktop Only overlays) */}
      <div className="devops-hud left-hud">
        <div className="hud-header mono">SYS STATUS</div>
        <div className="hud-body mono">
          <div className="hud-metric">
            <span>REGION:</span>
            <span className="text-glow">us-east-1</span>
          </div>
          <div className="hud-metric">
            <span>EC2 CLUSTER:</span>
            <span className="text-glow green-text">ACTIVE (3)</span>
          </div>
          <div className="hud-metric">
            <span>S3 BACKUP:</span>
            <span className="text-glow">SYNCED</span>
          </div>
          <div className="hud-metric">
            <span>PIPELINE:</span>
            <span className="text-glow anim-pulse">READY</span>
          </div>
          <div className="hud-cpu-load">
            <div className="hud-cpu-label">CPU LOAD: 24.5%</div>
            <div className="hud-progress-bar">
              <div className="hud-progress-fill" style={{ width: "24.5%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="devops-hud right-hud">
        <div className="hud-header mono">CLOUDWATCH LOGS</div>
        <div className="hud-body mono console-logs">
          {logs.map((log, index) => (
            <div key={index} className="hud-log-line">
              {log}
            </div>
          ))}
          <div className="hud-log-line flashing-caret">&gt; _</div>
        </div>
      </div>

      {/* Navigation */}
      <nav id="navbar" className={navbarScrolled ? "scrolled" : ""}>
        <div className="nav-container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, "home")}>
            <div className="logo-icon">
              <svg className="logo-svg" viewBox="0 0 100 100" width="42" height="42">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                  <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Pulsing Brackets */}
                <path className="logo-bracket-left" d="M22,35 L10,50 L22,65" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path className="logo-bracket-right" d="M78,35 L90,50 L78,65" fill="none" stroke="var(--secondary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {/* Rotating Hexagon */}
                <polygon className="logo-hex" points="50,15 80,32 80,68 50,85 20,68 20,32" fill="rgba(9, 13, 22, 0.6)" stroke="url(#logoGrad)" strokeWidth="4" />
                {/* Inner stylized D */}
                <path d="M42,35 H54 C61,35 65,39 65,47 C65,55 61,59 54,59 H42 Z M49,41 V53 H53 C57,53 58,51 58,47 C58,43 57,41 53,41 Z" fill="url(#logoGrad)" filter="url(#logoGlow)" />
              </svg>
            </div>
            <span>Durgesh</span>
          </a>
          
          <ul className="nav-links">
            <li>
              <a
                href="#home"
                className={activeSection === "home" ? "active" : ""}
                onClick={(e) => handleNavClick(e, "home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeSection === "skills" ? "active" : ""}
                onClick={(e) => handleNavClick(e, "skills")}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? "active" : ""}
                onClick={(e) => handleNavClick(e, "projects")}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? "active" : ""}
                onClick={(e) => handleNavClick(e, "about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active" : ""}
                onClick={(e) => handleNavClick(e, "contact")}
              >
                Contact
              </a>
            </li>
          </ul>
          
          <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`} id="mobileMenu">
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "home")}
          >
            Home
          </a>
          <a
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "skills")}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "projects")}
          >
            Projects
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge mono">☁️ DevOps & AWS Cloud</div>
            <h1>Hi, I'm<br />Durgesh 🚀</h1>
            <div className="hero-role mono" id="typeText">{typeText || "DevOps Engineer"}</div>
            <p className="hero-desc">
              Aspiring <strong>DevOps & AWS Cloud Engineer</strong> specializing in cloud architecture design, server deployment, and automated <strong>CI/CD pipelines</strong>. I design scalable virtual infrastructure and build full-stack web applications.
            </p>
            
            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-value mono">MCA</span>
                <span className="stat-label">Pursuing</span>
              </div>
              <div className="stat-box">
                <span className="stat-value mono">AWS</span>
                <span className="stat-label">Cloud</span>
              </div>
              <div className="stat-box">
                <span className="stat-value mono">CI/CD</span>
                <span className="stat-label">Automation</span>
              </div>
            </div>
            
            <div className="cta-group">
              <a href="#projects" className="btn btn-primary" onClick={(e) => handleNavClick(e, "projects")}>View Projects 🚀</a>
              <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub →</a>
            </div>
          </div>
          
          {/* Holographic Dracula-themed Code Card */}
          <div className="holo-card">
            <div className="code-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
              <span style={{ color: "#64748b", marginLeft: "10px", fontSize: "14px", fontFamily: "'JetBrains Mono', monospace" }}>
                durgesh@aws-ops: ~/devops-config
              </span>
            </div>
            <div className="code-body">
              <div className="code-row"><span className="line-num">1</span><span className="code-line"><span className="keyword">const</span> <span className="var">engineer</span> = &#123;</span></div>
              <div className="code-row"><span className="line-num">2</span><span className="code-line">&nbsp;&nbsp;name: <span className="string">'Durgesh Chaudhari'</span>,</span></div>
              <div className="code-row"><span className="line-num">3</span><span className="code-line">&nbsp;&nbsp;role: <span className="string">'Cloud & DevOps Engineer'</span>,</span></div>
              <div className="code-row"><span className="line-num">4</span><span className="code-line">&nbsp;&nbsp;stack: [<span className="string">'MongoDB'</span>, <span className="string">'Express'</span>,</span></div>
              <div className="code-row"><span className="line-num">5</span><span className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="string">'React'</span>, <span style={{ color: "#ff79c6" }}>'Node.js'</span>],</span></div>
              <div className="code-row"><span className="line-num">6</span><span className="code-line">&nbsp;&nbsp;cloud: [<span className="string">'AWS EC2'</span>, <span className="string">'S3'</span>, <span className="string">'Route53'</span>, <span className="string">'VPC'</span>],</span></div>
              <div className="code-row"><span className="line-num">7</span><span className="code-line">&nbsp;&nbsp;devops: [<span className="string">'CI/CD'</span>, <span className="string">'Linux Admin'</span>, <span className="string">'Apache'</span>],</span></div>
              <div className="code-row"><span className="line-num">8</span><span className="code-line">&nbsp;&nbsp;status: <span className="string">'Nominal / Ready to Deploy'</span></span></div>
              <div className="code-row"><span className="line-num">9</span><span className="code-line">&#125;;</span></div>
            </div>
          </div>
          
          {/* Scroll Down Mouse Indicator */}
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span className="scroll-text mono">Scroll Down</span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Technical Skills</span>
            <h2 className="section-title">My Tech Stack</h2>
            <p className="section-subtitle">Technologies I work with to build and deploy modern applications</p>
          </div>
          
          <div className="skills-grid">
            <div className="skill-card reveal">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><CloudIcon /></div>
                <h3 className="skill-cat-title">Cloud Infrastructure</h3>
              </div>
              <div className="skill-list">
                <div className="skill-item"><span className="skill-name">AWS EC2 / S3</span><span className="skill-level">Hands-on</span></div>
                <div className="skill-item"><span className="skill-name">AWS Route 53 / VPC</span><span className="skill-level">Hands-on</span></div>
                <div className="skill-item"><span className="skill-name">Security Groups & IAM</span><span className="skill-level">Intermediate</span></div>
                <div className="skill-item"><span className="skill-name">Linux System Admin</span><span className="skill-level">Intermediate</span></div>
                <div className="skill-item"><span className="skill-name">Apache Configuration</span><span className="skill-level">Configured</span></div>
              </div>
            </div>
            
            <div className="skill-card reveal">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><BackendIcon /></div>
                <h3 className="skill-cat-title">DevOps & Admin</h3>
              </div>
              <div className="skill-list">
                <div className="skill-item"><span className="skill-name">Git & GitHub versioning</span><span className="skill-level">Regular</span></div>
                <div className="skill-item"><span className="skill-name">Bash Shell Scripting</span><span className="skill-level">Exploring</span></div>
                <div className="skill-item"><span className="skill-name">CI/CD Pipeline Concepts</span><span className="skill-level">Learning</span></div>
                <div className="skill-item"><span className="skill-name">Docker Containers</span><span className="skill-level">Beginning</span></div>
              </div>
            </div>
            
            <div className="skill-card reveal">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><CodeIcon /></div>
                <h3 className="skill-cat-title">Frontend Stack</h3>
              </div>
              <div className="skill-list">
                <div className="skill-item"><span className="skill-name">JavaScript (ES6+)</span><span className="skill-level">Intermediate</span></div>
                <div className="skill-item"><span className="skill-name">HTML5 & CSS3</span><span className="skill-level">Advanced</span></div>
                <div className="skill-item"><span className="skill-name">React.js Framework</span><span className="skill-level">Learning</span></div>
                <div className="skill-item"><span className="skill-name">Tailwind CSS</span><span className="skill-level">Learning</span></div>
              </div>
            </div>
            
            <div className="skill-card reveal">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><LearningIcon /></div>
                <h3 className="skill-cat-title">Currently Learning</h3>
              </div>
              <div className="skill-list">
                <div className="skill-item"><span className="skill-name">Node.js & Express</span><span className="skill-level">Intermediate</span></div>
                <div className="skill-item"><span className="skill-name">MongoDB Integration</span><span className="skill-level">Intermediate</span></div>
                <div className="skill-item"><span className="skill-name">Infrastructure as Code (IaC)</span><span className="skill-level">Exploring</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Featured Work</span>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">Real-world applications built and deployed on cloud infrastructure</p>
          </div>
          
          <div className="projects-grid">
            <div className="project-card reveal">
              <div className="project-image">
                <ProjectCloudIcon />
                <span className="project-status">Live on AWS</span>
              </div>
              <div className="project-content">
                <div className="project-category">Cloud Deployment</div>
                <h3 className="project-title">Automated Web Server Hosting on AWS</h3>
                <p className="project-desc">Personal portfolio deployed on AWS EC2 with Apache server configuration, SSL setup, and custom Route 53 domain routing.</p>
                <div className="tech-tags">
                  <span className="tech-tag">AWS EC2</span>
                  <span className="tech-tag">Route 53</span>
                  <span className="tech-tag">Apache</span>
                  <span className="tech-tag">Linux</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link" onClick={(e) => e.preventDefault()}>Live Demo</a>
                  <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card reveal">
              <div className="project-image">
                <ProjectChatIcon />
                <span className="project-status">In Progress</span>
              </div>
              <div className="project-content">
                <div className="project-category">Full Stack</div>
                <h3 className="project-title">Real-time Cloud Chat System</h3>
                <p className="project-desc">Full-stack chat app with React, Tailwind CSS, Node.js and Express. Features real-time messaging with Socket.io.</p>
                <div className="tech-tags">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Tailwind</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Express</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link" onClick={(e) => e.preventDefault()}>View Code</a>
                  <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card reveal">
              <div className="project-image">
                <ProjectWebIcon />
                <span className="project-status">Configured</span>
              </div>
              <div className="project-content">
                <div className="project-category">DevOps & Admin</div>
                <h3 className="project-title">AWS DevOps & Linux Server Admin</h3>
                <p className="project-desc">Configured Apache on EC2, managed security groups, VPC networking parameters, SSH keys, and server administration.</p>
                <div className="tech-tags">
                  <span className="tech-tag">Apache</span>
                  <span className="tech-tag">AWS EC2</span>
                  <span className="tech-tag">Linux</span>
                  <span className="tech-tag">VPC</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link" onClick={(e) => e.preventDefault()}>Details</a>
                  <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
            
            <div className="project-card reveal">
              <div className="project-image">
                <ProjectNodeIcon />
                <span className="project-status">Building</span>
              </div>
              <div className="project-content">
                <div className="project-category">MERN Stack</div>
                <h3 className="project-title">Cloud-Native MERN Stack App</h3>
                <p className="project-desc">Full-fledged application using MongoDB, Express, React, and Node.js with focus on database cluster syncing.</p>
                <div className="tech-tags">
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">Express</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link" onClick={(e) => e.preventDefault()}>In Dev</a>
                  <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">My Journey</h2>
            <p className="section-subtitle">From BCA graduate to aspiring DevOps & Cloud Infrastructure Engineer</p>
          </div>
          
          <div className="about-container reveal">
            <div className="about-content">
              <p className="about-text">
                I am <strong>Durgesh Chaudhari</strong>, currently pursuing my <strong>Master of Computer Applications (MCA)</strong>. I am passionate about Cloud Architectures, automated deployments, Linux systems, and DevOps engineering.
              </p>
              <p className="about-text">
                My software journey began with standard web development. As I built and integrated backend APIs, I became intrigued by *where* and *how* code runs. This led me straight into <strong>AWS Cloud Computing</strong> and the principles of <strong>DevOps automation</strong>.
              </p>
              <p className="about-text">
                I believe in **Infrastructure as Code** and hands-on system building. Deploying portfolio items, configuring SSL certificates, managing DNS entries on Route53, and configuring web server proxies are steps towards my goal of architecting highly available systems.
              </p>
              
              <div className="education-timeline">
                <div className="timeline-line"></div>
                <div className="timeline-items">
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-header">
                      <h3>Master of Computer Applications (MCA)</h3>
                      <span className="timeline-date">2024 – Present</span>
                    </div>
                    <p className="timeline-sub">Currently Pursuing</p>
                    <ul className="timeline-details">
                      <li>Studying advanced algorithms, distributed computing architectures, network security, and database systems.</li>
                      <li>Applying coursework to practical deployment patterns: setting up cloud servers, configuring network bridges, and REST API scalability.</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-header">
                      <h3>Bachelor of Computer Applications (BCA)</h3>
                      <span className="timeline-date">2021 – 2024</span>
                    </div>
                    <p className="timeline-sub">Completed</p>
                    <ul className="timeline-details">
                      <li>Gained robust foundation in OOP (Java, C++), database systems (SQL), and structural computer networks.</li>
                      <li>Built and hosted fundamental academic projects, developing coding logic and system analysis capabilities.</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle">Open for Cloud & DevOps internships, collaborative projects, and engineering conversations</p>
          </div>
          
          <div className="contact-grid reveal">
            <a href="mailto:chaudharidurgesh493@gmail.com" className="contact-card">
              <div className="contact-icon-box"><EmailIcon /></div>
              <div className="contact-title">Email</div>
              <div className="contact-detail">chaudharidurgesh493@gmail.com</div>
            </a>
            
            <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon-box"><GithubIcon /></div>
              <div className="contact-title">GitHub</div>
              <div className="contact-detail">@durgesh885</div>
            </a>
            
            <a href="https://www.linkedin.com/in/durgesh-chaudhari" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon-box"><LinkedinIcon /></div>
              <div className="contact-title">LinkedIn</div>
              <div className="contact-detail">Durgesh Chaudhari</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-social">
          <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/durgesh-chaudhari" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn"><LinkedinIcon /></a>
          <a href="mailto:chaudharidurgesh493@gmail.com" className="social-btn" title="Email"><EmailIcon /></a>
        </div>
        <p className="copyright mono">© {new Date().getFullYear()} Durgesh Chaudhari. All rights reserved.</p>
      </footer>
    </>
  );
}
