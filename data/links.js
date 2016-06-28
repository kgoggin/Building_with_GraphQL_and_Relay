let links = [{
	"id": 42,
	"title": "React.js Home Page",
	"url": "https://facebook.github.io/react"
}, {
	"id": 43,
	"title": "Relay.js Home Page",
	"url": "https://facebook.github.io/relay"
}];

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

export function createLink (linkTitle, linkUrl) {
	var newLink = {
		id: generateHash(linkTitle),
		title: linkTitle,
		url: linkUrl
	}
	links.push(newLink);
	return newLink;
}

export default links;
