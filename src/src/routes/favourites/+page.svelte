<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Cocktailrenderer from '$lib/components/Cocktailrenderer.svelte';
    import { favouritesStore } from '$lib/favourites.svelte.js';

    let fetchedCocktails = $state([]);
    let isLoading = $state(true);

    let displayedCocktails = $derived(
        fetchedCocktails.filter(cocktail => favouritesStore.has(cocktail.idDrink))
    );

    onMount(async () => {
        isLoading = true;
        const ids = favouritesStore.items;

        if (ids.length > 0) {
            const requests = ids.map(id => 
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(res => res.json())
            );
            
            const responses = await Promise.all(requests);
            
            fetchedCocktails = responses.map(response => response.drinks[0]);
        }
        
        isLoading = false;
    });
</script>

<Header />

<div class="bg-[#f4f4f9] min-h-screen pb-10">
    <main class="max-w-[1600px] mx-auto pt-8">
        <h1 class="text-4xl font-black text-center mb-8 text-[#2f4550]">Your Collection</h1>

        {#if isLoading}
            <div class="flex justify-center mt-20">
                <div class="px-6 py-3 bg-[#b8dbd9]/30 rounded-full">
                    <p class="text-lg text-[#2f4550] font-bold animate-pulse">Mixing your favourites...</p>
                </div>
            </div>
            
        {:else if displayedCocktails.length === 0}
            <div class="text-center mt-24 bg-white max-w-lg mx-auto p-12 rounded-3xl shadow-sm border border-gray-100">
                <span class="text-7xl block mb-6">🍸</span>
                <p class="text-2xl text-[#2f4550] mb-8 font-bold">Your bar is empty.</p>
                <a 
                    href="/" 
                    class="inline-block bg-[#586f7c] text-[#f4f4f9] px-8 py-3.5 rounded-xl font-bold hover:bg-[#2f4550] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    Discover Cocktails
                </a>
            </div>
            
        {:else}
            <Cocktailrenderer cocktails={displayedCocktails} />
        {/if}
    </main>
</div>