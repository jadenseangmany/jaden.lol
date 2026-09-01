import * as THREE from "three";

export type CanopyHandle = {
  dispose: () => void;
};

type Options = {
  reduced: boolean;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function leafCanvas() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.clearRect(0, 0, size, size);
  ctx.translate(size / 2, size / 2);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, -52);
  ctx.bezierCurveTo(38, -28, 44, 8, 18, 38);
  ctx.quadraticCurveTo(8, 48, 0, 54);
  ctx.quadraticCurveTo(-8, 48, -18, 38);
  ctx.bezierCurveTo(-44, 8, -38, -28, 0, -52);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.quadraticCurveTo(6, 8, 0, 52);
  ctx.stroke();
  return canvas;
}

function sunCanvas() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,250,1)");
  g.addColorStop(0.12, "rgba(255,244,180,0.95)");
  g.addColorStop(0.28, "rgba(255,221,87,0.55)");
  g.addColorStop(0.5, "rgba(143,191,74,0.22)");
  g.addColorStop(0.72, "rgba(61,154,85,0.08)");
  g.addColorStop(1, "rgba(18,18,18,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function makeScribble(rng: () => number, spread: number) {
  const pts: THREE.Vector3[] = [];
  const turns = 5 + Math.floor(rng() * 4);
  const tilt = (rng() - 0.5) * 1.2;
  const lift = 14 + rng() * 18;
  const radius = 6 + rng() * spread;
  for (let i = 0; i <= turns * 8; i += 1) {
    const t = i / (turns * 8);
    const a = t * Math.PI * 2 * (0.7 + rng() * 0.5) + rng() * 0.4;
    const r = radius * (0.45 + t * 0.7);
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * r + (rng() - 0.5) * 1.4,
        lift + Math.sin(t * Math.PI) * 8 + (rng() - 0.5),
        Math.sin(a) * r * 0.85 + t * tilt * 10,
      ),
    );
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
  geo.computeBoundingSphere();
  return geo;
}

