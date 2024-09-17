<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'

export default {
    directives: {
        mask
    },
    data() {
        return {
        email: '',
        number: '',
        resArray: [],
        error:'',
        }
    },
    methods: {
        submitData(event) {
        this.resArray = []
        event.preventDefault()
        
        let data = {
            email: this.email
        }

        if (this.number !== '') {
            data.number = this.number.replace(/-/g,'')
        }

        axios.post('http://localhost:3000/search', data)
        .then(response => {
            this.resArray = response.data
            this.error = ''
        })
        .catch(error => {
            console.log(error)
            this.error = error.response.data ;
        })
        }
    }
}
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <form
      style="display: flex; flex-direction: column; align-items: center;"
      @submit="submitData"
    >
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Email address</label>
      <input
        id="email"
        v-model="email"
        style="margin-bottom: 1rem;"
        type="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="john.doe@company.com"
        required
      >
      <label
        for="phone"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Phone number</label>
      <input
        id="phone"
        v-model="number"
        v-mask="'##-##-##'"
        style="margin-bottom: 1rem;"
        type="tel"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="12-45-68"
      >
      <button
        type="submit"
        style="margin-left: auto;"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Send data
      </button>
        
      <h2
        style="margin-right: auto;"
        class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
      >
        Response:
      </h2> 

      <template v-if="resArray.length">   
        <ul
          style="margin-right: auto;"
          class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
        >
          <li
            v-for="(res,index) in resArray"
            :key="index"
          >
            {{ res.email }} - {{ res.number }}
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li v-if="!error">
            NO VALUE
          </li>
          <li v-else>
            {{ error }}
          </li>
        </ul>
      </template>
    </form>
  </div>
</template>