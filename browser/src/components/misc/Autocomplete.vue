



<script>

Vue.component('Autocomplete', {
  props: ['list'],
  data() {
    return {
      input: null
    }
  },
  template: ``,
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    setInput(value) {
      this.input = value
      this.$emit('input', value)
    }
  }
})

new Vue({
  el: "#app",
  computed: {
    filteredList() {
      if (this.filterInput) {
        return this.list.filter(e => e.toLowerCase().indexOf(this.filterInput.toLowerCase()) !== -1)
      } else {
        return this.list
      }
    }
  },
  data: {
    filterInput: null,
    list: [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh"
    ]
  },
  methods: {
    handleInput(e) {
      this.filterInput = e
    }
  }
})
</script>