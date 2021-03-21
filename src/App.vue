<template>
  <v-app>
    <main>
      <user-table 
        :users="filteredList" 
        :sortUsers="sortUsers"
        :editMode="editMode"
        :selectedUser="selected"
        :sortBy="sortBy"
        @select:user="selectUser"
        @edit:user="editUser"
      />
      <div class="controls">
        <search-field ref="searchField" @input:search="searchUsers"/>
        <v-btn v-if="!editMode" color="primary" @click="editUser">
          Edit
        </v-btn>
        <v-btn v-else color="primary" @click="updateUser">
          Save
        </v-btn>
        <v-btn v-if="!editMode" color="warning" :disabled="this.selected === null" @click="removeUser">
          Remove
        </v-btn>
        <v-btn v-else color="primary">
          Cancel
        </v-btn>
      </div>

    </main>
  </v-app>
</template>

<script>
import UserTable from '@/components/UserTable';
import SearchField from '@/components/SearchField';

import { pick, getNestedValue } from './helpers.js'

export default {
  name: 'App',

  components: {
    UserTable,
    SearchField,
  },

  data: () => ({
    uid: 0,
    users: [],
    filteredList: [],
    sortBy: {
      field: '',
      direction: 1
    },
    searchValue: '',
    selected: null,
    editMode: false,
    savedRecord: {},
  }),
  async mounted() {
    const res = await fetch('https://randomuser.me/api/?results=10');
    const data = await res.json();

    this.uid = 0;

    const users = data.results
      .map(userData => ({
        ...pick(userData, ['name', 'email', 'nat']),
        id: this.uid++,
      }))

    this.users = users;
  },
  watch: {
    users(update) {
      this.filteredList = [...update]
    }
  },
  methods: {
    
    sortUsers(...field) {
    
      const sorted = [...this.filteredList].sort((a, b) => {
        const valInA = getNestedValue(a, field).toLowerCase()
        const valInB = getNestedValue(b, field).toLowerCase()
        return valInA.localeCompare(valInB);
      })

      const isActiveField = this.sortBy.field === field[field.length - 1]

      this.sortBy = {
        field: field[field.length - 1],
        direction: isActiveField ? -this.sortBy.direction : 1
      }

      this.filteredList = this.sortBy.direction === 1 
        ? sorted 
        : sorted.reverse()
    },
    searchUsers(input) {

      try {
        const regex = new RegExp(input, 'i');

        const matches = this.users.reduce((acc, user) => {
          const isMatch = regex.test(user.name.first)
            || regex.test(user.email)
            || regex.test(user.nat);

          return isMatch ? [...acc, user] : acc;
        }, []);

        this.filteredList = matches;
      } catch(e) {
        console.error('invalid input', e);
      }
    },
    selectUser(user) {
      this.selected = this.selected === user.id ? null : user.id;
      this.editMode = false;
    },
    removeUser() {
      if (this.selected === null) return;
      this.users = this.users.filter(user => user.id !== this.selected);
    },
    editUser() {
      if (this.selected === null) {
        this.editMode = false;
        return;
      }

      this.editMode = !this.editMode;

      this.users.forEach(user => {
        if (user.id === this.selected) {
          this.savedRecord = { ...user }
        }
      });

    },
  },
};
</script>

<style scoped>
  main {
    margin: 10px;
    border: 1px solid #aaaa;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 1px #aaaa;
  }
  .controls {
    height: 4rem;
    display: flex;
    align-items: center;

    padding: 5px;
    padding-left: 10px;
  }

  .v-btn {
    position: relative;
    top: 5px;
    margin: 5px;
    width: 8rem;
  }
</style>