<script lang="ts">
  import { currentStage } from './lib/stores';
  import InitialForm from './components/InitialForm.svelte';
  import SurveyQuestion from './components/SurveyQuestion.svelte';
  import Results from '././components/Results.svelte';
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