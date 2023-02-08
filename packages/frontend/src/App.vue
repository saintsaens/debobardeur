<script setup lang="ts">
import { onMounted, ref, TextareaHTMLAttributes } from 'vue';
import { postData } from './main';

const text = ref('');
const response = ref('');

async function handleKeyDown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    await updateResponse();
  }
};

async function updateResponse() {
  response.value = await postData(text.value);
};
</script>

<template>
  <div class="wrapper">
    <textarea v-model="text" class="input" @keydown="handleKeyDown" autofocus placeholder="Entrez votre texte.">
  </textarea>
    <div class="button-wrapper">
      <input type="submit" value="Débobardiser (⌘+↵)" class="button-4" role="button" @click="updateResponse">
    </div>
    <p v-if="response" class="preview">{{ response }}</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 800px;

  .input {
    height: 200px;
  }

  .preview {
    margin: 0;
  }
}
</style>
