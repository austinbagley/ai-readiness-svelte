<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { currentStage } from './lib/stores';
  import InitialForm from './components/InitialForm.svelte';
  import SurveyQuestion from './components/SurveyQuestion.svelte';
  import Results from './components/Results.svelte';

  afterUpdate(() => {
    const appElement = document.getElementById('app-4dfkr3');
    if (appElement) {
      appElement.style.display = 'none';
      setTimeout(() => {
        if (appElement) {
          appElement.style.display = 'block';
        }
      }, 0);
    }
  });
</script>

<main class="min-h-screen bg-slate-50">
  {#if $currentStage === 'initial'}
    <InitialForm />
  {:else if $currentStage === 'survey'}
    <SurveyQuestion />
  {:else}
    <Results />
  {/if}
</main>