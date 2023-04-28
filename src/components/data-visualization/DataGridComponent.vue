<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  dataSource: any;
  columns: any;
}>();
</script>
<template>
  <DxDataGrid
      :data-source="props.dataSource"
      key-expr="ID"
      :columns="props.columns"
      :show-borders="true"
  />
</template>
