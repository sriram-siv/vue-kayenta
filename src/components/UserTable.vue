<template>
  <v-simple-table>
    <thead>
        <tr>
          <th @click="sortUsers('name', 'first')">Name</th>
          <th @click="sortUsers('email')">Email</th>
          <th @click="sortUsers('nat')">Nationality</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users" 
          :key="user.id" 
          :class="selectedUser === user.id && 'activeRecord'"
          @focus="selectUser(user)"
          tabindex="0"
        >
          <td v-if="editMode && selectedUser === user.id">
            <input type="text" v-model="user.name.first" />
          </td>
          <td v-else>{{ user.name.first }}</td>
          <td>{{ user.email }}</td>
          <td>{{ getFlag(user.nat) }}</td>
        </tr>
      </tbody>
  </v-simple-table>
</template>

<script>

export default {
  name: 'user-table',
  props: {
    users: Array,
    sortUsers: Function,
    selectedUser: Number,
    editMode: Boolean,
  },
  updated() {
    console.log(this.$props.selectedUser)
  },
  methods: {
    getFlag(countryCode) {
      return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
    },
    selectUser(user) {
      this.$emit('select:user', user);
    },
  },
}
</script>

<style scoped>
  tr {
    transition: background-color 0.1s;
  }
  tr:focus {
    outline: none;
  }
  tr.activeRecord {
    background-color: lightblue;
  }
  input {
    height: 2.5rem;
    padding: 5px;
    margin: 5px;
    background-color: red;
  }
</style>
