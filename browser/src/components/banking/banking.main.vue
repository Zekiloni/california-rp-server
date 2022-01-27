
<script lang="ts">
   import Vue from 'vue';
   import { Messages } from '../../globals';

   export default Vue.extend({
      data () {
         return {


            page: 'navigation',
            
            Messages
         }
      },

      methods: {
         
      },

      mounted () {
         //@ts-ignore
         if (window.mp) {
            //@ts-ignore
            mp.invoke('focus', true);
         }
      }
   });
</script>