<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {onMounted, reactive} from "vue";

const reactiveData = reactive({
  allTodos: [],
  newTodo: {}
})
const TODOS_KEY = 'todosList';
const getTodos = () => JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
const saveTodo = () => {
  const allTodos = getTodos();
  allTodos.push(reactiveData.newTodo);
  localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
  loadTodos();
}
const loadTodos = () => {
  reactiveData.allTodos = getTodos();
}
onMounted(() => {
  loadTodos();
})
const onInput = (value: string) => {
  reactiveData.newTodo = {
    id: reactiveData.allTodos.length + 1,
    description: value,
    completed: false
  }
}
</script>

<template>
  <div class="container mx-auto py-8 px-auto w-96">
    <div class="overflow-hidden shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">ToDo List</h3>
      </div>
      <div class="border-t border-indigo-600">
        <div class="py-5 sm:grid sm:gap-4 sm:px-6">
          <base-input placeholder="Inserisci testo.." @get:content="onInput"></base-input>
        </div>
        <div class="px-4 py-5 sm:grid sm:gap-4 sm:px-6">
          <base-button :type="'solid'" @send:action="saveTodo()">
            <template #label>
              Inserisci ToDo
            </template>
          </base-button>
        </div>
        <div class="py-2 p-8" v-for="todo in reactiveData.allTodos" :key="todo.id">
          <div
              class="cursor-pointer p-4 mx-auto rounded-xl shadow-lg flex items-center space-x-7 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-pink-500 hover:to-yellow-500">
            <div class="shrink-0">
              <base-check-box @get:content="onInput"></base-check-box>
            </div>
            <div>
              <p class="text-white uppercase" :class="todo['completed'] ? 'line-through text-white/50' : ''">
                {{ todo.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>