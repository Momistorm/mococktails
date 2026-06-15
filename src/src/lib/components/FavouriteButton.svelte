<script>
    import { favouritesStore } from '$lib/favourites.svelte.js';
    
    let { cocktailId, customClass = "" } = $props();
</script>

<button 
    onclick={(e) => {
        //Block standard behaviour
        e.preventDefault();

        //No event bubbling
        e.stopPropagation();
        favouritesStore.toggle(cocktailId);
    }}
    class="py-2.5 px-4 rounded-xl font-bold transition-all duration-300 text-sm shadow-sm {customClass} 
    {favouritesStore.has(cocktailId) 
        ? 'bg-[#2f4550] text-[#f4f4f9] hover:bg-[#000000]' 
        : 'bg-[#586f7c] text-[#f4f4f9] hover:bg-[#2f4550]'}"
>
    {favouritesStore.has(cocktailId) ? 'Remove from Favourites ♥' : 'Add to Favourites ♡'}
</button>