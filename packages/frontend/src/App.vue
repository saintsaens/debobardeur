<script setup lang="ts">
import { ref } from 'vue';
import { postData } from './api';

const text = ref('');
const response = ref('');
const copySuccess = ref(false);

async function handleKeyDown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    await updateResponse();
  }
  else if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
    event.preventDefault();
    await copyResponse();
  }
};

async function updateResponse() {
  response.value = await postData(text.value);
};

async function copyResponse() {
  try {
    await navigator.clipboard.writeText(response.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy response to clipboard: ', err);
  }
}

</script>

<template>
  <div class="wrapper">
    <textarea v-model="text" class="input" @keydown="handleKeyDown" autofocus placeholder="Entrez votre texte.">
  </textarea>
    <div class="button-wrapper">
      <input type="submit" value="Débobardiser (⌘+↵)" class="button-4" role="button" @click="updateResponse">
    </div>
    <div v-if="response" class="response-wrapper">
      <p :class="{ 'preview': true, 'blink': copySuccess }">
        {{ response }}
      </p>

      <span class="material-symbols-outlined copy-icon" @click="copyResponse">
        content_copy
      </span>
    </div>
    <p v-if="copySuccess">Copié dans le presse-papiers !</p>
  </div>
</template>

<style scoped lang="scss">

.wrapper {
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 800px;
  
  .response-wrapper {
    display: flex;
    gap: 8px;
    width: 100%;
    .copy-icon {
      cursor: pointer;
      flex-grow: 0;
      flex-shrink: 0;
      background: var(--color-background-light);
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      color: var(--color-content-soft);
      &:hover{
        color: var(--color-content);
      }
    }
  }

  .input {
    height: 200px;
    box-sizing: border-box;
  }

  .preview {
    margin: 0;
    flex-grow: 1;
  }

  .blink {
    background: white;
    animation: blink 0.01s;
  }


  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
  }

}
</style>
