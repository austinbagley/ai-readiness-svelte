<script lang="ts">
    import { assessment } from '../lib/stores';
    import { questions } from '../data/questions';
    import Card from './ui/Card.svelte';
    import Progress from './ui/Progress.svelte';
    import { fade } from 'svelte/transition';
    import type { Answer } from '../lib/types';
  
    // Reactive declarations
    $: currentQuestion = questions[$assessment.currentQuestionIndex];
    $: progress = (($assessment.currentQuestionIndex) / questions.length) * 100;
  
    // Handle option selection
    function handleOptionSelect(value: number) {
      const answer: Answer = {
        questionId: currentQuestion.id,
        value,
        component: currentQuestion.component
      };
      assessment.addAnswer(answer);
    }
  </script>
  
  <div class="bg-slate-50 flex items-center justify-center p-4">
    <Card class="w-full max-w-4xl bg-white">
      <div class="p-6">
        <div class="space-y-8">
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-600">
                Question {$assessment.currentQuestionIndex + 1} of {questions.length}
              </span>
              <span class="text-sm text-slate-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} />
          </div>
  
          <div class="space-y-6" in:fade>
            <h2 class="text-xl font-semibold text-slate-900">{currentQuestion.text}</h2>
  
            <div class="space-y-3">
              {#each currentQuestion.options as option}
                <button
                  on:click={() => handleOptionSelect(option.value)}
                  class="w-full p-4 text-left rounded-lg border border-slate-200 
                    hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200
                    group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-300 
                      group-hover:border-indigo-600 group-hover:bg-indigo-100 
                      flex items-center justify-center text-sm font-medium text-slate-600 
                      group-hover:text-indigo-700">
                      {option.value}
                    </div>
                    <span class="text-slate-700 group-hover:text-slate-900">
                      {option.label}
                    </span>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>