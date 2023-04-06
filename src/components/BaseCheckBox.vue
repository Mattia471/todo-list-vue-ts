<script setup lang="ts">
import {defineProps, reactive, watch} from "vue";

const props = defineProps<{
  value: any;
}>();

const reactiveData = reactive({
  checked: false
});

//emit un evento con il nome di "get:content"
const emit = defineEmits(["get:content"]);

//emit il valore della checkbox al cambio di stato
watch(() => reactiveData.checked, (newValue) => {
  emit("get:content", {value: props.value, checked: newValue});
});

</script>

<template>
  <input
      type="checkbox"
      :value="props.value"
      v-model="reactiveData.checked"
      class="h-4 w-4 rounded checked:bg-white-500 border-gray-300 text-indigo-600 focus:ring-indigo-600">
</template>

<style scoped>

</style>