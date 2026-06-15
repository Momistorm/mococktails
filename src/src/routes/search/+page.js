export async function load({ url, fetch }) {
	//Use url to get parameters
	const q = url.searchParams.get('q')?.trim() || '';
	const category = url.searchParams.get('category') || 'All';

	let cocktails = [];

	if (q !== '') {
		//Case 1: Search parameter is not empty
		const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q}`);
		const data = await response.json();
		cocktails = data.drinks || [];

		//Filter category afterwards
		if (category !== 'All') {
			cocktails = cocktails.filter((drink) => drink.strCategory === category);
		}
	} else {
		//Case 2: Search parameter is empty, fetch category
		const response = await fetch(
			`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
		);
		const data = await response.json();
		cocktails = data.drinks || [];
	}

	return { cocktails };
}
