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
    <template #dataRowTemplate="{ data: rowInfo }">
      <tr class="main-row">
        <td>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor"
               fill="currentColor" class="w-6 h-6 p-1 rounded-md bg-blue-500 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" :d="rowInfo.data.icon"/>
          </svg>
        </td>
        <td>{{ rowInfo.data.name }}</td>
        <td>{{ rowInfo.data.topic }}</td>
        <td>{{ rowInfo.data.group }}</td>
        <td>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </td>
      </tr>
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