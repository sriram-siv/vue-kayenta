<template>
  <v-text-field
    :class="searchInput"
    label="Search Users"
    v-model="searchInput"
    @input="$emit('input:search', searchInput)"
  ></v-text-field>
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
  .searchInput {
    background-color: red;
  }
</style>