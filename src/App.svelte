<!-- App.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { currentStage, assessment } from './lib/stores';
  import Intro from './components/Intro.svelte';
  import InitialForm from './components/InitialForm.svelte';
  import SurveyQuestion from './components/SurveyQuestion.svelte';
  import Results from './components/Results.svelte';

  onMount(() => {
    console.log('App mounted, current stage:', $currentStage);
  });
</script>

<main class="min-h-screen bg-slate-50">
  {#key $currentStage}
    {#if $currentStage === 'intro'}
      <Intro />
    {:else if $currentStage === 'survey'}
      <SurveyQuestion />
    {:else if $currentStage === 'userForm'}
      <InitialForm />
    {:else}
      <Results />
    {/if}
  {/key}
</main>