export function createCanopy(parent: HTMLElement, options: Options): CanopyHandle {
  const reduced = options.reduced;
  const mobile = Math.min(window.innerWidth, window.innerHeight) < 720;
  const rng = mulberry32(20260817);
  const leafCount = reduced ? 280 : mobile ? 620 : 1280;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07140c);
  scene.fog = new THREE.Fog(0x07140c, 16, 48);

  const camera = new THREE.PerspectiveCamera(66, 1, 0.1, 80);
  camera.up.set(0, 0, -1);
  camera.position.set(0.12, 2.6, 1.4);
  camera.lookAt(0.2, 26, 0.8);

  const renderer = new THREE.WebGLRenderer({
    antialias: !mobile,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.78;
  renderer.domElement.className = "canopy-canvas";
  renderer.domElement.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;max-width:100%;max-height:100%;";
  parent.append(renderer.domElement);

  const leafMap = new THREE.CanvasTexture(leafCanvas());
  leafMap.colorSpace = THREE.SRGBColorSpace;

  const leafGeo = new THREE.PlaneGeometry(1, 1.35);
  const leafMat = new THREE.MeshBasicMaterial({
    map: leafMap,
    color: 0xffffff,
    transparent: true,
    alphaTest: 0.28,
    side: THREE.DoubleSide,
    depthWrite: true,
    fog: true,
  });

  const time = { value: 0 };
  leafMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>\nuniform float uTime;`,
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       float sway = sin(uTime * 0.55 + transformed.x * 0.35 + transformed.z * 0.28);
       transformed.x += sway * 0.16;
       transformed.z += cos(uTime * 0.4 + transformed.y * 0.2) * 0.1;`,
    );
  };

  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
  leaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const lime = new THREE.Color(0x8fbf4a);
  const meadow = new THREE.Color(0x3d9a55);
  const deep = new THREE.Color(0x1e4a2c);
  const pollen = new THREE.Color(0xffdd57);

  for (let i = 0; i < leafCount; i += 1) {
    const theta = rng() * Math.PI * 2;
    const hole = 0.16 + rng() * 0.08;
    const phi = hole + rng() * 1.05;
    const radius = 7 + rng() * 24;
    const x = Math.sin(phi) * Math.cos(theta) * radius;
    const y = 7 + Math.cos(phi) * radius * 1.15;
    const z = Math.sin(phi) * Math.sin(theta) * radius;
    dummy.position.set(x, y, z);
    dummy.lookAt(0, 1.5, 0);
    dummy.rotateZ(rng() * Math.PI);
    dummy.rotateX((rng() - 0.5) * 0.6);
    const scale = 0.7 + rng() * 1.8;
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    leaves.setMatrixAt(i, dummy.matrix);

    const sun = Math.exp(-phi * phi * 3.2);
    color.copy(deep).lerp(meadow, rng());
    color.lerp(lime, sun * 0.85);
    color.lerp(pollen, sun * sun * 0.45);
    color.multiplyScalar(0.42 + sun * 0.4);
    leaves.setColorAt(i, color);
  }
  leaves.instanceMatrix.needsUpdate = true;
  if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
  scene.add(leaves);

  const trunkMat = new THREE.MeshBasicMaterial({ color: 0x0b0907 });
  const trunks = new THREE.Group();
  const trunkCount = mobile ? 12 : 18;
  const yAxis = new THREE.Vector3(0, 1, 0);
  const sunAim = new THREE.Vector3(0.6, 48, 0.15);
  for (let i = 0; i < trunkCount; i += 1) {
    const theta = (i / trunkCount) * Math.PI * 2 + (rng() - 0.5) * 0.2;
    const r = 5.4 + rng() * 6.5;
    const h = 28 + rng() * 16;
    const base = new THREE.Vector3(Math.cos(theta) * r, -2, Math.sin(theta) * r);
    const dir = sunAim.clone().sub(base).normalize();
    const geo = new THREE.CylinderGeometry(
      0.05 + rng() * 0.08,
      0.16 + rng() * 0.2,
      h,
      5,
    );
    const mesh = new THREE.Mesh(geo, trunkMat);
    mesh.position.copy(base).addScaledVector(dir, h * 0.45);
    mesh.quaternion.setFromUnitVectors(yAxis, dir);
    trunks.add(mesh);

    if (rng() > 0.45) {
      const bh = 4 + rng() * 5;
      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.07, bh, 4),
        trunkMat,
      );
      const outward = new THREE.Vector3(base.x, 0, base.z).normalize();
      outward.y = 0.35 + rng() * 0.4;
      outward.normalize();
      branch.position.copy(mesh.position).addScaledVector(dir, 4 + rng() * 6);
      branch.quaternion.setFromUnitVectors(yAxis, outward);
      trunks.add(branch);
    }
  }
  scene.add(trunks);

  const sunTex = new THREE.CanvasTexture(sunCanvas());
  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: sunTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      transparent: true,
    }),
  );
  sun.position.set(0.35, 36, -7.5);
  sun.scale.set(11, 11, 1);
  scene.add(sun);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff8d6, fog: false }),
  );
  core.position.copy(sun.position);
  scene.add(core);

  const rays = new THREE.Group();
  const rayMat = new THREE.MeshBasicMaterial({
    color: 0xf7f4ee,
    transparent: true,
    opacity: 0.028,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
  });
  for (let i = 0; i < 8; i += 1) {
    const ray = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 36), rayMat);
    ray.position.copy(sun.position);
    ray.rotation.z = (i / 8) * Math.PI;
    ray.rotation.y = rng() * 0.4;
    rays.add(ray);
  }
  scene.add(rays);

  const scribbles = new THREE.Group();
  const stroke = new THREE.LineDashedMaterial({
    color: 0xf7f4ee,
    transparent: true,
    opacity: 0.62,
    dashSize: 1.6,
    gapSize: 0.35,
    scale: 1,
  });
  for (let i = 0; i < 7; i += 1) {
    const geo = makeScribble(rng, 11 + i);
    const line = new THREE.Line(geo, stroke.clone());
    line.computeLineDistances();
    scribbles.add(line);
  }
  scene.add(scribbles);

  const dustGeo = new THREE.BufferGeometry();
  const dustCount = reduced ? 40 : 120;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) {
    dustPos[i * 3] = (rng() - 0.5) * 28;
    dustPos[i * 3 + 1] = 8 + rng() * 30;
    dustPos[i * 3 + 2] = (rng() - 0.5) * 28;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xffdd57,
      size: 0.08,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(dust);

  function resize() {
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, true);
  }
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  let raf = 0;
  let alive = true;
  const started = performance.now();

  function frame(now: number) {
    if (!alive) return;
    if (document.hidden) {
      raf = 0;
      return;
    }
    const t = (now - started) / 1000;
    if (!reduced) time.value = t;

    const page = document.getElementById("top");
    const max = Math.max(
      1,
      (page?.scrollHeight ?? document.documentElement.scrollHeight) -
        window.innerHeight,
    );
    const p = window.scrollY / max;
    const travel = reduced ? 0 : p;

    camera.position.set(
      0.12 + Math.sin(travel * Math.PI * 2) * 0.7,
      2.6 + travel * 7.5,
      1.4 + Math.cos(travel * Math.PI * 1.35) * 0.55,
    );
    camera.lookAt(0.2 + travel * 0.3, 26 + travel * 5, 0.8 - travel * 1.2);
    leaves.rotation.y = travel * 0.28 + (reduced ? 0 : t * 0.012);
    trunks.rotation.y = travel * 0.12;
    scribbles.rotation.y = travel * 0.55;
    scribbles.rotation.z = Math.sin(travel * Math.PI) * 0.08;
    rays.rotation.z = (reduced ? 0 : t * 0.03) + travel * 0.2;
    dust.rotation.y = travel * 0.2 + t * 0.02;
    const sunMat = sun.material as THREE.SpriteMaterial;
    sunMat.rotation = reduced ? 0 : t * 0.02;
    scribbles.children.forEach((child, index) => {
      child.rotation.y = (reduced ? 0 : t * 0.04) * (index % 2 === 0 ? 1 : -1);
    });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  function onVis() {
    if (document.hidden || !alive) return;
    if (!raf) raf = requestAnimationFrame(frame);
  }
  document.addEventListener("visibilitychange", onVis);

  return {
    dispose() {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      renderer.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      leafMap.dispose();
      sunTex.dispose();
      dustGeo.dispose();
      trunkMat.dispose();
      rayMat.dispose();
      scribbles.traverse((obj) => {
        if (obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.domElement.remove();
    },
  };
}
