

<template>
   
   <div class="creator" @mouseover="scrollDisabled = true" @mouseleave="scrollDisabled = false">
      <ul class="navigation">
         <li :class="{ active: isActive(pages.identity) }" v-on:click="navigate(pages.identity)" v-tooltip="Messages.IDENTITY "> 
            <div class="icon id-card" />
         </li>
         <li :class="{ active: isActive(pages.blends) }" v-on:click="navigate(pages.blends)" v-tooltip="Messages.BLENDINGS">
            <div class="icon dna" />
         </li>
         <li :class="{ active: isActive(pages.faces) }" v-on:click="navigate(2)" v-tooltip="Messages.FACE_SHAPE"> 
            <div class="icon head" />
         </li>
         <li :class="{ active: isActive(pages.hairines) }" v-on:click="navigate(3)" v-tooltip="Messages.HAIR"> 
            <div class="icon hair" />
         </li>
         <li :class="{ active: isActive(pages.overlays) }" v-on:click="navigate(4)" v-tooltip="Messages.HEAD_OVERLAYS"> 
            <div class="icon face-scan" />
         </li>
         <li :class="{ active: isActive(pages.clothing) }" v-on:click="navigate(5)" v-tooltip="Messages.CLOTHING"> 
            <div class="icon clothing" />
         </li>

         <li class="finish">
            <div class="icon finish" v-on:click="finish()"> </div>
         </li>
      </ul>


      <div class="box">
         <transition name="fade" mode="out-in">

            <CharacterIdentity 
               v-if="page == pages.identity"
               key='identity' 
               :name="character.name"
               :lastName="character.lastName"
               :birth="character.birth"
               :origin="character.origin"
               :gender="character.gender"
               :setGender="changeGender"
            />

            <BlendData 
               v-if="page == pages.blends" 
               key='blendData' 
               :slider="slider"
               :blends="appearance.blends"
               :eyeColor="appearance.eyeColor"
            />

            <FaceFeatures 
               v-if="page == pages.faces" 
               key='faceFeatures'
               :slider="slider"
               :face="appearance.face"
            />

            <Hairines 
               v-if="page == pages.hairines" 
               key="hairines"
               :slider="slider"
               :gender="character.gender"
               :beard="appearance.beard"
               :hair="appearance.hair"
            />

            <Overlays
               v-if="page == pages.overlays"
               key="overlays"
               :slider="slider"
               :overlays="appearance.overlays"
               :overlaysToggle="appearance.overlaysToggle"
            />

            <Clothing
               v-if="page == pages.clothing"
               key="clothing"
               :slider="slider"
            />
            

         </transition>
      </div>
   </div>

</template>


