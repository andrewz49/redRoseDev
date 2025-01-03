<template>
  <div ref="rose"></div>
</template>


<script setup>
import { ref, onMounted } from "vue"

import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

const rose = ref("")

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 4.6, 3.6);  // 试试调整到 (0, 2, 10)
  camera.lookAt(0, 1, -1);  // 确保相机朝向场景中心

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('app').appendChild(renderer.domElement);

  // 添加光源
  const light = new THREE.AmbientLight('fff', 0.5); // 环境光
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight('fff', 1); // 平行光
  directionalLight.position.set(10, 15, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5, 50); // 点光源
  pointLight.position.set(0, 1, 3); // 放在茎部附近
  scene.add(pointLight);

  scene.background = new THREE.Color('#c9e3e7');
  const textureLoader = new THREE.TextureLoader();


  const texture1 = textureLoader.load('src/assets/textures/m_petal_roughness.jpg');
  const texture2 = textureLoader.load('src/assets/textures/m_stem_roughness.jpg');
  const texture3 = textureLoader.load('src/assets/textures/m_leafs_roughness.jpg');
  const texture4 = textureLoader.load('src/assets/textures/m_thorns_roughness.jpg');
  // 加载 FBX 模型
  const loader = new FBXLoader();
  loader.load(
    'src/assets/fbx/rose01.fbx', // 模型文件路径
    (object) => {
      console.log('资源', object);
      object.traverse((child) => {
        if (child.isMesh) {
          // 给每个 Mesh 添加纹理
          child.material.forEach( item => {
            console.log(item.name,item)
            if(item.name == 'm_petal' ){ // 花朵
              item.map = texture1;
              item.needsUpdate = true
            }
            if(item.name == 'm_stem' ){ // 茎
              item.map = texture2;
              item.emissive = new THREE.Color( 0x355e3b );
              item.emissiveIntensity = 0.2;
              item.needsUpdate = true
            }
            if(item.name == 'm_leafs' ){ // 叶
              item.map = texture3;
              item.roughness = 0.8;
              item.metalness = 0.0;
              item.emissive = new THREE.Color( 0x6b8e23 );
              item.emissiveIntensity = 0.2;
              item.needsUpdate = true;
            }
            if(item.name == 'm_thorns' ){ // 刺
              item.map = texture4;
              item.needsUpdate = true
            }
          } )
        }
      });
      scene.add(object);
      object.scale.set(0.034, 0.034, 0.034);  // 根据需要调整模型大小
      setInterval(
        ()=>{
          object.rotation.y += 0.01
          renderer.render(scene, camera);
        },30
      )
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading FBX:', error);
    }
  );
})




</script>