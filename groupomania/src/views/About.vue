<template>
  <div class="forum">
    <HomeLink />
    <Forum />
  </div>
</template>

<script>
// @ is an alias to /src
import Forum from '@/components/Forum.vue'

export default {
  name: 'ForumPeople',
  components: {
    Forum
  }
}
</script>