<script>
   import { Messages } from '@/globals';
   import VueSlider from 'vue-slider-component';
   import 'vue-slider-component/theme/antd.css';

   import CharacterIdentity from './creator/creator.identity.vue';
   import BlendData from './creator/creator.blends.vue';
   import FaceFeatures from './creator/creator.face.vue';
   import Hairines from './creator/creator.hairiness.vue';
   import Overlays from './creator/creator.overlays.vue';
   import Clothing from './creator/creator.clothing.vue';

   export default { 
      components: { 
         VueSlider, CharacterIdentity, BlendData, FaceFeatures, Hairines, Overlays, Clothing
      }, 

      data () { 
         return { 
            
            page: 0, pages: { identity: 0, blends: 1, faces: 2, hairines: 3, overlays: 4, clothing: 5 },

            scrollDisabled: false,

            character: { 
               name: '',
               lastName: '',
               origin: null,
               birth: null,
               gender: 0
            },

            appearance: {
               blends: [0, 0, 0, 0, 0, 0],
               face: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               overlays: [255, 255, 255, 255, 255, 255, 255, 255],
               overlaysToggle: [false, false, false, false, false, false, false, false],
               hair: { style: 0, color: 0, highlight: 0 },
               beard: { style: 255, color: 0 },
               eyeColor: 0,
               clothing: [0, 0, 0, 0]
            },

            Messages, 
            
            slider: { 
               rail: { backgroundColor: '#0b0e11', borderRadius: '15px', boxShadow: '0 0 1px black' },
               process: { background: '#ffcc45', borderRadius: '25px' },
               dot: { backgroundColor: '#ffb901', borderColor: '#ffcc45' },
               dotOptions: { 
                  focusStyle: { 
                     background: '#fede29',
                     boxShadow: '0 0 0 5px rgb(255 204 69 / 20%)'
                  }
               }
            }
         }
      },

      watch: {
         appearance: {
            handler: function (value, oldVal) {
               if (window.mp) {
                  mp.events.call('CLIENT::CREATOR:BLEND', value.blends[0], value.blends[1], value.blends[2], value.blends[3], value.blends[4], value.blends[5]);
                  
                  console.log('eye dolor ' + value.eyeColor);
                  mp.events.call('CLIENT::CREATOR:EYES_COLOR', value.eyeColor);
               }
            },
            deep: true
         }
      },

      methods: { 
         navigate: function (i) { 
            this.page = i;
         },

         isActive: function (i) {
            return this.page == i ? true : false;
         },

         changeGender: function (i) {
            this.character.gender = i;
            if (window.mp) mp.events.call('CLIENT::CREATOR:GENDER', i);
         },

         finish: function () {

         }  
      },

      mounted () { 

         if (window.mp) {
            mp.invoke('focus', true);
         }

         window.addEventListener('wheel', (e) => { 
            if (!this.scrollDisabled) mp.trigger('CLIENT::PLAYER_CAMERA:ZOOM', e.deltaY);
         });

      }, 

      beforeDestroy () { 
         if (window.mp) {
            mp.invoke('focus', false);
         }
      }
   }

</script>

<style scoped>

  .creator { 
     position: absolute;
     left: 0;
     top: 0;
     width: 575px;
     height: 100%;
     display: flex;
     z-index: 9999;
     justify-content: space-between;
     align-items: center;
  }


   ul.navigation {
      position: relative;
      padding: 0;
      list-style: none;
      margin: 0;
      width: 135px;
      height: 100%;
      background: rgb(11, 14, 17);
      box-shadow: rgb(0 0 0 / 25%) 0px 1px 20px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   ul.navigation li, ul.navigation li * { transition: all .35s ease; }

   ul.navigation li { 
      width: 70px;
      height: 70px;
      margin: 20px 0;
      background: #181a20; 
      box-shadow: rgb(0 0 0 / 15%) 0px 1px 20px 0px;
      position: relative; 
      padding: 5px; 
      border-radius: 10px;
      display: grid;
      overflow: hidden;
   }

   ul.navigation li:hover .icon { background: #cdcdcd; }

   ul.navigation li.finish { background: #ffb901; box-shadow: 0 3px 15px rgb(255 204 69 / 5%); border-radius: 100%; }
   ul.navigation li.finish .icon { background: #181a20; }
   ul.navigation li.finish:hover { filter: brightness(1.15); }
   ul.navigation li.finish:hover .icon { background: #cdcdcd; }

   ul.navigation li.active .icon { 
      background: #7c5bf1;
   }

   .icon { width: 35px; height: 35px; background-color: #848e9c; margin: auto; }

   .icon.id-card { mask: url('../assets/images/icons/id-card.svg') no-repeat center; mask-size: cover; }
   .icon.dna { mask: url('../assets/images/icons/dna.svg') no-repeat center; mask-size: cover; }
   .icon.head { mask: url('../assets/images/icons/head.svg') no-repeat center; mask-size: cover; }
   .icon.hair { mask: url('../assets/images/icons/hair.svg') no-repeat center; mask-size: cover; }
   .icon.clothing { mask: url('../assets/images/icons/clothing.svg') no-repeat center; mask-size: cover; }

   .icon.face-scan { mask: url('../assets/images/icons/face-scan.svg') no-repeat center; mask-size: cover; }
   .icon.finish { mask: url('../assets/images/icons/check-mark.svg') no-repeat center; mask-size: cover; }

   .box { width: 440px; height: 100%; display: grid; background: linear-gradient(90deg, rgb(24 26 32 / 75%), transparent); }


</style>
