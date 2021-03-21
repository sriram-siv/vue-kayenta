<template>
  <v-app>
    <search-field ref="searchField" @input:search="searchUsers"/>
    <user-table :users="filteredList" :sortUsers="sortUsers" />
    <v-btn
      color="primary"
      @click="clearSearch"
    >
    Load data
    </v-btn>
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
  },
  computed: {

  }
};
</script>
