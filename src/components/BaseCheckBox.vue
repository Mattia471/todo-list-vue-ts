<script setup lang="ts">
import {defineProps, reactive, watch} from "vue";

const props = defineProps<{
  value: any;
}>();

const reactiveData = reactive({
  value: props.value
});

//emit un evento con il nome di "get:content"
const emit = defineEmits(["get:content"]);

//emit il valore della checkbox al cambio di stato
watch(() => reactiveData.value, (newValue) => {
  emit("get:content", {value: props.value, checked: newValue});
});

</script>

<template>
  <input
      type="checkbox"
      :value="reactiveData.value"
      v-model="reactiveData.value"
      class="h-4 w-4 rounded checked:bg-white-500 border-gray-300 text-indigo-600 focus:ring-indigo-600">
</template>

<style scoped>

</style>