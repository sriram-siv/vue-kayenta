<template>
  <div>
    <v-text-field
      label="Search Users"
      v-model="searchInput"
      @input="$emit('input:search', searchInput)"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'search-field',
  data: () => ({
    searchInput: '',
  }),
  methods: {
    clearInput() {
      this.searchInput = '';
      this.$emit('input:search', '');
    },
  },
}
</script>

<style scoped>
  div {
    height: 3rem;
    width: 100%;
  }
</style>