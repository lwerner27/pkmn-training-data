import { json } from '@sveltejs/kit';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const requestData = await request.json();
	let dataSet = [];

	// Path to database file.
	const filePath = 'data.json';

	// Check for the JSON file.
	if (!fs.existsSync(filePath)) {
		fs.writeFile(filePath, JSON.stringify(dataSet), 'utf8', (err) => {
			if (err) {
				console.log(err);
				return json({ status: 500, msg: 'Something went wrong, try again later.' });
			} else {
				console.log('Created file: ', filePath);
			}
		});
	}

	// Load the data from the JSON File.
	dataSet = fs.readFileSync(filePath, 'utf8');
	dataSet = JSON.parse(dataSet);

	// Append the new pokmeon to the array.
	dataSet.push(requestData);

	// Write the new JSON back to the disk.
	fs.writeFile(filePath, JSON.stringify(dataSet), 'utf8', (err) => {
		if (err) {
			console.log(err);
			return json({ status: 500, msg: 'Something went wrong, try again later.' });
		} else {
			console.log('data.json has been updated.');
		}
	});

	return json({ status: 201, msg: 'Entry added successfully.' });
}
