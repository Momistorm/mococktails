<script>
    let { cocktail } = $props();

    // The messy API parsing logic is now safely isolated here
    let ingredients = $derived.by(() => {
        let result = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (!ingredient) return result;
            result.push({ ingredient: ingredient, measure: measure || 'add to your liking' });
        }
        return result;
    });
</script>

<div class="mb-12">
    <h3 class="text-2xl font-bold text-[#2f4550] border-b-4 border-[#b8dbd9] pb-2 mb-6 inline-block">
        Ingredients
    </h3>
    <ul class="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {#each ingredients as i}
            <li class="flex justify-between items-center bg-[#f4f4f9] px-5 py-3 rounded-xl border border-[#b8dbd9]/30 hover:border-[#b8dbd9] transition-colors">
                <span class="font-bold text-[#2f4550]">{i.ingredient}</span>
                <span class="text-[#586f7c] text-sm text-right ml-4">{i.measure}</span>
            </li>
        {:else}
            <li class="text-[#586f7c] italic">No ingredients listed.</li>
        {/each}
    </ul>
</div>