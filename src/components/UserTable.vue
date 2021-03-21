<template>
  <div>
    <v-simple-table>
      <thead>
        <tr id="headings">
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
          @keyup="editUser"
          tabindex="0"
        >
          <td v-if="editMode && selectedUser === user.id">
            <input type="text" v-model="user.name.first" v-focus />
          </td>
          <td v-else>{{ user.name.first }}</td>
          <td v-if="editMode && selectedUser === user.id">
            <input type="text" v-model="user.email" />
          </td>
          <td v-else>{{ user.email }}</td>
          <td>{{ getFlag(user.nat) }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
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
  methods: {
    getFlag(countryCode) {
      return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
    },
    selectUser(user, event) {
      if (event) {
        console.log(event.code)
        if (event.code !== 'Enter' || event.code !== 'Space')
        return
      }
      this.$emit('select:user', user);
    },
    editUser(event) {
      if (event.code !== 'Enter' && event.code !== 'Space')
      return

      this.$emit('edit:user');
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>

  div {
    min-height: 33rem;
  }

  th:first-child {
    border-top-left-radius: 5px;
  }
  th:last-child {
    border-top-right-radius: 5px;
  }

  th {
    background-color: rgb(163, 255, 163);
  }

  td:first-child{
    width: 10rem;
  }
  tr {
    transition: background-color 0.1s;
  }
  tr:focus {
    outline: none;
  }
  tr.activeRecord {
    background-color: lightblue;
  }
  tr:hover {
    background-color: rgb(120, 194, 219) !important;
  }
  input {
    height: 2.3rem;
    padding: 5px 10px;
    margin: 5px 0;
    margin-left: -11px;
    background-color: white;
    border: 1px solid blue;
    border-radius: 2px;
    width: 100%;
  }
</style>
