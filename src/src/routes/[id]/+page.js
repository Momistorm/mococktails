export async function load({ params, fetch }) {
	const response = await fetch(
		`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
	);
	const data = await response.json();
	return { cocktail: data.drinks[0] };
}
