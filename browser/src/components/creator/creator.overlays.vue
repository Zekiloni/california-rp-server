

<template>
   <div class="page" v-if="page == 4" key=Overlays @mouseover="Scroll_Disabled = true" @mouseleave="Scroll_Disabled = false">
      <div class="slider" v-for="(Overlay, i) in Appearance.Overlays" :key=i>
         <label> {{ Head_Overlays.Names[i] }} </label>
         <input type="checkbox" id="checkbox" v-model="Appearance.Overlays_Toggle[i]" v-on:change="ChangeOverlay(i, $event.target.checked)">
         <vue-slider 
            v-model=Appearance.Overlays[i] 
            :max=Head_Overlays.Maximums[i]
            :min=0
            class="component-slider"
            :disabled="Appearance.Overlays_Toggle[i] == false"
            :railStyle=Slider.Rail 
            :processStyle=Slider.Process
            :dotStyle=Slider.Dot
            :class="{ disabled: Appearance.Overlays[i] == 255 }"
            v-on:change="val => ChangeOverlay(i, val)"
            :dotOptions=Slider.DotOptions
         />
      </div>
   </div>
</template>

<script>
   export default {
      components: { 

      },

      data () {
         return {

         }
      }
   }
</script>