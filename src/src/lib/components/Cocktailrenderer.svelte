<script>
    import Cocktail from '$lib/components/Cocktail.svelte';
    const { cocktails = undefined } = $props();
</script>

<main class="bg-[#f4f4f9] min-h-screen p-6">
    {#if cocktails && cocktails.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto content-start">
            {#each cocktails as cocktail}
                <Cocktail {cocktail}></Cocktail>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md border border-red-200 text-center">
            <svg class="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Keine Cocktails gefunden</h2>
            <p class="text-gray-600">Es wurden keine Daten an die Ansicht übergeben oder die API hat keine Ergebnisse geliefert.</p>
        </div>
    {/if}
</main>