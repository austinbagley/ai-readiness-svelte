<script lang="ts">
  // Default to text type, but allow specific types to be set
  export let type = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let id: string = "";
  let className = '';
  export { className as class };
</script>

{#if type === "email"}
  <input
    type="email"
    {id}
    {placeholder}
    {required}
    bind:value
    class={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    on:input
    on:change
  />
{:else}
  <input
    type="text"
    {id}
    {placeholder}
    {required}
    bind:value
    class={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    on:input
    on:change
  />
{/if}