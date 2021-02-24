<template>
  <div>
    <h2>{{message}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <!-- <h2>{{$store.getters.more20stu}}</h2>
    <h2>{{$store.getters.more20stuLength}}</h2> -->
  </div>
</template>

<script>
export default {
  name: 'HelloVuex',
  data() {
    return {
      message: '-------------HelloVuex内容',
    }
  },
  methods: {
  }
}
</script>

<style>

</style>