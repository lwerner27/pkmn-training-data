import fs from 'fs';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let pokemonNames = [];

	// Path to database file.
	const filePath = 'names.json';

	// Check for the JSON file.
	if (!fs.existsSync(filePath)) {
		let pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
		pokemonData = await pokemonData.json();

		pokemonData.results.forEach((pokemon) => {
			pokemonNames.push(pokemon.name);
		});

		fs.writeFile(filePath, JSON.stringify(pokemonNames), 'utf8', (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Created file: ', filePath);
			}
		});
	} else {
		pokemonNames = fs.readFileSync(filePath, 'utf8');
		pokemonNames = JSON.parse(pokemonNames);
		// console.log('Names read from JSON file.');
	}

	return { pokemonNames };
}
