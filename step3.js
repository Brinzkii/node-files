const fs = require('fs');
const axios = require('axios');
const args = process.argv;

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(data);
	});
}

function catWrite(path, data) {
	fs.appendFile(path, data, 'utf8', (err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
}

async function webcat(url) {
	try {
		let resp = await axios.get(url);
		return resp.data;
	} catch (err) {
		console.log(err);
	}
}

if (args.includes('--out')) {
	if (args[3].includes('.txt') && args[4].includes('.txt')) {
		catWrite(args[3], args[4]);
	} else if (args[3].includes('.txt') && args[4].includes('.com')) {
		webcat(args[4]).then((data) => {
			catWrite(args[3], data);
		});
	}
} else {
	if (args[2].includes('.txt')) {
		cat(args[2]);
	} else if (args[2].includes('.com')) {
		webcat(args[2]).then((data) => {
			console.log(data);
		});
	}
}
