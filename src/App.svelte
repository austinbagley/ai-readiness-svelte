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

