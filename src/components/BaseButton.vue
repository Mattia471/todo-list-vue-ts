<script setup lang="ts">
import {defineProps, onMounted, reactive} from "vue";

onMounted(() => {
  switch (props.type.toUpperCase()) {
    case "SOLID":
      reactiveData.class = "px-3 py-2 text-sm  text-white bg-blue-500 shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    case "OUTLINE":
      reactiveData.class = "outline px-3 py-2 text-sm text-white-600 bg-blue-500 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    case "TEXT":
      reactiveData.class = "text px-3 py-2 text-sm text-indigo-600 bg-white shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    default:
      reactiveData.class = "px-3 py-2 text-sm text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break
  }
});
//definisco un evento send:action
const emit = defineEmits(["send:action"]);

//funzione che emette l'evento "send:action" con il valore di reactiveData.content
const emitAction = () => {
  emit("send:action");
}

const props = defineProps<{
  type: string;
  disabled: boolean
}>();
const reactiveData = reactive({
  class: ""
});
</script>

<template>
  <button type="button" :class="reactiveData.class" @click="emitAction" :disabled="props.disabled">
    <slot name="label"></slot>
  </button>
</template>