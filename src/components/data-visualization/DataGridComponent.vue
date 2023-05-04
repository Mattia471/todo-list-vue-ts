<script setup lang="ts">
import {defineProps, onMounted} from "vue";

const props = defineProps<{
  dataSource: any;
  columns: any;
}>();

const calculatePercentage = () => {
  const data = props.dataSource;
  const total = data.reduce((sum: any, item: any) => sum + item.users, 0);
  data.forEach((item: any) => {
    item.percentage = Math.round(item.users / total * 100);
    item.users = item.users.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  });
  console.log(total)
  return data;
}
onMounted(() => {
  calculatePercentage();
})
</script>
<template>
  <DxDataGrid
      :data-source="props.dataSource"
      :columns="props.columns"
      :show-borders="true"
      :show-row-lines="true"
      class="font-bold"
      :show-column-lines="false">
    <template #iconTemplate="{data:rowInfo}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor"
           fill="currentColor" class="w-6 h-6 p-1 rounded-md bg-blue-500 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" :d="rowInfo.data.icon"/>
      </svg>
    </template>
    <template #usersTemplate="{data:rowInfo}">
      <p>{{ rowInfo.data.users }}</p>
    </template>
    <template #percentageTemplate="{data:rowInfo}">
      <label>{{ rowInfo.data.percentage }}%</label>
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div class="bg-blue-600 text-sm font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
             :style="'width:'+rowInfo.data.percentage+'%'"/>
      </div>
    </template>
    <DxScrolling row-rendering-mode="virtual"/>
    <DxPaging :page-size="10"/>
    <DxPager
        :visible="true"
        display-mode="compact"
        :show-info="true"
    />
  </DxDataGrid>
</template>