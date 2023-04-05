<script setup lang="ts">
import {defineProps, onBeforeUpdate, onMounted, reactive, watch} from "vue";

onBeforeUpdate(() => {
  switch (props.type.toUpperCase()) {
    case "SOLID":
      reactiveData.class = "px-3 py-2 text-sm font-semibold text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    case "OUTLINE":
      reactiveData.class = "outline px-3 py-2 text-sm font-semibold text-indigo-600 bg-white border border-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    case "TEXT":
      reactiveData.class = "text px-3 py-2 text-sm font-semibold text-indigo-600 bg-white shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break;
    default:
      reactiveData.class = "px-3 py-2 text-sm font-semibold text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      break
  }
});

const props = defineProps<{
  type: string;
  disabled: boolean;
}>();
const reactiveData = reactive({
  class: ""
});
</script>

<template>
  <button type="button" :class="reactiveData.class" :disabled="props.disabled">
    <slot name="label"></slot>
  </button>
</template>