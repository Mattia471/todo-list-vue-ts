<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {reactive} from "vue";

const reactiveData = reactive({
  typeButton: ""
});
//ottiengo il valore dall emit di BaseInput.vue
const onInput = (value: string) => {
  reactiveData.typeButton = value;
}
</script>

<template>
  <div class="container mx-auto">
    <div class="overflow-hidden shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Si2001 Frontend Test</h3>
      </div>
      <div class="border-t border-indigo-600">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <h1>Base Input</h1>
            <base-input placeholder="Descrizione task" @get:content="onInput"></base-input>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <h1>Base Button</h1>
            <base-button :type="'solid'">
              <template #label>
                Invia
              </template>
            </base-button>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>