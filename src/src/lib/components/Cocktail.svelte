<script>
    import FavouriteButton from '$lib/components/FavouriteButton.svelte';

    let { cocktail } = $props();

    let tags = $derived.by(() => {
        if (cocktail.strTags) {
            return cocktail.strTags.split(',').map(tag => tag.trim());
        }
        return [];
    });
</script>

<div class="flex flex-col h-full bg-white border border-[#f4f4f9] text-center pb-5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
    
    <a href="/{cocktail.idDrink}" class="flex-grow block">
        <div class="relative w-full aspect-square overflow-hidden bg-[#f4f4f9]">
            <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink} 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
        </div>
        
        <div class="p-5 flex flex-col items-center">
            <h2 class="text-xl font-bold text-[#2f4550] leading-tight mb-1">{cocktail.strDrink}</h2>
            <p class="text-xs font-bold text-[#586f7c] uppercase tracking-widest mb-4">
                {cocktail.strCategory}
            </p>
            
            {#if tags.length > 0}
                <div class="flex flex-wrap justify-center gap-2 mt-2">
                    {#each tags as tag}
                        <span class="bg-[#b8dbd9]/30 text-[#2f4550] text-[10px] px-2.5 py-1 rounded-md font-semibold tracking-wide">
                            {tag}
                        </span>
                    {/each}
                </div>
            {/if}
        </div>
    </a>

    <div class="px-5 mt-auto pt-3 w-full">
        <FavouriteButton cocktailId={cocktail.idDrink} customClass="w-full" />
    </div>
</div>