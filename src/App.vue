<template>
<div class="container mt-5">
  <Form />
  <List />
</div>
</template>

<script>
import Form from './components/Form.vue'
import List from './components/List.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

export default {
  components: {
    Form,
    List
  }
}
</script>

<style>
</style>
