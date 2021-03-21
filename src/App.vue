<template>
  <v-app>
    <main>
      <user-table :users="filteredList" :sortUsers="sortUsers" @select:user="selectUser"/>
      <div class="controls">
        <search-field ref="searchField" @input:search="searchUsers"/>
        <v-btn color="primary">
          Edit
        </v-btn>
        <v-btn color="primary">
          Remove
        </v-btn>
      </div>

    </main>
  </v-app>
</template>

<script>
import UserTable from '@/components/UserTable';
import SearchField from '@/components/SearchField';

export default {
  name: 'App',

  components: {
    UserTable,
    SearchField,
  },

  data: () => ({
    users: [],
    uid: 0,
    searchValue: '',
    filteredList: [],
    selected: null,
  }),
  async mounted() {
    const res = await fetch('https://randomuser.me/api/?results=10');
    const data = await res.json();

    this.uid = 0;

    const users = data.results.map(user => ({
      ...user,
      id: this.uid++,
    }));

    this.users = users;
  },
  watch: {
    users(update) {
      this.filteredList = [...update]
    }
  },
  methods: {
    
    sortUsers(...field) {
    
      const sorted = [...this.users].sort((a, b) => {
        // Pull nested value out of object using provided keys
        const valInA = field.reduce((res, key) => res[key], a).toLowerCase();
        const valInB = field.reduce((res, key) => res[key], b).toLowerCase();
        return valInA.localeCompare(valInB);
      })
      // Check to see if already sorted and return reversed if so
      const noChange = sorted.every((user, i) => user.id === this.users[i].id)
      this.users = noChange ? this.users.reverse() : sorted
    },
    searchUsers(input) {
      // this.searchValue = input;
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
    clearSearch() {
      this.$refs.searchField.clearInput()
    },
    selectUser(user) {
      this.selected = this.selected === user.id ? null : user.id
    }
  },
};
</script>

<style scoped>
  main {
    margin: 10px;
    padding: 5px;
    border: 1px solid #aaaa;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 1px #aaaa;
  }
  .controls {
    display: flex;
    align-items: center;
  }

  .v-btn {
    margin: auto 5px;
  }
</style>