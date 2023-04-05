<script setup lang="ts">
import {reactive} from "vue";

const props = defineProps<{
  placeholder: string;
  content: string;
}>();
const reactiveData = reactive({
  content: ""
});
</script>

<template>
  {{reactiveData.content}}
  <input type="text"
         class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
         :placeholder="props.placeholder"
         v-model="reactiveData.content">
</template>
