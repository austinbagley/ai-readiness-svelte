<script lang="ts">
    import type { ChartData, ChartOptions } from 'chart.js';
    import { assessment, assessmentActions } from '../lib/stores';
    import { INDUSTRY_AVERAGES, ASSESSMENT_COMPONENTS } from '../data/questions';
    import Card from './ui/Card.svelte';
    import Button from './ui/Button.svelte';
    import { Download, RotateCcw } from 'lucide-svelte';
    import { Radar } from 'svelte-chartjs';
    import {
      Chart as ChartJS,
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    } from 'chart.js';

    // Define the chart data type
    type RadarChartData = ChartData<'radar', number[]>;
  
    // Convert readonly array to regular array for chart labels
    $: chartLabels = [...ASSESSMENT_COMPONENTS];

  
    // Register Chart.js components
    ChartJS.register(
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    );
  
    // Calculate component scores
    $: componentScores = calculateComponentScores($assessment.answers);
    $: industryAverages = INDUSTRY_AVERAGES[$assessment.userData?.industry || 'Other'];
    $: overallScore = calculateOverallScore(componentScores);
  
    // Calculate scores for each component
    function calculateComponentScores(answers: typeof $assessment.answers) {
      const scoresByComponent: Record<string, number[]> = {};
      
      answers.forEach(answer => {
        if (!scoresByComponent[answer.component]) {
          scoresByComponent[answer.component] = [];
        }
        scoresByComponent[answer.component].push(answer.value);
      });
  
      const averageScores: Record<string, number> = {};
      Object.entries(scoresByComponent).forEach(([component, scores]) => {
        averageScores[component] = scores.reduce((a, b) => a + b, 0) / scores.length;
      });
  
      return averageScores;
    }
  
    function calculateOverallScore(scores: Record<string, number>): number {
      const values = Object.values(scores);
      return values.reduce((a, b) => a + b, 0) / values.length;
    }

    

    
    // Format data for radar chart with proper typing
    $: chartData = {
        labels: chartLabels,
        datasets: [
        {
            label: 'Your Score',
            data: ASSESSMENT_COMPONENTS.map(component => componentScores[component] || 0),
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgb(79, 70, 229)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(79, 70, 229)'
        },
        {
            label: 'Industry Average',
            data: ASSESSMENT_COMPONENTS.map(component => industryAverages[component] || 0),
            backgroundColor: 'rgba(148, 163, 184, 0.2)',
            borderColor: 'rgb(148, 163, 184)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(148, 163, 184)'
        }
        ]
    } satisfies ChartData<'radar', number[]>;

    
    // Type the chart options
    $: chartOptions = {
        scales: {
        r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
            stepSize: 1
            }
        }
        },
        maintainAspectRatio: false
    } satisfies ChartOptions<'radar'>;
  
    // Generate recommendations based on scores
    function getRecommendations(component: string, score: number): string {
      if (score < 2) {
        return `Your ${component} maturity is at an early stage. Focus on establishing basic ${component.toLowerCase()} foundations.`;
      } else if (score < 3.5) {
        return `Your ${component} capabilities are developing. Consider strengthening your ${component.toLowerCase()} practices.`;
      } else {
        return `Strong ${component} performance. Look for opportunities to innovate and lead in ${component.toLowerCase()}.`;
      }
    }
  
    // Handle download report
    function downloadReport() {
      // Implement report download logic
      // For now, just print the page
      window.print();
    }
  </script>
  
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <Card class="w-full max-w-4xl bg-white">
      <div class="p-6">
        <div class="space-y-8">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-slate-900">
              Your AI Readiness Results
            </h1>
            <p class="text-xl text-slate-600">
              Overall Score: {overallScore.toFixed(1)} / 5
            </p>
            <p class="text-sm text-slate-500">
              {$assessment.userData?.name} • {$assessment.userData?.title} • {$assessment.userData?.industry}
            </p>
          </div>
  
          <div class="h-[400px] w-full">
            <Radar 
              data={chartData} 
              options={chartOptions}
            />
          </div>
  
          <div class="grid gap-4 md:grid-cols-2">
            <Button 
              on:click={downloadReport}
              class="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Download class="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button
              variant="outline"
              on:click={() => assessmentActions.resetAssessment()}
              class="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <RotateCcw class="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </div>
  
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-slate-900">Key Recommendations</h2>
            <div class="grid gap-4 md:grid-cols-2">
              {#each ASSESSMENT_COMPONENTS as component}
                <Card class="p-4 bg-slate-50">
                  <h3 class="font-semibold text-slate-900">
                    {component}: {componentScores[component]?.toFixed(1)}/5
                  </h3>
                  <p class="text-sm text-slate-600 mt-2">
                    {getRecommendations(component, componentScores[component] || 0)}
                  </p>
                </Card>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>