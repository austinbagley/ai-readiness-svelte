<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button";
    export let variant: "default" | "outline" | "ghost" = "default";
    let className = '';
    export { className as class };
  
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 h-10",
      outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
      ghost: "hover:bg-slate-100 hover:text-slate-900"
    };
  </script>
  
  <button
    {type}
    class={`${baseStyles} ${variants[variant]} ${className}`}
    on:click
  >
    <slot />
  </button>