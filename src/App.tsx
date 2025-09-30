import React, { Suspense, useEffect, useRef, useState } from 'react'
// Optimisation : Import dynamique des icônes avec React.lazy
const Activity = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Activity })))
const Cpu = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Cpu })))
const Database = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Database })))
const Globe = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Globe })))
const MemoryStick = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.MemoryStick })))
const Timer = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Timer })))
const Zap = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap })))
const Layers = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Layers })))
const FileText = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.FileText })))
const FilePlus = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.FilePlus })))
const Image = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Image })))
const Cloud = React.lazy(() => import('lucide-react').then(mod => ({ default: mod.Cloud })))
import * as THREE from 'three'
import _ from 'lodash'

type Stat = {
  bundle: number
  weight: number
  dom: number
  resources: number
  js: number
  css: number
  img: number
  cache: number
  memory: number
  load: number
  rps: number
  pl: number
}

const limits = {
  weight: [512_000, 1_048_576],
  dom: [1_000, 2_000],
  resources: [50, 100],
  js: [153_600, 307_200],
  css: [51_200, 102_400],
  img: [307_200, 716_800],
  cache: [0.6, 0.4]
}

const color = (v: number, [g, y]: number[], inv = false) =>
  inv
    ? v >= g
      ? 'border-green-500/30 bg-green-500/20'
      : v >= y
      ? 'border-yellow-500/30 bg-yellow-500/20'
      : 'border-red-500/30 bg-red-500/20'
    : v <= g
    ? 'border-green-500/30 bg-green-500/20'
    : v <= y
    ? 'border-yellow-500/30 bg-yellow-500/20'
    : 'border-red-500/30 bg-red-500/20'

