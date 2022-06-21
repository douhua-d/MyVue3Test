<template>
  <input v-model="data.value" @change="onChange" />
</template>

<script>
import { reactive, watch, watchEffect } from "vue";

export default {
  name: "MyInput",
  props: {
    defaultValue: {
      type: String
    },
    onChange: {
      type: Function
    }
  },

  setup(props) {
    const data = reactive({
      value: "",
      limit: 10
    })


    watch(() => data.value, () => {
      if (data.value.length >= data.limit) {
        data.value = data.value.slice(0, data.limit)
      }
    })

    watchEffect(() => {
      data.value = props.defaultValue;
    })

    function onChange(value, e) {
      data.value = value;
    }

    return {
      data,
      onChange
    }
  }
}
</script>

<style scoped>

</style>