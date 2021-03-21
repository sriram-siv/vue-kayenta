<template>
  <v-simple-table fixed-header height="20rem">
    <thead>
      <tr>
        <th @click="sortUsers('name', 'first')">
          Name
          <span v-if="sortBy.field === 'first'" class="sortIndicator">
            {{ sortDirection }}
          </span>
        </th>
        <th @click="sortUsers('email')">
          Email
          <span v-if="sortBy.field === 'email'" class="sortIndicator">
            {{ sortDirection }}
          </span>
        </th>
        <th @click="sortUsers('nat')">
          Nationality
          <span v-if="sortBy.field === 'nat'" class="sortIndicator">
            {{ sortDirection }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users" 
        :key="user.id"
        :class="selectedUser === user.id && 'activeRecord'"
        @focus="$emit('select:user', user)"
        @keyup="handleKeyup"
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
        <td>
          <span role="img" :aria-label="'country flag ' + user.nat">
            {{ getFlag(user.nat) }}
          </span>
        </td>
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
    sortBy: Object,
  },
  methods: {
    getFlag(countryCode) {
      return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
    },
    handleKeyup(event) {
      if (event.code === 'Enter') this.$emit('edit:user');
      if (event.code === 'Escape') this.$emit('edit:cancel');
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  computed: {
    sortDirection() {
      return this.sortBy.direction < 0 ? '🔼' : '🔽';
    }
  },
}
</script>

<style scoped>

  th:first-child {
    border-top-left-radius: 5px;
  }
  th:last-child {
    border-top-right-radius: 5px;
  }

  th {
    background-color: rgb(188, 255, 188) !important;
    cursor: pointer;
  }

  th:hover {
    background-color: lightgreen !important;
  }

  td:first-child {
    width: 10rem;
  }
  td:last-child {
    text-align: center;
    width: 8rem;
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
    border-radius: 2px;
    width: 100%;
  }

  input:focus {
    outline: 2px solid blue;
  }

  .sortIndicator {
    opacity: 1;
    position: absolute;
    right: 15px;
  }
</style>
