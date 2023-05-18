<script setup lang="ts">
import { ref } from 'vue';
import { postData } from './api';

const text = ref('');
const response = ref('');
const suppressions = ref('');
const remplacements = ref('');
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
  const data = await postData(text.value);
  response.value = data.text;
  suppressions.value = data.modifications.suppressions;
  remplacements.value = data.modifications.remplacements;
};

async function copyResponse() {
  try {
    await navigator.clipboard.writeText(response.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 100);
  } catch (err) {
    console.error('Failed to copy response to clipboard: ', err);
  }
}

</script>

<template>
  <div class="wrapper">
    <div class="input-wrapper">
      <textarea v-model="text" class="input" @keydown="handleKeyDown" autofocus placeholder="Entrez votre texte.">
        </textarea>
    </div>
    <div class="button-wrapper">
      <input type="submit" value="Débobardiser (⌘+↵)" class="button-4" role="button" @click="updateResponse">
    </div>
    <div v-if="response" class="response-wrapper">
      <p :class="{ 'preview': true, 'blink': copySuccess }">
        {{ response }}
      </p>

      <span class="material-symbols-outlined copy-icon" :class="{ 'flash': copySuccess }" @click="copyResponse">
        content_copy
      </span>
    </div>
    <div v-if="suppressions.length > 0 || remplacements.length > 0">
      Modifications :
      <ul>
        <li v-for="suppression in suppressions" :key="suppression"><span class="removed">{{ suppression }}</span></li>
        <li v-for="remplacement in remplacements" :key="remplacement"><span class="removed">{{ remplacement.old }}</span>
          → {{ remplacement.new }}</li>
      </ul>
    </div>
    <p v-if="response && suppressions.length == 0 && remplacements.length == 0">Aucun bobard détecté. 🎉</p>
    <footer class="footer">
      <div class="footer-left">
        <p class="footer-left-text">2023-05-18 14:20 — 0.1.0 (219).</p>
      </div>
      <div class="footer-center">
      </div>
      <div class="footer-right">
        <p><a href="https://flavienrobert.notion.site/propos-du-d-bobardeur-3d74befdf3a449a880815391b585de8e" target="_blank"
            rel="noopener">À propos</a></p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 16px;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  @media screen and (min-width: 900px) {
    width: 800px;
  }

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

      &:hover {
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

  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
  }

  .footer {
    display: none;
    /* hide the footer by default */
  }

  @media screen and (min-width: 1100px) {
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      display: flex;
      align-items: center;
      // background-color: var(--color-background-light);
      color: var(--color-content-soft);
      font: 12px "Lucida Grande", Helvetica, Arial, sans-serif;
      // box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1;
    }

    .footer-left {
      display: flex;
      justify-content: flex-start;
      padding-left: 20px;
    }

    .footer-left-text {
      font-size: 9px;
    }

    .footer-center {
      display: flex;
      justify-content: center;
      flex-grow: 1;
    }

    .footer-right {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
  }


  .flash {
    animation: flash 0.5s;
  }

  @keyframes flash {
    0% {
      background-color: white;
    }

    100% {
      background-color: inherit;
    }
  }

  .removed {
    text-decoration: line-through;
    color: #ff6666;
  }

}
</style>