export default function App() {
  const [stats, setStats] = useState<Stat>({
    bundle: 0,
    weight: 0,
    dom: 0,
    resources: 0,
    js: 0,
    css: 0,
    img: 0,
    cache: 0,
    memory: 0,
    load: 0,
    rps: 0,
    pl: 0
  })
  const [ready, setReady] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const injectedRef = useRef(false)
  const intervalRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1_000)
    camera.position.z = 30
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 480)
    renderer.setPixelRatio(window.devicePixelRatio)
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(25, 25, 25)
    scene.add(dir)
    // Optimisation : Réutilisation des géométries et matériaux pour réduire la mémoire GPU
    const sharedGeo = new THREE.BoxGeometry(1, 1, 1)
    const materials = Array.from({ length: 5 }, () => 
      new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff, shininess: 80 })
    )
    
    // Réduction du nombre de cubes de 20 à 12 pour optimiser les performances
    for (let i = 0; i < 12; i++) {
      const scale = 1 + Math.random()
      const cube = new THREE.Mesh(sharedGeo, materials[i % materials.length])
      cube.scale.set(scale, scale, scale)
      cube.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
      scene.add(cube)
    }
    // Optimisation : Stockage des meshes dans un tableau pour éviter les traversées de scène
    const meshes = scene.children.filter((obj): obj is THREE.Mesh => obj instanceof THREE.Mesh)
    
    // Optimisation : Utilisation de requestAnimationFrame avec contrôle du framerate
    let lastTime = 0
    const targetFPS = 30 // Limite à 30 FPS pour réduire la consommation CPU
    const frameInterval = 1000 / targetFPS
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval)
        
        // Animation directe des meshes sans traversée de scène
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += 0.002 * ((i % 3) + 1)
          mesh.rotation.y += 0.003 * ((i % 4) + 1)
        })
        
      renderer.render(scene, camera)
      }
      
      requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
    const onResize = _.throttle(() => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }, 200)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      scene.traverse((o: any) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          Array.isArray(o.material) ? o.material.forEach((m: any) => m.dispose()) : o.material.dispose()
        }
      })
    }
  }, [])

  useEffect(() => {
    if (injectedRef.current) return
    injectedRef.current = true
    const loadAssets = () => {
      const h = document.head
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'http://localhost:5001/static/big.css'
      h.appendChild(link)
      const script = document.createElement('script')
      script.src = 'http://localhost:5001/static/big.js'
      script.crossOrigin = 'anonymous'
      h.appendChild(script)
    }
    document.readyState === 'complete'
      ? loadAssets()
      : window.addEventListener('load', loadAssets, { once: true })
  }, [])

  useEffect(() => {
    const startTime = performance.now();

    const computeStats = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      if (!nav) return;

      const totalWeight = nav.transferSize + resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const jsWeight = resources.filter(r => r.initiatorType === 'script').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const cssWeight = resources.filter(r => r.initiatorType === 'link').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const imgWeight = resources
        .filter(
          r =>
            r.initiatorType === 'img' ||
            r.initiatorType === 'css' ||
            /\.(jpg|jpeg|png|gif|webp)$/i.test(r.name)
        )
        .reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const totalEncoded = nav.encodedBodySize + resources.reduce((sum, r) => sum + (r.encodedBodySize || 0), 0);
      const cacheRatio = totalEncoded ? 1 - totalWeight / totalEncoded : 0;

      setStats(s => ({
        ...s,
        bundle: nav.transferSize,
        weight: totalWeight,
        dom: document.getElementsByTagName('*').length,
        resources: resources.length,
        js: jsWeight,
        css: cssWeight || s.css,
        img: imgWeight || s.img,
        cache: cacheRatio,
        pl: Math.round(performance.now() - startTime)
      }));
      setReady(true);
    };

    if (document.readyState === 'complete') {
      computeStats();
    } else {
      window.addEventListener('load', computeStats, { once: true });
    }

    // Ajout du rafraîchissement périodique
    const interval = setInterval(computeStats, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const po = new PerformanceObserver(list => {
      const res = list.getEntries() as PerformanceResourceTiming[]
      const added = res.reduce((a, b) => a + (b.transferSize || 0), 0)
      const jsAdd = res.filter(r => r.initiatorType === 'script').reduce((a, b) => a + (b.transferSize || 0), 0)
      const cssAdd = res.filter(r => r.initiatorType === 'link' || /\.css$/i.test(r.name)).reduce((a, b) => a + (b.transferSize || 0), 0) 
      const isImg = (r: PerformanceResourceTiming) => r.initiatorType === 'img' || r.initiatorType === 'css' || /\.(avif|jpe?g|png|gif|webp|svg)$/i.test(r.name);
      const imgAdd = res.filter(isImg).reduce((a, b) => a + (b.transferSize || 0), 0);
      const encAdd = res.reduce((a, b) => a + (b.encodedBodySize || 0), 0)
      setStats(s => {
        const weight = s.weight + added
        const enc = (1 - s.cache) * s.weight + encAdd
        const cache = enc ? 1 - weight / enc : s.cache
        return { ...s, weight, js: s.js + jsAdd, css: s.css + cssAdd, img: s.img + imgAdd, cache }
      })
    })
    po.observe({ type: 'resource', buffered: true })
    return () => po.disconnect()
  }, [])

  // Enregistrement du Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker enregistré avec succès:', registration);
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
        });
    }
  }, []);

  // Configuration de la connexion WebSocket
  useEffect(() => {
    // Création de la connexion WebSocket
    const ws = new WebSocket('ws://localhost:5001');
    
    // Gestion des messages WebSocket
    ws.onmessage = (event) => {
      try {
        const { memory, load, rps } = JSON.parse(event.data);
        setStats(s => ({
          ...s,
          memory: Math.ceil(memory / 1_048_576),
          load,
          rps
        }));
      } catch (err) {
        console.warn('Erreur lors du traitement des données WebSocket:', err);
      }
    };

    // Gestion de la reconnexion en cas de déconnexion
    ws.onclose = () => {
      console.log('WebSocket déconnecté. Tentative de reconnexion dans 5s...');
      setTimeout(() => {
        setStats(s => ({ ...s, memory: 0, load: 0, rps: 0 }));
      }, 5000);
    };

    // Nettoyage à la destruction du composant
    return () => {
      ws.close();
    };
  }, []);

  // Optimisation : Composant de chargement avec moins d'éléments DOM
  if (!ready)
    return (
      <div className="grid place-items-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="animate-spin h-24 w-24 rounded-full border-b-2 border-white" role="progressbar" aria-label="Chargement" />
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Optimisation : Utilisation d'images WebP avec fallback et lazy loading */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <picture>
          <source
            srcSet="http://localhost:5001/static/optimized/large-background.avif"
            type="image/avif"
          />
          <source
            srcSet="http://localhost:5001/static/optimized/large-background.webp"
            type="image/webp"
          />
          <img
            src="http://localhost:5001/static/optimized/large-background.jpg"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            loading="lazy"
            alt="Background texture"
          />
        </picture>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-pulse">
            EcoTraining Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">Plateforme d'entraînement avancée pour l'optimisation web et l'éco-conception</p>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Database className="w-8 h-8 text-purple-400" /></Suspense>} title="Poids HTML" value={`${(stats.bundle / 1_024).toFixed(0)} kB`} tone={color(stats.bundle, limits.weight)} tip="transferSize du document" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Globe className="w-8 h-8 text-blue-400" /></Suspense>} title="Poids page" value={`${(stats.weight / 1_024).toFixed(0)} kB`} tone={color(stats.weight, limits.weight)} tip="somme transferSize" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Layers className="w-8 h-8 text-teal-400" /></Suspense>} title="DOM" value={stats.dom} tone={color(stats.dom, limits.dom)} tip="nombre de nœuds" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Activity className="w-8 h-8 text-green-400" /></Suspense>} title="Ressources" value={stats.resources} tone={color(stats.resources, limits.resources)} tip="entries PerformanceResourceTiming" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><FileText className="w-8 h-8 text-fuchsia-400" /></Suspense>} title="JS" value={`${(stats.js / 1_024).toFixed(0)} kB`} tone={color(stats.js, limits.js)} />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><FilePlus className="w-8 h-8 text-sky-400" /></Suspense>} title="CSS" value={`${(stats.img / 1024).toFixed(1)} kB`} tone={color(stats.css, limits.css)} />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Image className="w-8 h-8 text-amber-400" /></Suspense>} title="Images" value={`${(stats.img / 1_024).toFixed(0)} kB`} tone={color(stats.img, limits.img)} />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Cloud className="w-8 h-8 text-emerald-400" /></Suspense>} title="Cache hit" value={`${Math.round(stats.cache * 100)} %`} tone={color(stats.cache, limits.cache, true)} />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><MemoryStick className="w-8 h-8 text-red-400" /></Suspense>} title="RAM serveur" value={`${stats.memory} MB`} tone="bg-white/10 border-white/20" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Cpu className="w-8 h-8 text-indigo-400" /></Suspense>} title="CPU" value={stats.load} tone="bg-white/10 border-white/20" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Activity className="w-8 h-8 text-lime-400" /></Suspense>} title="RPS" value={stats.rps} tone="bg-white/10 border-white/20" />
          <Card icon={<Suspense fallback={<div className="w-8 h-8" />}><Timer className="w-8 h-8 text-yellow-400" /></Suspense>} title="Load page" value={`${stats.pl} ms`} tone="bg-white/10 border-white/20" />
        </section>
        <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Suspense fallback={<div className="w-8 h-8" />}><Zap className="w-8 h-8 text-yellow-400" /></Suspense>
            <h2 className="text-2xl font-bold text-white">Visualisation 3D</h2>
          </div>
          <div className="flex justify-center">
            <canvas ref={canvasRef} className="rounded-xl border border-white/20 shadow-2xl w-full h-96" />
          </div>
          <p className="text-slate-300 text-center mt-4">12 cubes optimisés tournants en temps réel (30 FPS)</p>
        </section>
      </div>
    </div>
  )
}

// Optimisation : Composant Card memoïsé pour éviter les re-rendus inutiles
const Card = React.memo(function Card({ icon, title, value, tone, tip }: { icon: React.ReactNode; title: string; value: string | number; tone: string; tip?: string }) {
  return (
    <div 
      className={`backdrop-blur-lg rounded-2xl p-8 border hover:bg-white/15 hover:scale-105 transition ${tone}`} 
      title={tip || ''}
      // Optimisation : Utilisation de l'attribut translate="no" pour les éléments qui ne nécessitent pas de traduction
      translate="no"
    >
      {/* Optimisation : Réduction du nombre d'éléments DOM en utilisant un seul conteneur flex */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
        {icon}
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Optimisation : Fonction de comparaison personnalisée pour le memo
  return prevProps.value === nextProps.value && prevProps.tone === nextProps.tone
})