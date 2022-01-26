

<template>
   <div class="key" v-tooltip="keys[keyName].name">
      <div class="icon" :class="keys[keyName].icon"> </div>
   </div>
</template>

<script>
   export default {
      props: {
         keyName: Object
      },
      
      data () {
         return {
            keys: {
               'a': { icon: 'icon_a', name: 'A' },
               'b': { icon: 'icon_b', name: 'B' },
               'c': { icon: 'icon_c', name: 'C' },
               'd': { icon: 'icon_d', name: 'D' },
               'e': { icon: 'icon_e', name: 'E' },
               'f': { icon: 'icon_f', name: 'F' },
               'g': { icon: 'icon_g', name: 'G' },
               'h': { icon: 'icon_h', name: 'H' },
               'i': { icon: 'icon_i', name: 'I' },
               'j': { icon: 'icon_j', name: 'J' },
               'k': { icon: 'icon_k', name: 'K' },
               'l': { icon: 'icon_l', name: 'L' },
               'm': { icon: 'icon_m', name: 'M' },
               'n': { icon: 'icon_n', name: 'N' },
               'o': { icon: 'icon_o', name: 'O' },
               'p': { icon: 'icon_p', name: 'P' },
               'q': { icon: 'icon_q', name: 'Q' },
               'r': { icon: 'icon_r', name: 'R' },
               's': { icon: 'icon_s', name: 'S' },
               't': { icon: 'icon_t', name: 'T' },
               'u': { icon: 'icon_u', name: 'U' },
               'v': { icon: 'icon_v', name: 'V' },
               'w': { icon: 'icon_w',name: 'W' },
               'x': { icon: 'icon_x', name: 'X' },
               'z': { icon: 'icon_y', name: 'Y' },
               '10': { icon: 'icon_z', name: 'Z' },
               'shift': { icon: 'icon_shift', name: 'SHIFT' },
               'ctl': { icon: 'icon_ctrl', name: 'CTRL' },
               'alt': { icon: 'icon_alt', name: 'ALT' },
               '0': { icon: 'icon_0', name: '0' },
               '1': { icon: 'icon_1', name: '1' },
               '2': { icon: 'icon_2', name: '2' },
               '3': { icon: 'icon_3', name: '3' },
               '4': { icon: 'icon_4', name: '4' },
               '5': { icon: 'icon_5', name: '5' },
               '6': { icon: 'icon_6', name: '6' },
               '7': { icon: 'icon_7', name: '7' },
               '8': { icon: 'icon_8', name: '8' },
               '9': { icon: 'icon_9', name: '9' },
            }
         }
      }
   }
</script>

<style scoped>
   .key {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background: #181a20;
      display: inline-block;
   }

   .icon { 
      width: 25px; height: 25px; margin: auto; background: red;
   }

</style>