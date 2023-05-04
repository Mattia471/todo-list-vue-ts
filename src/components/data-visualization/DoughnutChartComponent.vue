<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  dataSource: any;
  title: string;
}>();
const customizeText = (argument: any) => {
  return argument.valueText.toString().replace(/\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))/g, ",") + "%";
}
</script>
<template>
  <DxPieChart
      id="doughnutChart"
      :data-source="props.dataSource"
      type="doughnut"
      :title="props.title"
      palette="Soft Pastel">
    <DxSeries argument-field="field">
      <DxLabel
          :visible="true"
          :customize-text="customizeText">
        <DxConnector :visible="true"/>
      </DxLabel>
    </DxSeries>
    <DxLegend
        :margin="0"
        horizontal-alignment="center"
        vertical-alignment="top"
    />
  </DxPieChart>
</template>