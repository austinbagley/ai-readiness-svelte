<script lang="ts">
  // Using let for DOM attributes that match reserved words
  let labelFor = "";
  let className = '';
  export { className as class, labelFor as for };
</script>

<label
  for={labelFor}
  class={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
>
  <slot />
</label>