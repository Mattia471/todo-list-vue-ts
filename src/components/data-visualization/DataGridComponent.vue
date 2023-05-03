<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  dataSource: any;
  columns: any;
}>();

const displayMode = 'compact'
</script>
<template>
  <DxDataGrid
      :data-source="props.dataSource"
      :columns="props.columns"
      :show-borders="true"
      :show-row-lines="true"
      :show-column-lines="false">
    <template #iconTemplate="{data:rowInfo}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor"
           fill="currentColor" class="w-6 h-6 p-1 rounded-md bg-blue-500 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" :d="rowInfo.data.icon"/>
      </svg>
    </template>
    <template #actionTemplate>
      <button class=" border-2 text-blue-500 border-blue-500 hover:bg-blue-700 p-1 rounded-full text-white font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </template>
    <DxScrolling row-rendering-mode="virtual"/>
    <DxPaging :page-size="10"/>
    <DxPager
        :visible="true"
        :display-mode="displayMode"
        :show-info="true"
    />
  </DxDataGrid>
</template>