

<template>
   <div class="model-preview" id="mpreview">

   </div>
</template>

<script>
   import * as THREE from 'three';
   import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

   export default {
      props: { 
         model: String
      },
      
      data () {
         return { 
            scene: null,
            camera: null,
            renderer: null,
            loader: null,
         }
      },

      mounted () {
         this.scene = new THREE.Scene();
         this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

         this.renderer = new THREE.WebGLRenderer();
         this.renderer.setSize(window.innerWidth, window.innerHeight);

         const element = document.getElementById('mpreview');
         element.append(this.renderer.domElement);

         this.loader = new GLTFLoader();
         
         this.loader.load('./NeilArmstrong.gltf', function (gltf) {
            this.scene.add(gltf.scene);
         }, undefined, function (error) {
            console.error(error);
         });
      }
   }
</script>

<style scoped>
   .model-preview {
      width: 100%;
      height: 100%;
   }
</style>