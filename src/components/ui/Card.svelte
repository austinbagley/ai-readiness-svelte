<script lang="ts">
    let className = '';
    export { className as class };
  </script>
  
  <div class={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
    <slot />
  </div>