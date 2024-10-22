<script>
	export let data;
	let { pokemonNames } = data;
	let searchPokmeon = '';

	$: filteredNames = pokemonNames.filter(function (name) {
		return name.toLowerCase().includes(searchPokmeon.toLowerCase());
	});

	const setPokemon = (name) => {
		searchPokmeon = name;
		getPokemonInfo();
	};

	// Basic information
	let pokemonName;
	let primaryType;
	let secondaryType;

	// Base stat values
	let hp = 1;
	let attack = 1;
	let defense = 1;
	let spAttack = 1;
	let spDefense = 1;
	let speed = 1;

	// EV values
	let hpEvs = 0;
	let attackEvs = 0;
	let defenseEvs = 0;
	let spAttackEvs = 0;
	let spDefenseEvs = 0;
	let speedEvs = 0;

	// Additional Information
	let role;
	let fullyEvolved;

	const getPokemonInfo = async () => {
		if (!searchPokmeon) {
			alert('Please enter a name for the pokemon you want data for.');
			return;
		}

		const endpoint = `https://pokeapi.co/api/v2/pokemon/${searchPokmeon.toLowerCase()}`;

		let pokemon = await fetch(endpoint);

		pokemon = await pokemon.json();

		pokemonName = pokemon.name;

		primaryType = pokemon.types[0].type.name;

		if (pokemon.types.length > 1) {
			secondaryType = pokemon.types[1].type.name;
		} else {
			secondaryType = 'none';
		}

		pokemon.stats.forEach((stat) => {
			switch (stat.stat.name) {
				case 'hp':
					hp = stat.base_stat;
					break;
				case 'attack':
					attack = stat.base_stat;
					break;
				case 'defense':
					defense = stat.base_stat;
					break;
				case 'special-attack':
					spAttack = stat.base_stat;
					break;
				case 'special-defense':
					spDefense = stat.base_stat;
					break;
				case 'speed':
					speed = stat.base_stat;
					break;
			}
		});
	};

	const savePokemonData = async () => {
		let pokmeonData = {
			pokemonName,
			types: {
				primaryType,
				secondaryType
			},
			baseStats: {
				hp,
				attack,
				defense,
				spAttack,
				spDefense,
				speed
			},
			efforValues: {
				hpEvs,
				attackEvs,
				defenseEvs,
				spAttackEvs,
				spDefenseEvs,
				speedEvs
			},
			role,
			fullyEvolved
		};

		let response = await fetch('/api/pokemon/add', {
			method: 'POST',
			body: JSON.stringify(pokmeonData),
			headers: {
				'content-type': 'application/json'
			}
		});

		response = await response.json();

		if (response.status !== 201) {
			alert('Encountered internal error.');
			return;
		}

		alert(response.msg);

		searchPokmeon = '';

		// Basic information
		pokemonName = null;
		primaryType = '';
		secondaryType = '';

		// Base stat values
		hp = 1;
		attack = 1;
		defense = 1;
		spAttack = 1;
		spDefense = 1;
		speed = 1;

		// EV values
		hpEvs = 0;
		attackEvs = 0;
		defenseEvs = 0;
		spAttackEvs = 0;
		spDefenseEvs = 0;
		speedEvs = 0;

		// Additional Information
		role = null;
		fullyEvolved = null;
	};
</script>

