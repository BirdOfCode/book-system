<template>
  <div>
    <admin v-if="isShow"></admin>
    <user v-else></user>
  </div>
</template>

<script>
import admin from './views/admin/index'
import user from './views/user/index'

export default {
  name: 'main',
  data () {
    return {
      Identity: 1,
    }
  },

  components: {
    admin,
    user
  },
  computed: {
    isShow () {
      return this.Identity === 1
    }
  },
}
</script>

<style>
</style>
