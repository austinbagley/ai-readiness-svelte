<!-- components/Intro.svelte -->
<script lang="ts">
    import { currentStage } from '../lib/stores';
    import Card from './ui/Card.svelte';
    import Button from './ui/Button.svelte';
    import { ChevronRight } from 'lucide-svelte';
  
    function startAssessment() {
      currentStage.set('survey');
    }
  </script>
  
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <Card class="w-full max-w-4xl bg-white">
      <div class="p-6">
        <div class="space-y-8">
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold text-slate-900">
              AI Readiness Assessment
            </h1>
            <p class="text-lg text-slate-600">
              Evaluate your organization's AI maturity and get personalized recommendations to enhance your AI capabilities.
            </p>
            <div class="prose max-w-none text-slate-600">
              <p>This assessment will:</p>
              <ul>
                <li>Take approximately 5-10 minutes to complete</li>
                <li>Ask 10 questions about your organization's AI practices</li>
                <li>Provide detailed insights and recommendations</li>
                <li>Compare your results with industry benchmarks</li>
              </ul>
            </div>
          </div>
  
          <Button 
            on:click={startAssessment}
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Take Assessment
            <ChevronRight class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  </div>