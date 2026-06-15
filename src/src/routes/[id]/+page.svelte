<script>
	const { data } = $props();
	const cocktail = $derived(data.cocktail);
	import Cocktaildetails from '$lib/components/Cocktaildetails.svelte';
</script>

<Cocktaildetails {cocktail} />
