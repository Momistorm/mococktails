<script>
    import Cocktailrenderer from '$lib/components/Cocktailrenderer.svelte';
    import Header from '$lib/components/Header.svelte';

    const { data } = $props();
    const cocktails = $derived(data.cocktails);
</script>

<Header/>

<div class="bg-[#f4f4f9] min-h-screen">
    <div class="pt-8 text-center">
        <p class="inline-block bg-[#b8dbd9]/40 text-[#2f4550] px-4 py-1.5 rounded-full font-bold text-sm">
            Found {cocktails ? cocktails.length : 0} drinks
        </p>
    </div>

    {#if data.cocktails && data.cocktails.length > 0}
        <Cocktailrenderer cocktails={data.cocktails} />
    {:else}
        <div class="text-center mt-20">
            <p class="text-2xl font-bold text-[#2f4550]">No cocktails found.</p>
            <p class="text-[#586f7c] mt-2">Try adjusting your search terms.</p>
        </div>
    {/if}
</div>