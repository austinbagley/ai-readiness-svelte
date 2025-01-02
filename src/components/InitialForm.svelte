<script lang="ts">
  import { assessment } from '../lib/stores';
  import Card from '././ui/Card.svelte';
  import Button from '././ui/Button.svelte';
  import Input from '././ui/Input.svelte';
  import Label from '././ui/Label.svelte';
  import Select from '././ui/Select.svelte';
  import { ChevronRight } from 'lucide-svelte';
  import type { UserData } from '../lib/types';

  // Form data with type safety
  let formData: UserData = {
    name: '',
    title: '',
    email: '',
    industry: ''
  };

  const industries = [
    'Technology',
    'Financial Services',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Education',
    'Government',
    'Other'
  ];

  // Form submission handler
  function handleSubmit() {
    console.log('submit handled yo')
    assessment.updateUserData(formData);
  }
</script>

<div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
  <Card class="w-full max-w-4xl bg-white">
    <div class="p-6">
      <div class="space-y-8">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold text-slate-900">
            AI Readiness Assessment
          </h1>
          <p class="text-slate-600">
            Evaluate your organization's AI maturity and get personalized recommendations
          </p>
        </div>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Full Name</Label>
            <Input
              id="name"
              bind:value={formData.name}
              placeholder="John Doe"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="title">Job Title</Label>
            <Input
              id="title"
              bind:value={formData.title}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="email">Business Email</Label>
            <Input
              id="email"
              type="email"
              bind:value={formData.email}
              placeholder="john@company.com"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="industry">Industry</Label>
            <Select
              id="industry"
              bind:value={formData.industry}
              options={industries}
              placeholder="Select your industry"
            />
          </div>

          <Button type="submit" class="w-full">
            Start Assessment
            <ChevronRight class="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  </Card>
</div>