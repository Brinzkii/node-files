const fs = require('fs');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(data);
	});
}

async function webcat(url) {
	try {
		resp = await axios.get(url);
		console.log(resp.data);
	} catch (err) {
		console.log(err);
	}
}

for (let i = 2; i < process.argv.length; i++) {
	let arg = process.argv[i];
	if (arg.includes('.txt')) {
		cat(arg);
	} else if (arg.includes('.com')) {
		webcat(arg);
	} else {
		console.log('Sorry, unsupported type!');
	}
}
