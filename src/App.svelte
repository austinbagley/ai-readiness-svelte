<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { currentStage, assessment } from './lib/stores';
  import InitialForm from './components/InitialForm.svelte';
  import SurveyQuestion from './components/SurveyQuestion.svelte';
  import Results from './components/Results.svelte';

  let mounted = false;

  onMount(() => {
    mounted = true;
    console.log('App.svelte mounted')
    console.log('Current stage:', $currentStage)
  });

  afterUpdate(() => {
    if (mounted) {
      // Force a re-render of the entire app container
      const appElement = document.getElementById('app-4dfkr3');
      if (appElement) {
        const display = appElement.style.display;
        appElement.style.opacity = '0';
        setTimeout(() => {
          if (appElement) {
            appElement.style.opacity = '1';
          }
        }, 50);
      }
    }
  });
</script>

<main class="min-h-screen bg-slate-50 transition-opacity duration-200">
  {#key $currentStage}
    {#if $currentStage === 'initial'}
      <InitialForm />
    {:else if $currentStage === 'survey'}
      <SurveyQuestion />
    {:else}
      <Results />
    {/if}
  {/key}
</main>