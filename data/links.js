// to make it easier to reference entities, we'll do a map instead of an array
const store = {
	"42": {
		"title": "React.js Home Page",
		"url": "https://facebook.github.io/react"
	},
	"43": {
		"title": "Relay.js Home Page",
		"url": "https://facebook.github.io/relay"
	}
}

function generateHash(title) {
	var hash = 0, i, chr, len;
	if (title.length === 0) return hash;
	for (var i = 0; i < title.length; i++) {
		chr   = title.charCodeAt(i);
		hash  = ((hash << Math.floor(Math.random() * 10)) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

export const getLink = (id) => {
	if (store[id]) {
		return Object.assign({},
			store[id],
			{ id }
		);
	}

	return null;
};

export const getLinks = () => {
	return Object.keys(store).map(id => {
		return Object.assign({},
			store[id],
			{ id }
		);
	});
};

export const addLink = (title, url) => {
	const id = generateHash(title);
	const newLink = {
		title,
		url
	};

	store[id] = newLink;

	return Object.assign({},
		newLink,
		{ id }
	);
};
