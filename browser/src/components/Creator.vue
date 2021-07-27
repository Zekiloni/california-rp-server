

<template>
   
   <div class="creator">

      <ul class="navigation">
         <li :class="{ 'active': isActive(0) }" v-on:click="Navigate(0)"> 
            <div class="icon id-card" />
            {{ Messages.IDENTITY }} 
         </li>
         <li :class="{ 'active': isActive(1) }" v-on:click="Navigate(1)">
            <div class="icon dna" />
            {{ Messages.BLENDINGS }} 
         </li>
         <li :class="{ 'active': isActive(2) }" v-on:click="Navigate(2)"> 
            <div class="icon head" />
            {{ Messages.FACE_SHAPE }} 
         </li>
         <li :class="{ 'active': isActive(3) }" v-on:click="Navigate(3)"> 
            <div class="icon hair" />
            {{ Messages.HAIR }} 
         </li>
         <li :class="{ 'active': isActive(4) }" v-on:click="Navigate(4)"> 
            <div class="icon face-scan" />
            {{ Messages.HEAD_OVERLAYS }} 
         </li>
         <li :class="{ 'active': isActive(5) }" v-on:click="Navigate(5)"> 
            <div class="icon clothing" />
            {{ Messages.CLOTHING }} 
         </li>
      </ul>

      <ul class="info">
         <li v-for="(Help, i) in Info" :key=i :class="{ completed: Help.Task && Help.Completed() } ">
            <h3> {{ Help.Title }} </h3>
            <p v-html="Help.Content"> </p>
         </li>
      </ul>

      <transition name="fade">

         <div class="page" v-if="Page == 0" key=Identity @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <label> {{ Messages.FIRST_NAME }} </label>
            <input type="text" v-model="Character.First_Name">

            <label> {{ Messages.LAST_NAME }} </label>
            <input type="text" v-model="Character.Last_Name">

            <label> {{ Messages.ORIGIN }} </label>
            <input type="text" v-model="Character.Origin">

            <label> {{ Messages.BIRTH }} </label>
            <input type="date" v-model="Character.Birth">

            <ul class="genders"> 
               <label> {{ Messages.GENDER }} </label>
               <li class="gender icon male-gender" :class="{ selected: Character.Gender == 0 }" v-on:click="Gender(0)"> </li>
               <li class="gender icon female-gender" :class="{ selected: Character.Gender == 1 }" v-on:click="Gender(1)"> </li>
            </ul>

         </div>

         <div class="page" v-if="Page == 1" key=Blendings @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <div class="slider" v-for="(Blend, i) in Appearance.Blend_Data" :key=i>
               <label> {{ Messages.BLEND_DATA[i] }} </label>
               <vue-slider 
                  v-model=Appearance.Blend_Data[i] 
                  :max=Blend_Data.Maximums[i] 
                  :min=Blend_Data.Minimums[i] 
                  :interval=Blend_Data.Step[i] 
                  :railStyle=Slider.Rail 
                  :processStyle=Slider.Process
                  :dotStyle=Slider.Dot
                  :dotOptions=Slider.DotOptions
               />
            </div>
         </div>

         <div class="page" v-if="Page == 2" key=Face @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <div class="slider" v-for="(Face, i) in Appearance.Face" :key=i>
               <label> {{ Messages.FACE_FEATURES[i] }} </label>
               <vue-slider 
                  v-model=Appearance.Face[i] 
                  :max=Face_Features.Max
                  :min=Face_Features.Min
                  :interval=Face_Features.Interval
                  :railStyle=Slider.Rail 
                  :processStyle=Slider.Process
                  :dotStyle=Slider.Dot
                  @dragging="val => FaceFeature(i, val)"
                  :dotOptions=Slider.DotOptions
               />
            </div>
         </div>

         <div class="page" v-if="Page == 3" key=Hair_Beard @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <div class="component">
               <vue-slider 
                  v-model=Appearance.Hair[0] 
                  :max=Hair_Styles[Character.Gender]
                  :min=0
                  :railStyle=Slider.Rail 
                  :processStyle=Slider.Process
                  :dotStyle=Slider.Dot
                  @dragging="val => Hair(0, val)"
                  :dotOptions=Slider.DotOptions
               />
               <ul class="colors"> 
                  <li class="color" 
                     v-for="(Color, i) in Hair_Colors" 
                     :key=Color 
                     :class="{ selected: Selected.Hair_Color == i }"
                     :style="{ backgroundColor: Color }" 
                     v-on:click="Hair(1, i)"
                  > 
                  </li> 
               </ul>
            </div>
         </div>

         <div class="page" v-if="Page == 4" key=Overlays @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <div class="slider" v-for="(Overlay, i) in Appearance.Overlays" :key=i>
               <label> {{ Head_Overlays.Names[i] }} </label>
               <vue-slider 
                  v-model=Appearance.Overlays[i] 
                  :max=Head_Overlays.Maximums[i]
                  :min=0
                  :railStyle=Slider.Rail 
                  :processStyle=Slider.Process
                  :dotStyle=Slider.Dot
                  @dragging="val => FaceFeature(i, val)"
                  :dotOptions=Slider.DotOptions
               />
            </div>
         </div>

         <div class="page" v-if="Page == 5" key=Clothing @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
            <div class="slider" v-for="(Cloth, i) in Appearance.Clothing" :key=i>
               <label> {{ Clothing_Components.Names[i] }} </label>
               <vue-slider 
                  v-model=Appearance.Clothing[i] 
                  :max=Clothing_Components.Maximums[Character.Gender][i]
                  :min=0
                  :railStyle=Slider.Rail 
                  :processStyle=Slider.Process
                  :dotStyle=Slider.Dot
                  @dragging="val => Clothing(Clothing_Components.Components[i], val)"
                  :dotOptions=Slider.DotOptions
               />
            </div>
         </div>

      </transition>

      <div class="finish">
         <button class="play-button" v-on:click="Play"> </button>
         <h2> {{ Messages.START_GAME_NEW_CHARACTER }} </h2>
      </div>


   </div>

