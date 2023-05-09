<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  dataSource: any;
  seriesValue: any;
  titleChart: string;
}>();

</script>
<template>
  <DxChart
      id="chart"
      :data-source="props.dataSource"
      palette="Violet"
  >
    <DxCommonSeriesSettings
        type="line"
        argument-field="temp"
    />
    <DxSeries
        v-for="energy in props.seriesValue"
        :key="energy.value"
        :value-field="energy.value"
        :name="energy.name"
    />
    <DxMargin :bottom="20"/>
    <DxArgumentAxis
        :value-margins-enabled="false"
        discrete-axis-division-mode="crossLabels"
    >
      <DxGrid :visible="true"/>
    </DxArgumentAxis>
    <DxLegend :visible="false"/>
    <DxTooltip :enabled="true"/>
  </DxChart>
</template>
