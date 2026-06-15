export async function load({ fetch }) {
	const uniqueCocktails = new Map();

	//Amount of cocktails that get displayed
	const TARGET_AMOUNT = 60;

	let attempts = 0;

	const MAX_ATTEMPTS = 80;

	try {
		while (uniqueCocktails.size < TARGET_AMOUNT && attempts < MAX_ATTEMPTS) {
			attempts++;
			const needed = TARGET_AMOUNT - uniqueCocktails.size;

			//Max 10 Requests at a time, to not get blocked by API
			const batchSize = Math.min(needed, 10);

			const requests = Array.from({ length: batchSize }).map(() =>
				fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
					.then((res) => {
						if (!res.ok) return null;
						return res.json();
					})
					//Catches network connection errors
					.catch(() => null)
			);

			const responses = await Promise.all(requests);

			responses.forEach((json) => {
				if (json && json.drinks) {
					const drink = json.drinks[0];
					uniqueCocktails.set(drink.idDrink, drink);
				}
			});
		}

		//No connection
		if (uniqueCocktails.size === 0) {
			return {
				cocktails: [],
				error:
					'Die Cocktail-API ist momentan nicht erreichbar. Bitte versuche es später noch einmal.'
			};
		}

		//Ok
		return {
			cocktails: Array.from(uniqueCocktails.values()),
			error: null
		};

		//Catch errors in case something bad happens
	} catch (err) {
		return {
			cocktails: [],
			error: 'Ein kritischer Verbindungsfehler ist aufgetreten.'
		};
	}
}
