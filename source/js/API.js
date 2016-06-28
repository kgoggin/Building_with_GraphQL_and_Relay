import { get } from 'jquery';

let API = {
	fetchLinks() {
		get('/data/links', (data) => {
			console.log(data);
		})
	}
}

export default API;
