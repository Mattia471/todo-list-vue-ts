<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  placeholder: string;
}>();

const content = ref("");

//definisco un evento con il nome di "get:content"
const emit = defineEmits(["get:content"]);

//funzione che emette l'evento "get:content" con il valore di reactiveData.content
const emitContent = () => {
  emit("get:content", content.value);
}
</script>

<template>
  <input type="text"
         class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
         :placeholder="props.placeholder"
         v-model="content"
         @input="emitContent">
</template>
