import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import fs from 'fs';

import Schema from './data/schema';
import links from './data/links';

let schema = Schema(links);

let json = graphql(schema, introspectionQuery).then(json => {
	fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), error => { if (error) {
			throw error;
		}
		console.log('JSON schema created');
	});
});

