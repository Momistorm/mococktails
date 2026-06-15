<script>
    import Cocktailrenderer from '$lib/components/Cocktailrenderer.svelte';
    import Header from '$lib/components/Header.svelte';
    
    const { data } = $props();
    const cocktails = $derived(data.cocktails);
    
    const errorMessage = $derived(data.error);
</script>

<Header/>

{#if errorMessage}
    <div class="min-h-[80vh] bg-[#f4f4f9] flex items-center justify-center p-6">
        <div class="bg-white p-10 rounded-3xl shadow-md text-center max-w-lg border border-[#f4f4f9]">
            <span class="text-6xl block mb-6">🔌</span>
            <h2 class="text-3xl font-black text-[#2f4550] mb-4">Verbindung fehlgeschlagen</h2>
            <p class="text-lg text-[#586f7c] mb-8 leading-relaxed">
                {errorMessage}
            </p>
            <button 
                onclick={() => window.location.reload()} 
                class="bg-[#2f4550] text-[#f4f4f9] px-8 py-3 rounded-xl font-bold hover:bg-[#000000] hover:shadow-lg transition-all"
            >
                Erneut versuchen
            </button>
        </div>
    </div>
{:else}
    <h1 class="text-4xl font-black text-center mb-8 text-[#2f4550] mt-8">Explore Cocktails</h1>
    <Cocktailrenderer {cocktails}/>
{/if}