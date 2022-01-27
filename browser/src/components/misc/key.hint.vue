

<template>
   <div class="key" v-tooltip="keys[keyName].name">
      <div class="content" :class="{ keyboard: !keys[keyName].icon }"> 
         <h3 v-if="!keys[keyName].icon"> {{ keys[keyName].name }} </h3>
      </div>
   </div>
</template>

<script>
   export default {
      props: {
         keyName: String
      },
      
      data () {
         return {
            keys: {
               'a': { name: 'A' },
               'b': { name: 'B' },
               'c': { name: 'C' },
               'd': { name: 'D' },
               'e': { name: 'E' },
               'f': { name: 'F' },
               'g': { name: 'G' },
               'h': { name: 'H' },
               'i': { name: 'I' },
               'j': { name: 'J' },
               'k': { name: 'K' },
               'l': { name: 'L' },
               'm': { name: 'M' },
               'n': { name: 'N' },
               'o': { name: 'O' },
               'p': { name: 'P' },
               'q': { name: 'Q' },
               'r': { name: 'R' },
               's': { name: 'S' },
               't': { name: 'T' },
               'u': { name: 'U' },
               'v': { name: 'V' },
               'w': { name: 'W' },
               'x': { name: 'X' },
               'y': { name: 'Y' },
               'z': { name: 'Z' },
               'shift': { icon: 'icon_shift', name: 'SHIFT' },
               'ctl': { icon: 'icon_ctrl', name: 'CTRL' },
               'alt': { icon: 'icon_alt', name: 'ALT' },
               '0': { name: '0' },
               '1': { name: '1' },
               '2': { name: '2' },
               '3': { name: '3' },
               '4': { name: '4' },
               '5': { name: '5' },
               '6': { name: '6' },
               '7': { name: '7' },
               '8': { name: '8' },
               '9': { name: '9' },
               'l_mouse': { icon: 'l_mouse', name: 'Levi klik miša' },
               'r_mouse': { icon: 'r_mouse', name: 'Desni klik miša' }
            }
         }
      }
   }
</script>

<style scoped>
   .key {
      position: relative;
      width: 35px;
      height: 35px;
      border-radius: 5px;
      background: #0b0e11;
      display: inline-block;
   }

   .content { 
      width: 33px; height: 33px; margin: auto; 
   }

   .content.keyboard {
      box-shadow: 0 0.2em 0 0.05em #07090b;
      border-radius: 5px;
      background:#21252f;
   }

   .content.keyboard h3 {
      margin: 0;
      padding: 4px 8px;
      font-size: 1.05rem;
      font-weight: 500;
      color:#cdcdcd;
   }

</style>