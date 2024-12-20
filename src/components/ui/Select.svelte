<script lang="ts">
    export let value: string = "";
    export let options: string[] = [];
    export let placeholder: string = "Select an option";
    export let id: string = "";
    let className = '';
    export { className as class };
  </script>
  
  <select
    {id}
    bind:value
    class={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    <option value="" disabled selected>{placeholder}</option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>