<script>
    import Header from '$lib/components/Header.svelte';
    import IngredientList from '$lib/components/IngredientList.svelte';
    import FavouriteButton from '$lib/components/FavouriteButton.svelte';
    
    let { cocktail } = $props();

    let tags = $derived.by(() => {
        if (cocktail.strTags) {
            return cocktail.strTags.split(',').map(tag => tag.trim());
        }
        return [];
    });
</script>

<Header />

<div class="bg-[#f4f4f9] min-h-screen lg:p-8">
    <div class="max-w-[1600px] mx-auto bg-white lg:rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[75vh]">
        
        <div class="w-full lg:w-1/2 relative h-[50vh] lg:h-auto bg-[#2f4550]">
            <img
                class="absolute inset-0 h-full w-full object-cover"
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
            />
        </div>

        <div class="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col bg-white">
            
            <p class="text-sm font-bold text-[#586f7c] uppercase tracking-widest mb-2">
                {cocktail.strCategory}
            </p>

            <h1 class="text-4xl md:text-6xl font-black text-[#2f4550] mb-6 tracking-tight leading-tight">
                {cocktail.strDrink}
            </h1>
            
            <div class="flex flex-wrap gap-4 items-center mb-10">
                <div class="inline-block bg-[#586f7c] text-[#f4f4f9] px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm">
                    Glass: <span class="font-normal">{cocktail.strGlass}</span>
                </div>
                
                <FavouriteButton cocktailId={cocktail.idDrink} />
            </div>

            <IngredientList {cocktail} />

            <div class="mb-12">
                <h3 class="text-2xl font-bold text-[#2f4550] border-b-4 border-[#b8dbd9] pb-2 mb-6 inline-block">
                    Instructions
                </h3>
                <p class="text-[#2f4550] text-lg leading-relaxed">
                    {cocktail.strInstructions}
                </p>
            </div>

            {#if tags.length > 0}
                <div class="mt-auto pt-8 border-t border-[#f4f4f9]">
                    <p class="text-sm font-bold text-[#586f7c] mb-3 uppercase tracking-wider">Tags</p>
                    <ul class="flex flex-wrap gap-2">
                        {#each tags as tag}
                            <li class="bg-[#b8dbd9]/40 text-[#2f4550] px-4 py-2 rounded-lg text-sm font-bold tracking-wide">
                                #{tag}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
            
        </div>
    </div>
</div>