<div class="px-6">
	<section class="md:w-1/2 mx-auto grid grid-cols-5 gap-x-4 mt-5">
		<label class="form-control col-span-4">
			<div class="dropdown">
				<input
					bind:value={searchPokmeon}
					type="text"
					placeholder="Pikachu"
					class="input input-bordered w-full"
				/>
				<ul
					class="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow max-h-40 w-full flex-nowrap overflow-auto"
				>
					{#each filteredNames as name}
						<li class="w-full">
							<a
								href="/"
								on:click={() => {
									setPokemon(name);
								}}>{name}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</label>
		<button class="btn btn-primary" on:click={getPokemonInfo}>Search</button>
	</section>
	<div class="divider"></div>
	<section>
		<form action="" class="md:grid grid-cols-4 gap-x-8">
			<div class="form-control mb-6 md:mb-0" id="basic-information">
				<input
					type="text"
					bind:value={primaryType}
					placeholder="Primary Type"
					class="input input-bordered mb-4"
				/>
				<input
					type="text"
					bind:value={secondaryType}
					placeholder="Secondary Type"
					class="input input-bordered"
				/>
			</div>
			<div class="form-control mb-6 md:mb-0">
				<label for="hp-slider" class="mb-4">
					<input id="hp-slider" type="range" min="1" max="255" bind:value={hp} class="range" />
					<div class="label">
						<span class="label-text-alt">HP</span>
						<span class="label-text-alt">{hp}</span>
					</div>
				</label>
				<label for="attack-slider" class="mb-4">
					<input
						id="attack-slider"
						type="range"
						min="1"
						max="255"
						bind:value={attack}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Attack</span>
						<span class="label-text-alt">{attack}</span>
					</div>
				</label>
				<label for="defense-slider" class="mb-4">
					<input
						id="defense-slider"
						type="range"
						min="1"
						max="255"
						bind:value={defense}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Defense</span>
						<span class="label-text-alt">{defense}</span>
					</div>
				</label>
				<label for="spAttack-slider" class="mb-4">
					<input
						id="spAttack-slider"
						type="range"
						min="1"
						max="255"
						bind:value={spAttack}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Special Attack</span>
						<span class="label-text-alt">{spAttack}</span>
					</div>
				</label>
				<label for="spDefense-slider" class="mb-4">
					<input
						id="spDefense-slider"
						type="range"
						min="1"
						max="255"
						bind:value={spDefense}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Special Defense</span>
						<span class="label-text-alt">{spDefense}</span>
					</div>
				</label>
				<label for="speed-slider" class="mb-4">
					<input
						id="speed-slider"
						type="range"
						min="1"
						max="255"
						bind:value={speed}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Speed</span>
						<span class="label-text-alt">{speed}</span>
					</div>
				</label>
			</div>
			<!-- Effort Values -->
			<div class="form-control mb-6 md:mb-0">
				<label for="hpEv-slider" class="mb-4">
					<input id="hpEv-slider" type="range" min="0" max="252" bind:value={hpEvs} class="range" />
					<div class="label">
						<span class="label-text-alt">HP EVs</span>
						<span class="label-text-alt">{hpEvs}</span>
					</div>
				</label>
				<label for="attackEv-slider" class="mb-4">
					<input
						id="attackEv-slider"
						type="range"
						min="0"
						max="252"
						bind:value={attackEvs}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Attack EVs</span>
						<span class="label-text-alt">{attackEvs}</span>
					</div>
				</label>
				<label for="defenseEv-slider" class="mb-4">
					<input
						id="defenseEv-slider"
						type="range"
						min="0"
						max="252"
						bind:value={defenseEvs}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Defense EVs</span>
						<span class="label-text-alt">{defenseEvs}</span>
					</div>
				</label>
				<label for="spAttackEv-slider" class="mb-4">
					<input
						id="spAttackEv-slider"
						type="range"
						min="0"
						max="252"
						bind:value={spAttackEvs}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Special Attack EVs</span>
						<span class="label-text-alt">{spAttackEvs}</span>
					</div>
				</label>
				<label for="spDefenseEv-slider" class="mb-4">
					<input
						id="spDefenseEv-slider"
						type="range"
						min="0"
						max="252"
						bind:value={spDefenseEvs}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Special Defense EVs</span>
						<span class="label-text-alt">{spDefenseEvs}</span>
					</div>
				</label>
				<label for="speedEv-slider" class="mb-4">
					<input
						id="speedEv-slider"
						type="range"
						min="0"
						max="252"
						bind:value={speedEvs}
						class="range"
					/>
					<div class="label">
						<span class="label-text-alt">Speed EVs</span>
						<span class="label-text-alt">{speedEvs}</span>
					</div>
				</label>
			</div>
			<div class="form-control mb-6 md:mb-0">
				<select bind:value={role} class="select select-bordered w-full mb-4">
					<option disabled selected>Select a Role...</option>
					<option>Offensive</option>
					<option>Defensive</option>
					<option>Supportive</option>
				</select>
				<select bind:value={fullyEvolved} class="select select-bordered w-full mb-4">
					<option disabled selected>Is this Pokemon fully evolved?</option>
					<option value={true}>Yes</option>
					<option value={false}>No</option>
				</select>
			</div>
			<button
				class="btn btn-primary md:col-start-2 w-full md:col-span-2 mt-2 mb-6 md:mb-0"
				on:click={savePokemonData}>Save Data</button
			>
		</form>
	</section>
</div>
