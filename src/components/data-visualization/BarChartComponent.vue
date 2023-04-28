<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  dataSource: any;
}>();
</script>
<template>
  <DxChart
      id="chart"
      :data-source="props.dataSource">
    <DxSeries
        argument-field="day"
        value-field="completed"
        name="Task Completate"
        type="bar"/>
  </DxChart>
</template>