</template>


<script>
   import { Messages, Blend_Data, Face_Features, Hair_Colors, Hair_Styles, Head_Overlays, Clothing_Components } from '@/Globals';
   import VueSlider from 'vue-slider-component'
   import 'vue-slider-component/theme/antd.css'
   import Helpers from '@/Helpers';

   export default { 
      components: { 
         VueSlider
      }, 

      data () { 
         return { 

            Page: 0,
            Scroll_Disabled: false,

            Character: { 
               First_Name: '',
               Last_Name: '',
               Origin: '',
               Birth: null,
               Gender: 0
            },

            Appearance: {
               Face: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               Blend_Data: [0, 0, 0, 0, 0, 0],
               Overlays: [255, 255, 255, 255, 255, 255, 255, 255],
               Hair: [0, 0, 0],
               Beard: [0, 0],
               Eyes: 0,
               Clothing: [0, 0, 0, 0]
            },

            Selected: { 
               Hair_Color: 0,
               Hair_Highlight: 0
            },

            Info: [
               { Task: false, Title: Messages.CREATOR_VIEW.Title, Content: Messages.CREATOR_VIEW.Content },
               { 
                  Task: true, Title: Messages.IDENTITY_RULES.Title, Content: Messages.IDENTITY_RULES.Content,
                  Completed: () => { 
                     if (
                        this.Character.First_Name.length > 3 && this.Character.Last_Name.length > 3 && this.Character.Origin.length > 3 && 
                        Helpers.isUpper(this.Character.First_Name) && Helpers.isUpper(this.Character.Last_Name) && Helpers.isUpper(this.Character.Origin) &&
                        this.Character.Birth.length > 3
                     ) return true;
                  }
               },
               {
                  Task: true, Title: Messages.YEAR_RULES.Title, Content: Messages.YEAR_RULES.Content,
                  Completed: () => { 
                     let Year;
                     if (this.Character.Birth != null) { 
                        Year = this.Character.Birth.split('-')[0];
                        if (Year > 1941 && Year < 2002) return true;
                     }
                  }
               },
               {
                  Task: true, Title: Messages.CLOTHING_RULES.Title, Content: Messages.CLOTHING_RULES.Content,
                  Completed: () => { 
                     let Clothed = this.Appearance.Clothing.filter((Item) => {
                        if (Item != 0) return Item;
                     });
                     if (Clothed.length == this.Appearance.Clothing.length) return true;
                  }
               }
            ],

            Messages, Blend_Data, Face_Features, Hair_Colors, Hair_Styles, Head_Overlays, Clothing_Components,

            Slider: { 
               Rail: { backgroundColor: 'rgb(245 245 245 / 40%)', borderRadius: '15px' },
               Process: { background: 'linear-gradient(45deg, #fab80a, #fed52e)', borderRadius: '25px' },
               Dot: { backgroundColor: '#fab80a', borderColor: '#fab80a' },
               DotOptions: { 
                  focusStyle: { 
                     background: 'linear-gradient(45deg, #fab80a, #fed52e)',
                     boxShadow: '0 0 0 5px rgb(250 184 10 / 20%)'
                  }
               }
            }

         }
      },

      watch: {
         Appearance: {
            handler: function (Value, oldVal) {
               
               const Blend = Value.Blend_Data;
               mp.events.call('CLIENT::CREATOR:BLEND', Blend[0], Blend[1], Blend[2], Blend[3], Blend[4], Blend[5]);
               
            },
            deep: true
         }
      },

      methods: { 
         Navigate: function (i) { this.Page = i; },
         isActive: function (i)  { return i == this.Page ? true : false; },
         
         FaceFeature: (i, value) => { mp.trigger('CLIENT::CREATOR:FACE', i, value); },
         Clothing: (i, value) => { mp.trigger('CLIENT::CREATOR:CLOTHING', i, value); },
         Hair: function (i, value) { 
            if (i == 0 && value == 24) value = 25;
            if (i == 1) this.Selected.Hair_Color = value;
            this.Appearance.Hair[i] = value; 
            mp.trigger('CLIENT::CREATOR:HAIR', this.Appearance.Hair[0], this.Appearance.Hair[1], this.Appearance.Hair[2])
         },

         Gender: function (i) { 
            this.Character.Gender = i;
            mp.trigger('CLIENT::CREATOR:GENDER', i);
            this.Restart();
         },

         Restart: function () { 
            this.Appearance = {
               Face: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               Blend_Data: [0, 0, 0, 0, 0, 0],
               Overlays: [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
               Hair: [0, 0, 0],
               Beard: [0, 0],
               Eyes: 0,
               Clothing: [0, 0, 0, 0]
            };
            
            for (let i = 0; i < 20; i ++) { mp.trigger('CLIENT::CREATOR:FACE', i, 0); }
         },

         Play: function () { 
            const Taksks = this.Info.filter(Task => Task.Task == true);
            let Completed = this.Info.filter(Help => Help.Task === true && Help.Completed());
            if (Completed.length  != Taksks.lengt) return; 
            mp.trigger('CLIENT::CREATOR:FINISH', JSON.stringify(this.Character), JSON.stringify(this.Appearance));
         },

      },

      mounted () { 

         mp.invoke('focus', true);

         window.addEventListener('wheel', (e) => { 
            if (this.Scroll_Disabled == false) mp.trigger('CLIENT::PLAYER_CAMERA:ZOOM', e.deltaY);
         });
         
      }, 

      beforeDestroy () { 
         mp.invoke('focus', false);
      }

      // methods: { 
         
      // }
   }

</script>

<style scoped>

   div.creator { 
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url('../assets/images/backgrounds/overlay-1.png'), radial-gradient(50% 50% at 50% 50%, rgba(23, 28, 28, 0) 0%, rgb(15 19 16 / 75%) 100%);
   }
   ul.navigation { 
      padding: 0; list-style: none; position: absolute; top: 0; margin: 0; width: 100%; display: flex; justify-content: center;
   }

   ul.navigation li { 
      margin: 0 10px; font-size: 18px; width: 100px; height: 100px; color: rgba(249, 249, 249, 0.5); text-transform: uppercase; font-weight: 500;
      transition: all 0.35s ease; background: linear-gradient(180.04deg, rgba(229, 255, 255, 0.1) 0.03%, rgba(229, 255, 255, 0) 99.97%); display: flex; flex-direction: column; justify-content: center; align-items: center;
      position: relative; padding: 20px;
   }

   ul.navigation li i { margin: 2px 0; }
   ul.navigation li:hover { color: white; background: linear-gradient(180.04deg, rgba(229, 255, 255, 0.3) 0.03%, rgba(229, 255, 255, 0) 99.97%); }
   ul.navigation li:hover .icon { background: white; }
   ul.navigation li.active { background: linear-gradient(180.04deg, rgb(255 232 117 / 40%) 0.03%, rgba(229, 255, 255, 0) 99.97%); color: #ffcf1d; }
   ul.navigation li.active .icon { background: linear-gradient(45deg, #fab80a, #fed52e); }

   .icon { width: 40px; height: 40px; transition: all 0.35s ease; background-color: rgba(249, 249, 249, 0.5); margin: 10px 0; }

   .icon.id-card { -webkit-mask: url('../assets/images/icons/id-card.svg') no-repeat center; mask: url('../assets/images/icons/id-card.svg') no-repeat center; mask-size: cover; }
   .icon.dna { -webkit-mask: url('../assets/images/icons/dna.svg') no-repeat center; mask: url('../assets/images/icons/dna.svg') no-repeat center; mask-size: cover; }
   .icon.head { -webkit-mask: url('../assets/images/icons/head.svg') no-repeat center; mask: url('../assets/images/icons/head.svg') no-repeat center; mask-size: cover; }
   .icon.hair { -webkit-mask: url('../assets/images/icons/hair.svg') no-repeat center; mask: url('../assets/images/icons/hair.svg') no-repeat center; mask-size: cover; }
   .icon.clothing { -webkit-mask: url('../assets/images/icons/clothing.svg') no-repeat center; mask: url('../assets/images/icons/clothing.svg') no-repeat center; mask-size: cover; }
   .icon.male-gender { -webkit-mask: url('../assets/images/icons/male-gender.svg') no-repeat center; mask: url('../assets/images/icons/male-gender.svg') no-repeat center; mask-size: cover; }
   .icon.female-gender { -webkit-mask: url('../assets/images/icons/female-gender.svg') no-repeat center; mask: url('../assets/images/icons/female-gender.svg') no-repeat center; mask-size: cover; }
   .icon.face-scan { -webkit-mask: url('../assets/images/icons/face-scan.svg') no-repeat center; mask: url('../assets/images/icons/face-scan.svg') no-repeat center; mask-size: cover; }

   .page { padding-top: 40px; position: absolute; right: 30px; width: 350px; top: 120px; max-height: 600px; overflow-y: auto; display: flex; flex-direction: column; justify-content: center; align-items: center; }

   .slider { padding: 20px; width: 300px; }

   ul.info { width: 350px; padding: 0; list-style: none; height: 400px; position: absolute; top: 200px; left: 30px; }
   ul.info li { padding: 10px 0; transition: all 0.35s ease; }
   ul.info li h3 { color: whitesmoke; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
   ul.info li:nth-child(even) { border-top: 1px solid grey; border-bottom: 1px solid grey; }
   ul.info li p { color: #b3b3b3; font-weight: 200; margin: 0; }
   ul.info li.completed { opacity: 0.1;  color: green; }

   .page input[type=text], .page input[type=date] { width: 175px; }
   label { margin-top: 25px; color: rgb(199, 199, 199); font-size: 16px; font-weight: 100; letter-spacing: 1px; }

   ul.genders { padding: 0; list-style: none; display: flex; width: 150px; justify-content: space-around; align-items: center; flex-wrap: wrap; }
   ul.genders li.icon { background: white; opacity: 0.7; }
   ul.genders li.icon:hover { opacity: 1; }
   ul.genders label { width: 100%; text-align: center; }
   ul.genders li.icon.selected { background: linear-gradient(45deg, #fab80a, #fed52e); opacity: 1; }

   ul.colors {  padding: 0; list-style: none; display: grid; grid-gap: 1.15rem; grid-template-columns: repeat(8, 25px); grid-template-rows: repeat(8, 25px); justify-content: center; }

   ul.colors li.color { width: 25px; height: 25px; border-radius: 100%; transition: all 0.35s ease; opacity: 0.7; border: 3px solid transparent; }
   ul.colors li.color:hover, ul.colors li.color.selected { opacity: 1; border-color: rgb(255 255 255 / 70%); box-shadow: 0 0 0 5px rgb(255 255 255 / 25%); }

   .finish { position: absolute; bottom: 100px; width: 100%; height: auto; display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; }
   .finish h2 { margin: 0; margin-top: 15px; font-weight: 100; text-transform: uppercase; color: rgb(231, 231, 231); letter-spacing: 2px; transition: all 0.3s ease; opacity: 0.5; }
   button.play-button { 
      margin-left: -14px; width: 85px; height: 85px; -webkit-mask: url('../assets/images/icons/play-button.svg') no-repeat center;  mask: url('../assets/images/icons/play-button.svg') no-repeat center; mask-size: cover; 
      transition: all 0.35s ease; background: linear-gradient(45deg, #fab80a, #fed52e);
   }
   button.play-button:hover { filter: brightness(1.1); opacity: 1; }
   button.play-button:hover ~ h2 { opacity: 1; }
  

</style>
