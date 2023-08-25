const fs = require('fs');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(data);
	});
}

for (let i = 2; i < process.argv.length; i++) {
	cat(process.argv[i]);
}
