<script>
    import { onMount } from 'svelte';

    //Page is needed to read parameters
    import { page } from '$app/stores';
    import { favouritesStore } from '$lib/favourites.svelte.js';

    let filterText = $state($page.url.searchParams.get('q') || '');
    let selectedCategory = $state($page.url.searchParams.get('category') || 'All');
    let categories = $state([]);
    
    let isMenuOpen = $state(false);

    let isSearchDisabled = $derived(filterText.trim() === '' && selectedCategory === 'All');

    async function getCategories() {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        return data.drinks;
    }

    //OnMount runs when component has already been fully loaded
    onMount(async () => {
        categories = await getCategories();
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<header class="bg-[#586f7c] shadow-md sticky top-0 z-50 transition-all relative">
    <div class="px-6 py-4 flex items-center justify-between max-w-[1600px] mx-auto">
        
        <a href="/" class="text-[#f4f4f9] text-2xl font-black tracking-tight hover:text-[#b8dbd9] transition-colors z-10">
            Mo's Cocktails
        </a>

        <button
            class="lg:hidden text-[#f4f4f9] hover:text-[#b8dbd9] focus:outline-none z-10 transition-colors"
            onclick={toggleMenu}
            aria-label="Toggle Menu"
        >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {#if isMenuOpen}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                {/if}
            </svg>
        </button>

        <div class="
            {isMenuOpen ? 'flex' : 'hidden'} 
            absolute top-full left-0 w-full bg-[#586f7c] p-6 shadow-xl border-t border-[#2f4550]
            lg:border-none lg:shadow-none lg:p-0 lg:bg-transparent lg:static lg:w-auto 
            flex-col gap-6 lg:flex lg:flex-row lg:items-center transition-all origin-top
        ">
            
            <a href="/random" class="text-[#f4f4f9] font-medium hover:text-[#b8dbd9] transition-colors text-lg lg:text-base" data-sveltekit-reload>
                Random
            </a>

            <a 
                href="/favourites" 
                class="text-[#2f4550] font-bold bg-[#b8dbd9] px-5 py-2.5 lg:py-2 rounded-xl flex items-center justify-between lg:justify-center gap-2 hover:bg-[#f4f4f9] transition-colors shadow-sm w-full lg:w-auto"
            >
                Favourites ♥︎
                <span class="bg-[#2f4550] text-white px-2.5 py-0.5 rounded-full text-xs">{favouritesStore.items.length}</span>
            </a>

            <!--Form is more practical than link because browser automatically generates link-->
            <form action="/search" method="GET" class="flex flex-col lg:flex-row flex-1 items-stretch lg:items-center gap-3 w-full lg:w-auto">
                <input 
                    name="q" 
                    type="text" 
                    bind:value={filterText} 
                    placeholder="Search cocktail..."
                    class="w-full lg:w-48 px-4 py-3 lg:py-2 rounded-xl text-[#2f4550] bg-white border-2 border-transparent focus:border-[#b8dbd9] focus:outline-none transition-all shadow-sm" 
                />
                
                <select 
                    name="category" 
                    bind:value={selectedCategory} 
                    class="w-full lg:w-auto px-4 py-3 lg:py-2 rounded-xl text-[#2f4550] bg-white border-2 border-transparent focus:border-[#b8dbd9] focus:outline-none transition-all shadow-sm cursor-pointer"
                >
                    <option value="All">All Categories</option>
                    {#each categories as category}
                        <option value={category.strCategory}>{category.strCategory}</option>
                    {/each}
                </select>

                <button 
                    type="submit" 
                    disabled={isSearchDisabled}
                    class="w-full lg:w-auto bg-[#2f4550] text-[#f4f4f9] px-6 py-3 lg:py-2 rounded-xl font-bold transition-all shadow-sm
                           disabled:opacity-50 disabled:cursor-not-allowed hover:not(:disabled):bg-[#000000] hover:not(:disabled):shadow-md focus:outline-none focus:ring-2 focus:ring-[#b8dbd9]"
                >
                    Search
                </button>
            </form>
        </div>
    </div>
</header>