class Portfolio3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    // Move camera back to see the whole globe
    this.camera.position.z = 250;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Track mouse and scroll
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.scrollY = 0;
    
    this.globe = new THREE.Group();
    this.scene.add(this.globe);

    this.init();
    this.addListeners();
    this.animate();
  }

  init() {
    // 1. Create the Globe (Earth)
    const radius = 60;
    const segments = 32;
    
    // Base Sphere (transparent)
    const sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f172a, // Dark blue-black slate
      transparent: true,
      opacity: 0.8
    });
    const baseSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.globe.add(baseSphere);

    // Wireframe Sphere (longitude/latitude lines)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo accent
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframeSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    this.globe.add(wireframeSphere);

    // 2. Add Location Markers (Chandigarh and Paris)
    // Roughly approximate coordinates for visual purposes on a generic sphere
    
    // Helper function to convert lat/long to 3D position on sphere
    const addMarker = (lat, lon, color, label) => {
      // Math to convert lat/lon to 3D cartesian coordinates
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));
      
      // Marker geometry (a glowing dot)
      const markerGeo = new THREE.SphereGeometry(2, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: color });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      
      marker.position.set(x, y, z);
      this.globe.add(marker);
      
      // Add a subtle ring around the marker
      const ringGeo = new THREE.RingGeometry(3, 3.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({ 
        color: color, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.5 
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, z);
      ring.lookAt(new THREE.Vector3(0,0,0)); // Face outward
      this.globe.add(ring);
    };

    // Add markers
    // Chandigarh, India (approx lat: 30.73, lon: 76.77)
    addMarker(30.73, 76.77, 0xec4899, "Chandigarh"); 
    
    // Paris, France (approx lat: 48.85, lon: 2.35)
    addMarker(48.85, 2.35, 0x38bdf8, "Paris");

    // Connect the two markers with an arc (curve)
    this.createFlightPath(30.73, 76.77, 48.85, 2.35, radius);

    // 3. Add Ambient Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 800;
    const starsArray = new Float32Array(starsCount * 3);
    
    for(let i = 0; i < starsCount * 3; i++) {
      starsArray[i] = (Math.random() - 0.5) * 600;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(stars);
    
    // Tilt the globe slightly for aesthetics
    this.globe.rotation.x = 0.2;
    // Set initial rotation so India is visible
    this.globe.rotation.y = -1.5;
  }

  createFlightPath(lat1, lon1, lat2, lon2, radius) {
    // Simple quadratic curve between two points on the sphere, arching outward
    const getPos = (lat, lon, r) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        (r * Math.cos(phi)),
        (r * Math.sin(phi) * Math.sin(theta))
      );
    };

    const p1 = getPos(lat1, lon1, radius);
    const p2 = getPos(lat2, lon2, radius);
    
    // Midpoint floating slightly above the globe
    const midPoint = p1.clone().lerp(p2, 0.5).normalize().multiplyScalar(radius + 15);

    const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
    
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.5
    });
    
    const arcLine = new THREE.Line(geometry, material);
    this.globe.add(arcLine);
  }

  addListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    // Calculate normalized mouse coordinates (-1 to +1)
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    this.scrollY = window.scrollY;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth mouse parallax
    this.targetX = this.mouseX * 0.1;
    this.targetY = this.mouseY * 0.1;
    
    // Auto-rotate the globe slowly
    this.globe.rotation.y += 0.001;
    
    // Parallax effect on entire scene based on mouse
    this.scene.rotation.y += 0.05 * (this.targetX - this.scene.rotation.y);
    this.scene.rotation.x += 0.05 * (this.targetY - this.scene.rotation.x);

    // Scroll effect (moves camera back and down as you scroll down the page)
    this.camera.position.y = -this.scrollY * 0.03;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.portfolio3D = new Portfolio3D('canvas-container');
  }
});
