<script setup lang="ts">
import {defineProps, reactive} from "vue";

const props = defineProps<{
  placeholder: string;
}>();

const reactiveData = reactive({
  content: false
});

//emit un evento con il nome di "get:content"
const emit = defineEmits(["get:content"]);

//funzione che emette l'evento "get:content" con il valore di reactiveData.content
const emitContent = () => {
  emit("get:content", reactiveData.content);
}
</script>

<template>
  <label>{{props.placeholder}}</label>
  <input id="checkbox"
         name="checkbox"
         type="checkbox"
         v-model="reactiveData.content"
         @change="emitContent"
         class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
</template>

<style scoped>

</style>