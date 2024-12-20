<script lang="ts">
    export let value: number = 0;
    let className = '';
    export { className as class };
  </script>
  
  <div class={`relative h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
    <div
      class="h-full bg-indigo-600 transition-all duration-300"
      style={`width: ${value}%`}
    />
  </div>