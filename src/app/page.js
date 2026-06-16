"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

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

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
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

  // Contact Form States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success

  // Set mount safety
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

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
      'Cloud Engineer',
      'DevOps Learner',
      'AWS Practitioner',
      'Problem Solver'
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

  // Lock body scroll when mobile menu is open to prevent scroll leaks on mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  // Three.js CloudOps infrastructure scene
  useEffect(() => {
    if (!mounted || !canvasContainerRef.current) return;

    const canvasContainer = canvasContainerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const testCanvas = document.createElement("canvas");
    const hasWebGL = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    let renderer;

    if (!hasWebGL) return;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.8)); // Buttery smooth mobile performance
    canvasContainer.appendChild(renderer.domElement);
    canvasContainer.classList.add("webgl-active");

    // Lights Setup (Adjusted for moody cyberpunk metal styling and rich neon highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.15 : 0.22);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isMobile ? 0.4 : 0.8);
    dirLight.position.set(5, 7, 4);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0xff007f, isMobile ? 4.0 : 7.0, 20); // Glowing Magenta
    pointLight1.position.set(-3.5, 3, 2.5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00f0ff, isMobile ? 4.0 : 7.0, 20); // Electric Cyan
    pointLight2.position.set(3.5, -3, 2.5);
    scene.add(pointLight2);

    const cursorLight = new THREE.PointLight(0xffaa00, isMobile ? 2.0 : 4.5, 15); // Dynamic Gold Light
    cursorLight.position.set(0, 0, 3.5);
    scene.add(cursorLight);

    const geometriesToDispose = [];
    const materialsToDispose = [];

    const infraGroup = new THREE.Group();
    scene.add(infraGroup);

    // 1. Dynamic terminal screen canvas & texture
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 340;
    const screenCtx = screenCanvas.getContext("2d");
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    materialsToDispose.push(screenTexture);

    const termLogs = [
      "durgesh@aws-ops:~$ npm run deploy",
      "> durgesh-portfolio@0.1.0 deploy",
      "> next build && next start",
      "",
      "▲ Next.js 16.2.9 (Turbopack)",
      "- Cloud Provider: AWS (Amazon Web Services)",
      "- Target Region: us-east-1 (N. Virginia)",
      "",
      "[INFO] Creating AWS VPC (10.0.0.0/16)... [OK]",
      "[INFO] Configuring Internet Gateway... [OK]",
      "[INFO] Provisioning Public Subnet 1a... [OK]",
      "[INFO] Setting up Security Groups (SSH, HTTP, HTTPS)... [OK]",
      "[INFO] Deploying AWS EC2 Ubuntu instance... [OK]",
      "[INFO] Allocating Elastic IP: 54.210.12.85... [OK]",
      "[INFO] Attaching EBS Block Storage gp3 (50GB)... [OK]",
      "[INFO] Connecting via SSH and installing Docker... [OK]",
      "[INFO] Building Docker container: portfolio:latest... [OK]",
      "[INFO] Running container on port 80 (nginx reverse proxy)... [OK]",
      "[INFO] Setting up MongoDB Database container... [OK]",
      "[INFO] Configuring AWS Route 53 DNS records... [OK]",
      "[INFO] Mapping domain name durgesh.dev to Route 53... [OK]",
      "[INFO] Requesting SSL Certificate from Let's Encrypt... [OK]",
      "[INFO] Generating SSL certs via Certbot... [OK]",
      "[INFO] HTTPS enabled successfully! SSL cert active.",
      "",
      "✓ Compiled successfully in 142ms",
      "✓ Next.js web application is LIVE & SECURE!",
      "durgesh@aws-ops:~$ _"
    ];

    let currentLogIndex = 0;
    const displayedLogs = [];
    let lastLogTime = 0;

    const updateTerminal = (time) => {
      const now = time * 1000;
      if (now - lastLogTime > 800) {
        lastLogTime = now;
        if (currentLogIndex < termLogs.length) {
          displayedLogs.push(termLogs[currentLogIndex]);
          currentLogIndex++;
          if (displayedLogs.length > 15) {
            displayedLogs.shift();
          }
        } else {
          displayedLogs.length = 0;
          currentLogIndex = 0;
        }
      }

      // Draw dark terminal screen background
      screenCtx.fillStyle = "#030712";
      screenCtx.fillRect(0, 0, 512, 340);

      // Draw macOS-style window header
      screenCtx.fillStyle = "#1f2937";
      screenCtx.fillRect(0, 0, 512, 32);

      // macOS control buttons
      screenCtx.fillStyle = "#ef4444";
      screenCtx.beginPath(); screenCtx.arc(18, 16, 4, 0, Math.PI * 2); screenCtx.fill();
      screenCtx.fillStyle = "#f59e0b";
      screenCtx.beginPath(); screenCtx.arc(30, 16, 4, 0, Math.PI * 2); screenCtx.fill();
      screenCtx.fillStyle = "#10b981";
      screenCtx.beginPath(); screenCtx.arc(42, 16, 4, 0, Math.PI * 2); screenCtx.fill();

      screenCtx.fillStyle = "#9ca3af";
      screenCtx.font = "bold 11px monospace";
      screenCtx.fillText("durgesh@aws-cloud-ops: ~", 64, 20);

      screenCtx.font = "12px monospace";
      for (let i = 0; i < displayedLogs.length; i++) {
        const line = displayedLogs[i];
        let color = "#10b981";

        if (line.startsWith("durgesh@aws-ops")) {
          color = "#00f0ff";
        } else if (line.includes("[INFO]")) {
          color = "#cbd5e1";
        } else if (line.includes("▲") || line.includes("Next.js")) {
          color = "#ffffff";
        } else if (line.includes("✓")) {
          color = "#00ff66";
        } else if (line.includes("deploy") || line.includes("build")) {
          color = "#ff79c6";
        }

        screenCtx.fillStyle = color;
        screenCtx.fillText(line, 20, 52 + i * 18);
      }
      
      screenTexture.needsUpdate = true;
    };

    let mixer;
    const clock = new THREE.Clock();
    
    let blinkingLeds = [];
    let fanGroups = [];

    const createDataCenterCluster = () => {
      const clusterGroup = new THREE.Group();

      const colorCabinet = 0x0c0d10; // Opaque deep dark metal casing
      const colorCabinetEdge = 0x22252e; // Gunmetal frame borders
      const colorBlade = 0x14161b; // Charcoal server faceplates
      const colorHandle = 0xa0a5b0; // Chrome rack handles
      const colorLedGreen = 0x00ff66;
      const colorLedCyan = 0x00f0ff;
      const colorLedMagenta = 0xff007f;
      const colorLedOrange = 0xffaa00;

      const rackCount = 3;
      const rackSpacing = 1.7;
      const leds = [];
      const fans = [];

      for (let r = 0; r < rackCount; r++) {
        const rackGroup = new THREE.Group();
        const posX = (r - 1) * rackSpacing;
        const posZ = r === 1 ? 0 : -0.25;
        const rotY = r === 0 ? 0.12 : r === 2 ? -0.12 : 0;
        rackGroup.position.set(posX, 0, posZ);
        rackGroup.rotation.y = rotY;

        // 1. Solid Outer Cabinet Casing (Back, sides, top, bottom)
        const shellGeo = new THREE.BoxGeometry(1.45, 3.7, 1.5);
        const shellMat = new THREE.MeshStandardMaterial({
          color: colorCabinet,
          metalness: 0.9,
          roughness: 0.25,
          side: THREE.DoubleSide
        });
        const shell = new THREE.Mesh(shellGeo, shellMat);
        shell.castShadow = true;
        shell.receiveShadow = true;
        rackGroup.add(shell);

        // Frame borders for the front opening to give depth
        const frameMat = new THREE.MeshStandardMaterial({
          color: colorCabinetEdge,
          metalness: 0.95,
          roughness: 0.18
        });

        const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.7, 0.08), frameMat);
        frameLeft.position.set(-0.7, 0, 0.75);
        rackGroup.add(frameLeft);

        const frameRight = frameLeft.clone();
        frameRight.position.x = 0.7;
        rackGroup.add(frameRight);

        const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.05, 0.08), frameMat);
        frameTop.position.set(0, 1.825, 0.75);
        rackGroup.add(frameTop);

        const frameBottom = frameTop.clone();
        frameBottom.position.y = -1.825;
        rackGroup.add(frameBottom);

        // 2. Stack of Server Blades
        const bladeCount = 11;
        const startY = -1.5;
        const spacingY = 0.3;

        for (let b = 0; b < bladeCount; b++) {
          const bladeGroup = new THREE.Group();
          bladeGroup.position.y = startY + b * spacingY;

          // Metal faceplate
          const faceGeo = new THREE.BoxGeometry(1.34, 0.23, 0.08);
          const faceMat = new THREE.MeshStandardMaterial({
            color: colorBlade,
            metalness: 0.95,
            roughness: 0.18
          });
          const faceplate = new THREE.Mesh(faceGeo, faceMat);
          faceplate.position.set(0, 0, 0.71);
          faceplate.castShadow = true;
          faceplate.receiveShadow = true;
          bladeGroup.add(faceplate);

          // Horizontal/Vertical handles
          const handleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8);
          const handleMat = new THREE.MeshStandardMaterial({
            color: colorHandle,
            metalness: 0.98,
            roughness: 0.05
          });
          
          const handleL = new THREE.Mesh(handleGeo, handleMat);
          handleL.position.set(-0.61, 0, 0.76);
          bladeGroup.add(handleL);

          const handleR = handleL.clone();
          handleR.position.x = 0.61;
          bladeGroup.add(handleR);

          // Corner screws
          const screwGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 8);
          screwGeo.rotateX(Math.PI / 2);
          const screwMat = new THREE.MeshStandardMaterial({
            color: 0x484b54,
            metalness: 0.9,
            roughness: 0.3
          });
          const screwPositions = [
            [-0.64, 0.08], [-0.64, -0.08],
            [0.64, 0.08], [0.64, -0.08]
          ];
          screwPositions.forEach(([sx, sy]) => {
            const screw = new THREE.Mesh(screwGeo, screwMat);
            screw.position.set(sx, sy, 0.752);
            bladeGroup.add(screw);
          });

          // Layout-specific blades: switches, server blades, and monitors
          const isSwitch = b === 4 || b === 8;
          const isMonitor = r === 1 && b === 6; // Center rack middle slot has console monitor screen

          if (isMonitor) {
            // Screen container
            const screenFrameGeo = new THREE.BoxGeometry(0.9, 0.18, 0.02);
            const screenFrameMat = new THREE.MeshStandardMaterial({
              color: 0x08090a,
              metalness: 0.3,
              roughness: 0.8
            });
            const screenFrame = new THREE.Mesh(screenFrameGeo, screenFrameMat);
            screenFrame.position.set(-0.1, 0, 0.752);
            bladeGroup.add(screenFrame);

            // Active terminal screen
            const screenMeshGeo = new THREE.BoxGeometry(0.86, 0.15, 0.01);
            const screenMeshMat = new THREE.MeshBasicMaterial({
              map: screenTexture,
              transparent: false
            });
            const screenMesh = new THREE.Mesh(screenMeshGeo, screenMeshMat);
            screenMesh.position.set(-0.1, 0, 0.763);
            bladeGroup.add(screenMesh);

            // Dial dials/buttons on the right
            const dialGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.01, 8);
            dialGeo.rotateX(Math.PI / 2);
            const dialMat = new THREE.MeshStandardMaterial({ color: 0x5a5f6e, metalness: 0.9, roughness: 0.1 });
            
            for (let btn = 0; btn < 3; btn++) {
              const dial = new THREE.Mesh(dialGeo, dialMat);
              dial.position.set(0.42 + btn * 0.06, 0, 0.752);
              bladeGroup.add(dial);
            }
          } else if (isSwitch) {
            // Switch network ports
            const portGeo = new THREE.BoxGeometry(0.045, 0.035, 0.02);
            const portMat = new THREE.MeshStandardMaterial({
              color: 0x050607,
              metalness: 0.1,
              roughness: 0.9
            });
            
            for (let row = 0; row < 2; row++) {
              for (let col = 0; col < 12; col++) {
                const port = new THREE.Mesh(portGeo, portMat);
                const px = -0.44 + col * 0.08;
                const py = -0.045 + row * 0.09;
                port.position.set(px, py, 0.752);
                bladeGroup.add(port);
                
                // Port activity LED
                const actOn = Math.random() > 0.45;
                const actColor = Math.random() > 0.6 ? colorLedGreen : colorLedOrange;
                const pLedGeo = new THREE.BoxGeometry(0.01, 0.01, 0.01);
                const pLedMat = new THREE.MeshStandardMaterial({
                  color: 0x000000,
                  emissive: actColor,
                  emissiveIntensity: actOn ? 2.0 : 0.1
                });
                const pLed = new THREE.Mesh(pLedGeo, pLedMat);
                pLed.position.set(px, py + 0.024, 0.758);
                bladeGroup.add(pLed);
                
                if (actOn) {
                  leds.push({
                    mesh: pLed,
                    baseColor: actColor,
                    speed: 0.06 + Math.random() * 0.14,
                    offset: Math.random() * Math.PI
                  });
                }
              }
            }
          } else {
            // Standard Server Blade: Disk bay slots
            const bayGeo = new THREE.BoxGeometry(0.18, 0.15, 0.02);
            const bayMat = new THREE.MeshStandardMaterial({
              color: 0x090a0c,
              metalness: 0.4,
              roughness: 0.6
            });

            for (let d = 0; d < 4; d++) {
              const bay = new THREE.Mesh(bayGeo, bayMat);
              bay.position.set(-0.35 + d * 0.22, 0, 0.752);
              bladeGroup.add(bay);

              // Latch eject handle
              const latch = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.09, 0.01), handleMat);
              latch.position.set(-0.42 + d * 0.22, 0, 0.763);
              bladeGroup.add(latch);
            }

            // Standard Blade status indicators (Power, Disk, Network)
            const ledPositions = [0.46, 0.51, 0.56];
            const ledColors = [colorLedGreen, colorLedCyan, colorLedMagenta];
            ledPositions.forEach((lx, idx) => {
              const ledGeo = new THREE.SphereGeometry(0.015, 8, 8);
              const ledMat = new THREE.MeshStandardMaterial({
                color: 0x111111,
                emissive: ledColors[idx],
                emissiveIntensity: Math.random() > 0.35 ? 2.5 : 0.1
              });
              const led = new THREE.Mesh(ledGeo, ledMat);
              led.position.set(lx, 0.04, 0.755);
              bladeGroup.add(led);
              
              leds.push({
                mesh: led,
                baseColor: ledColors[idx],
                speed: 0.08 + Math.random() * 0.16,
                offset: Math.random() * Math.PI
              });
            });
          }

          rackGroup.add(bladeGroup);
        }

        // Side neon glowing bars
        const glowL = new THREE.Mesh(
          new THREE.BoxGeometry(0.012, 3.5, 0.012),
          new THREE.MeshBasicMaterial({ color: colorLedCyan })
        );
        glowL.position.set(-0.66, 0, 0.74);
        rackGroup.add(glowL);

        const glowR = new THREE.Mesh(
          new THREE.BoxGeometry(0.012, 3.5, 0.012),
          new THREE.MeshBasicMaterial({ color: colorLedMagenta })
        );
        glowR.position.set(0.66, 0, 0.74);
        rackGroup.add(glowR);

        // Rear cooling fans
        const rearFanGroup = new THREE.Group();
        rearFanGroup.position.set(0, 0, -0.76);
        for (let f = 0; f < 3; f++) {
          const fanBack = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.02, 16),
            new THREE.MeshStandardMaterial({ color: 0x1b1d22, metalness: 0.85, roughness: 0.3 })
          );
          fanBack.rotation.x = Math.PI / 2;
          fanBack.position.y = -0.9 + f * 0.9;
          rearFanGroup.add(fanBack);
          
          const bladeGeo = new THREE.BoxGeometry(0.36, 0.03, 0.01);
          const bladeMat = new THREE.MeshStandardMaterial({ color: 0x060708, metalness: 0.9, roughness: 0.1 });
          const blades = new THREE.Group();
          blades.position.copy(fanBack.position);
          
          const b1 = new THREE.Mesh(bladeGeo, bladeMat);
          blades.add(b1);
          const b2 = b1.clone();
          b2.rotation.z = Math.PI / 2;
          blades.add(b2);
          
          rearFanGroup.add(blades);
          fans.push(blades);
        }
        rackGroup.add(rearFanGroup);

        clusterGroup.add(rackGroup);
      }

      // Base Platform Floor
      const baseGeo = new THREE.BoxGeometry(5.2, 0.12, 2.2);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x090a0d,
        metalness: 0.9,
        roughness: 0.35
      });
      const baseFloor = new THREE.Mesh(baseGeo, baseMat);
      baseFloor.position.y = -1.86;
      baseFloor.receiveShadow = true;
      clusterGroup.add(baseFloor);

      // Floor grid plates
      const plateGeo = new THREE.BoxGeometry(1.5, 0.01, 1.8);
      const plateMat = new THREE.MeshStandardMaterial({
        color: 0x16181f,
        metalness: 0.95,
        roughness: 0.2
      });
      for (let p = 0; p < rackCount; p++) {
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.set((p - 1) * rackSpacing, -1.79, 0);
        clusterGroup.add(plate);
      }

      return { group: clusterGroup, leds, fans };
    };

    // Load MacBook Pro or custom server model with fallback support
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    const loadProceduralServerRack = () => {
      // Clear any previous model in infraGroup
      while(infraGroup.children.length > 0) { 
        infraGroup.remove(infraGroup.children[0]); 
      }
      
      const { group, leds, fans } = createDataCenterCluster();
      blinkingLeds = leds;
      fanGroups = fans;
      
      // Position the cluster nicely
      group.position.set(0, 0, 0);
      infraGroup.scale.set(1.0, 1.0, 1.0); // Reset scale
      infraGroup.add(group);
    };

    const loadModel = (modelPath) => {
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          
          // Clear any previous model in infraGroup
          while(infraGroup.children.length > 0) { 
            infraGroup.remove(infraGroup.children[0]); 
          }
          blinkingLeds = [];
          fanGroups = [];
          
          // Apply standard dark styling to custom server model
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach((mat) => {
                  if (mat) {
                    if ('metalness' in mat) {
                      mat.metalness = Math.max(0.7, mat.metalness !== undefined ? mat.metalness : 0);
                    }
                    if ('roughness' in mat) {
                      mat.roughness = Math.min(0.3, mat.roughness !== undefined ? mat.roughness : 1);
                    }
                  }
                });
              }
            }
          });
          
          // Automatic bounding box scaling and centering for custom server model
          const box = new THREE.Box3().setFromObject(model);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = box.getSize(new THREE.Vector3());
          
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = isMobile ? 3.0 / maxDim : 4.5 / maxDim;
          
          model.position.sub(center); 
          infraGroup.scale.set(scale, scale, scale);
          infraGroup.add(model);

          if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }
        },
        undefined,
        (error) => {
          console.warn(`Custom model ${modelPath} not found. Loading high-fidelity procedural Server Cluster.`);
          loadProceduralServerRack();
        }
      );
    };

    // Load custom model if available, otherwise fall back to procedural Server Cluster
    loadModel("/server.glb");

    // 5. Nebula Ambient Dust Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 30 : 75;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const particleDrift = [];

    const starColors = [
      new THREE.Color(0x00f0ff),
      new THREE.Color(0xff007f),
      new THREE.Color(0x00ffd2)
    ];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleDrift.push(0.0008 + Math.random() * 0.0012);

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometriesToDispose.push(particlesGeometry);

    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.065 : 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    materialsToDispose.push(particlesMaterial);

    const dataParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(dataParticles);

    camera.position.z = 7;

    // Mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 250;
      mouseY = (event.clientY - windowHalfY) / 250;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Target positions in 3D space (Desktop vs Mobile)
    const targetGroupPos = new THREE.Vector3();

    const checkModelVisibility = () => {
      if (window.innerWidth < 968) {
        // Shifted further down and scaled down on mobile to clear text layout space
        targetGroupPos.set(0, -2.1, -2.8); 
        infraGroup.scale.set(0.68, 0.68, 0.68);
      } else {
        targetGroupPos.set(4.0, 0.2, -1.2);
        infraGroup.scale.set(1.28, 1.28, 1.28);
      }
      infraGroup.position.copy(targetGroupPos);
    };
    checkModelVisibility();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return; // Prevent WebGL context resize on vertical scroll height changes (address bar toggle)
      lastWidth = window.innerWidth;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      checkModelVisibility();
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let animationFrameId;
    let targetScrollY = 0;
    let canvasOffset = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation based on mouse (parallax)
      targetX = mouseX * 0.35;
      targetY = mouseY * 0.35;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (-targetY - camera.position.y) * 0.04;
      
      // Look slightly higher on mobile to place the translated model in the lower part of the screen
      camera.lookAt(
        window.innerWidth < 968 ? 0 : targetGroupPos.x - 2.2, 
        window.innerWidth < 968 ? -0.5 : targetGroupPos.y, 
        targetGroupPos.z
      );

      // Update Cursor Light position to track mouse and interact with physical materials
      cursorLight.position.x += (mouseX * 5 - cursorLight.position.x) * 0.08;
      cursorLight.position.y += (-mouseY * 5 - cursorLight.position.y) * 0.08;

      // Scroll interpolation
      const currentScroll = scrollRef.current;
      targetScrollY += (currentScroll - targetScrollY) * 0.05;
      const scrollFactor = targetScrollY * 0.0006;

      const time = Date.now() * 0.001;

      
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      
      // Update dynamic live coding terminal screen on the rack console
      updateTerminal(time);

      // Blinking LEDs animation
      blinkingLeds.forEach((led) => {
        if (led.mesh && led.mesh.material) {
          const intensity = Math.sin(time * led.speed * 12 + led.offset);
          led.mesh.material.emissiveIntensity = intensity > 0.25 ? 2.8 : 0.1;
        }
      });

      // Rotating cooling fans animation
      fanGroups.forEach((fan) => {
        fan.rotation.z += 0.15;
      });
      
      // Automatic gentle float up and down
      infraGroup.position.y = targetGroupPos.y + Math.sin(time * 0.8) * 0.06 - (scrollFactor * 0.18);
      
      // Multi-axis mouse-responsive parallax tilting and slow breathing wobble (always facing user)
      const targetRotationY = 0.45 + mouseX * 0.5 + Math.sin(time * 0.4) * 0.08 + (scrollFactor * 0.12);
      const targetRotationX = 0.15 - mouseY * 0.3 + Math.cos(time * 0.4) * 0.04;
      
      // Smooth interpolation for rotational responsiveness
      infraGroup.rotation.y += (targetRotationY - infraGroup.rotation.y) * 0.08;
      infraGroup.rotation.x += (targetRotationX - infraGroup.rotation.x) * 0.08;

      // Stars floating
      const starsArr = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        starsArr[i * 3 + 1] += particleDrift[i];
        if (starsArr[i * 3 + 1] > 2.5) {
          starsArr[i * 3 + 1] = -2.5;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      dataParticles.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());

      scene.remove(dataParticles);
      scene.remove(infraGroup);
      scene.remove(cursorLight);
      scene.remove(pointLight1);
      scene.remove(pointLight2);
      scene.remove(dirLight);
      scene.remove(ambientLight);

      if (renderer.domElement.parentNode === canvasContainer) {
        canvasContainer.removeChild(renderer.domElement);
      }
      canvasContainer.classList.remove("webgl-active");
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus("sending");
    
    // Simulate SQS queue / AWS Lambda dispatch
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset back to idle after 4 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    }, 1800);
  };

  if (!mounted) {
    return null; // Safe guard against SSR flashes
  }

  return (
    <>
      {/* Loading Screen */}
      <div className={`loader ${loaderHidden ? "hidden" : ""}`} id="loader">
        <div className="loader-minimal-content">
          <div className="loader-logo mono">&lt;DURGESH /&gt;</div>
          <div className="loader-line-container">
            <div className="loader-line" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loader-progress-pct mono">{progress}%</div>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div id="canvas-container" ref={canvasContainerRef}></div>



      {/* Navigation */}
      <nav id="navbar" className={navbarScrolled ? "scrolled" : ""}>
        <div className="nav-container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, "home")}>
            <div className="logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/logo.jpg" 
                alt="Durgesh Logo" 
                width="38" 
                height="38" 
                style={{ 
                  borderRadius: '26%', 
                  border: '1.5px solid var(--primary)', 
                  boxShadow: '0 0 8px rgba(0, 240, 255, 0.4)'
                }}
                className="logo-img"
              />
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
            <h1>Hi, I&apos;m<br />Durgesh 🚀</h1>
            <div className="hero-role mono" id="typeText">{typeText}</div>
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
              <div className="code-row"><span className="line-num">2</span><span className="code-line">&nbsp;&nbsp;<span className="key">name</span>: <span className="string">&apos;Durgesh Chaudhari&apos;</span>,</span></div>
              <div className="code-row"><span className="line-num">3</span><span className="code-line">&nbsp;&nbsp;<span className="key">role</span>: <span className="string">&apos;Cloud & DevOps Engineer&apos;</span>,</span></div>
              <div className="code-row"><span className="line-num">4</span><span className="code-line">&nbsp;&nbsp;<span className="key">stack</span>: [<span className="string">&apos;MongoDB&apos;</span>, <span className="string">&apos;Express&apos;</span>,</span></div>
              <div className="code-row"><span className="line-num">5</span><span className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="string">&apos;React&apos;</span>, <span style={{ color: "#ff79c6" }}>&apos;Node.js&apos;</span>],</span></div>
              <div className="code-row"><span className="line-num">6</span><span className="code-line">&nbsp;&nbsp;<span className="key">cloud</span>: [<span className="string">&apos;AWS EC2&apos;</span>, <span className="string">&apos;S3&apos;</span>, <span className="string">&apos;Route53&apos;</span>, <span className="string">&apos;VPC&apos;</span>],</span></div>
              <div className="code-row"><span className="line-num">7</span><span className="code-line">&nbsp;&nbsp;<span className="key">devops</span>: [<span className="string">&apos;CI/CD&apos;</span>, <span className="string">&apos;Linux Admin&apos;</span>, <span className="string">&apos;Apache&apos;</span>],</span></div>
              <div className="code-row"><span className="line-num">8</span><span className="code-line">&nbsp;&nbsp;<span className="key">status</span>: <span className="string">&apos;Nominal / Ready to Deploy&apos;</span></span></div>
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
            <div className="skill-card reveal cloud-theme">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><CloudIcon /></div>
                <h3 className="skill-cat-title">Cloud Infrastructure</h3>
              </div>
              <div className="skill-badges-container">
                <span className="skill-badge">AWS EC2 / S3</span>
                <span className="skill-badge">AWS Route 53 / VPC</span>
                <span className="skill-badge">Security Groups & IAM</span>
                <span className="skill-badge">Linux System Admin</span>
                <span className="skill-badge">Apache Configuration</span>
              </div>
            </div>
            
            <div className="skill-card reveal devops-theme">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><BackendIcon /></div>
                <h3 className="skill-cat-title">DevOps & Admin</h3>
              </div>
              <div className="skill-badges-container">
                <span className="skill-badge">Git & GitHub</span>
                <span className="skill-badge">Bash Shell Scripting</span>
                <span className="skill-badge">CI/CD Pipelines</span>
                <span className="skill-badge">Docker Containers</span>
              </div>
            </div>
            
            <div className="skill-card reveal frontend-theme">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><CodeIcon /></div>
                <h3 className="skill-cat-title">Frontend Stack</h3>
              </div>
              <div className="skill-badges-container">
                <span className="skill-badge">JavaScript (ES6+)</span>
                <span className="skill-badge">HTML5 & CSS3</span>
                <span className="skill-badge">React.js Framework</span>
                <span className="skill-badge">Tailwind CSS</span>
              </div>
            </div>
            
            <div className="skill-card reveal learning-theme">
              <div className="skill-cat-header">
                <div className="skill-cat-icon"><LearningIcon /></div>
                <h3 className="skill-cat-title">Currently Learning</h3>
              </div>
              <div className="skill-badges-container">
                <span className="skill-badge">Node.js & Express</span>
                <span className="skill-badge">MongoDB Integration</span>
                <span className="skill-badge">Infrastructure as Code</span>
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
            
            {/* Project 1 */}
            <div className="project-card reveal">
              <div className="project-card-header">
                <h3 className="project-title">AWS EC2 Self-Service Management Dashboard</h3>
                <span className="status-badge live-on-aws">
                  <span className="status-dot"></span>
                  Live
                </span>
              </div>
              <p className="project-desc">Developed serverless AWS Lambda functions using Python (Boto3 SDK) to toggle EC2 runtime states, reducing active instance costs. Configured Amazon API Gateway REST endpoints to trigger Lambda functions securely via HTTPS requests from a web interface. Enforced IAM least-privilege security by authoring custom JSON policies for EC2 control, eliminating the use of root access keys. Deployed control panel UI on Vercel, integrating API Gateway endpoints and resolving CORS communication issues.</p>
              <p className="tech-stack-line mono">AWS EC2 · AWS Lambda · Python (Boto3) · Amazon API Gateway · AWS IAM · Vercel</p>
              <div className="project-card-links">
                <a href="https://github.com/durgesh885/ec2-control-dashboard" target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://ec2-control-dashboard.vercel.app" target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <ExternalLinkIcon />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card reveal">
              <div className="project-card-header">
                <h3 className="project-title">Dockerized App Deployment on AWS EC2</h3>
                <span className="status-badge configured">
                  <span className="status-dot"></span>
                  Configured
                </span>
              </div>
              <p className="project-desc">Provisioned Ubuntu virtual instances on AWS EC2, configuring Security Groups to restrict inbound network access to ports 80, 443, and 22. Authored multi-stage Dockerfiles to containerize application layers, reducing production image footprint by copying only compiled static assets. Orchestrated multi-container runtimes using Docker Compose, managing port mappings, persistent volume mounts, and secure environment variable injections. Configured Nginx as a reverse proxy inside the VM to securely route client traffic to internal container ports.</p>
              <p className="tech-stack-line mono">Docker · Docker Compose · AWS EC2 · Nginx · Ubuntu Linux</p>
              <div className="project-card-links">
                <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="#" className="project-card-link" onClick={(e) => e.preventDefault()}>
                  <ExternalLinkIcon />
                  <span>Configured</span>
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card reveal">
              <div className="project-card-header">
                <h3 className="project-title">Multi-Domain Web Server Hosting on AWS EC2</h3>
                <span className="status-badge configured">
                  <span className="status-dot"></span>
                  Configured
                </span>
              </div>
              <p className="project-desc">Deployed and configured Apache (httpd) services on Linux EC2 instances to host multiple web profiles using Virtual Hosts. Managed systemd services, directory overrides, and restricted system files using standard Linux permissions. Administered DNS records within AWS Route 53 hosted zones, mapping public domains to EC2 public IPs using A-records. Secured client-to-server traffic by automating SSL/TLS certificate installation and renewal via Certbot.</p>
              <p className="tech-stack-line mono">Apache (httpd) · AWS EC2 · AWS Route 53 · Let&apos;s Encrypt · Linux</p>
              <div className="project-card-links">
                <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="#" className="project-card-link" onClick={(e) => e.preventDefault()}>
                  <ExternalLinkIcon />
                  <span>Configured</span>
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card reveal">
              <div className="project-card-header">
                <h3 className="project-title">High-Availability Static Web Hosting on AWS S3</h3>
                <span className="status-badge configured">
                  <span className="status-dot"></span>
                  Configured
                </span>
              </div>
              <p className="project-desc">Hosted static web assets directly on AWS S3 buckets optimized for public website hosting endpoints to minimize infrastructure maintenance overhead. Authored JSON S3 bucket policies to grant secure, read-only public access to assets while protecting bucket administrative privileges. Configured Cross-Origin Resource Sharing (CORS) rules to enable secure, verified API communication with external domains.</p>
              <p className="tech-stack-line mono">AWS S3 · AWS IAM · CORS Configuration</p>
              <div className="project-card-links">
                <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="#" className="project-card-link" onClick={(e) => e.preventDefault()}>
                  <ExternalLinkIcon />
                  <span>Configured</span>
                </a>
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
                I am <strong>Durgesh Chaudhari</strong>, an aspiring Cloud Engineer currently pursuing my <strong>Master of Computer Applications (MCA)</strong>. I focus on building highly scalable system architectures, automating deployments, and administering Linux servers.
              </p>
              <p className="about-text">
                My tech journey started with full-stack web development. Understanding backend API routing triggered my curiosity about hosting environments. This led me to master <strong>AWS Cloud Services</strong> and implement modern <strong>DevOps Pipelines</strong>.
              </p>
              <p className="about-text">
                I am a strong advocate of <strong>Infrastructure as Code</strong> and hands-on laboratory setups. Configuring secure web servers, setting up SSL certificates, managing AWS Route 53 zones, and automating deployment loops are steps toward my goal of designing resilient cloud environments.
              </p>
              
              <div className="education-timeline">
                <div className="timeline-line"></div>
                <div className="timeline-items">
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-header">
                      <h3>Master of Computer Applications (MCA)</h3>
                      <span className="timeline-date">2025 – Present</span>
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
                      <span className="timeline-date">2022 – 2025</span>
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
            <h2 className="section-title">Let&apos;s Connect</h2>
            <p className="section-subtitle">Open for Cloud & DevOps internships, collaborative projects, and engineering conversations</p>
          </div>
          
          <div className="contact-layout reveal">
            {/* Left Side: Contact Form */}
            <div className="contact-form-container">
              <h3 className="contact-form-title">Send a Message ✉️</h3>
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="input-group">
                  <label htmlFor="form-name" className="mono">Name</label>
                  <input
                    type="text"
                    id="form-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="form-email" className="mono">Email Address</label>
                  <input
                    type="email"
                    id="form-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="form-message" className="mono">Message</label>
                  <textarea
                    id="form-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Durgesh, let's collaborate on a cloud project..."
                    rows="4"
                    required
                    disabled={formStatus === "sending"}
                  ></textarea>
                </div>
                
                <button type="submit" className={`btn btn-primary form-submit-btn ${formStatus}`} disabled={formStatus === "sending"}>
                  {formStatus === "idle" && <>Send Message 🚀</>}
                  {formStatus === "sending" && (
                    <span className="form-loading">
                      <svg className="spinner" viewBox="0 0 24 24" style={{ width: "18px", height: "18px", animation: "rotateSpinner 1s linear infinite", marginRight: "8px" }}>
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="42" strokeDashoffset="14" />
                      </svg>
                      Deploying Message...
                    </span>
                  )}
                  {formStatus === "success" && <>Dispatched Successfully! ✅</>}
                </button>
              </form>
              
              {formStatus === "success" && (
                <div className="form-success-banner mono" style={{ marginTop: "15px", fontSize: "12px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "10px 14px", borderRadius: "8px", color: "#a7f3d0" }}>
                  <span className="green-text">[OK]</span> SQS_Queue: Message dispatched to chaudharidurgesh493@gmail.com
                </div>
              )}
            </div>

            {/* Right Side: Quick Connect Cards */}
            <div className="contact-info-panel">
              <h3 className="contact-info-title">Connectivity Hub 🌐</h3>
              <p className="contact-info-desc">Feel free to reach out directly via email or check out my profiles on LinkedIn and GitHub.</p>
              
              <div className="info-cards-list">
                <a href="mailto:chaudharidurgesh493@gmail.com" className="info-card-item">
                  <div className="info-card-icon"><EmailIcon /></div>
                  <div className="info-card-content">
                    <div className="info-card-label mono">Direct Mail</div>
                    <div className="info-card-value">chaudharidurgesh493@gmail.com</div>
                  </div>
                  <span className="arrow-icon">→</span>
                </a>
                
                <a href="https://www.linkedin.com/in/durgesh-chaudhari" target="_blank" rel="noopener noreferrer" className="info-card-item">
                  <div className="info-card-icon"><LinkedinIcon /></div>
                  <div className="info-card-content">
                    <div className="info-card-label mono">LinkedIn</div>
                    <div className="info-card-value">Durgesh Chaudhari</div>
                  </div>
                  <span className="arrow-icon">→</span>
                </a>
                
                <a href="https://github.com/durgesh885" target="_blank" rel="noopener noreferrer" className="info-card-item">
                  <div className="info-card-icon"><GithubIcon /></div>
                  <div className="info-card-content">
                    <div className="info-card-label mono">GitHub</div>
                    <div className="info-card-value">@durgesh885</div>
                  </div>
                  <span className="arrow-icon">→</span>
                </a>
              </div>

              {/* Location Badge */}
              <div className="location-card mono" style={{ marginTop: "30px" }}>
                <div className="location-dot animate-pulse"></div>
                <span>Based in India | GMT +5:30</span>
              </div>
            </div>
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
