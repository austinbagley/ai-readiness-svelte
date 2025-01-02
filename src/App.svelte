<script lang="ts">
  import { onMount } from 'svelte';
  import { currentStage, assessment } from './lib/stores';
  import InitialForm from './components/InitialForm.svelte';
  import SurveyQuestion from './components/SurveyQuestion.svelte';
  import Results from './components/Results.svelte';

  onMount(() => {
    console.log('App mounted, current stage:', $currentStage);
  });

  $: {
    console.log('Stage changed to:', $currentStage);
    console.log('Current assessment state:', $assessment);
  }
</script>

<main class="min-h-screen bg-slate-50">
  <div class="debug-info">Current stage: {$currentStage}</div>
  {#key $currentStage}
    {#if $currentStage === 'initial'}
      <InitialForm />
    {:else if $currentStage === 'survey'}
      <div class="debug-container">
        {@html '<!-- survey container -->'}
        <SurveyQuestion />
      </div>
    {:else}
      <Results />
    {/if}
  {/key}
</main>

<style>
  .debug-info {
    position: fixed;
    top: 0;
    left: 0;
    background: #eee;
    padding: 5px;
    z-index: 1000;
  }
  
</style>