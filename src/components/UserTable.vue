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
        <tr v-for="user in users" :key="user.id">
          <!-- <td v-if="editing === employee.id">
            <input type="text" v-model="employee.name" />
          </td> -->
          <td>{{ user.name.first }}</td>
          <!-- <td v-if="editing === employee.id">
            <input type="text" v-model="employee.email" />
          </td> -->
          <td>{{ user.email }}</td>
          <!-- <td v-if="editing === employee.id">
            <button @click="editEmployee(employee)" >Save</button>
            <button class="muted-button" @click="cancelEdit(employee)" >Cancel</button>
          </td> -->
          <!-- <td>
            <button @click="editMode(employee)" >Edit</button>
            <button @click="$emit('delete:employee', employee.id)" >Delete</button>
          </td> -->
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
  },
  methods: {
    getFlag(countryCode) {
      return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
    }
  },
}
</script>

<style scoped>

</style>
