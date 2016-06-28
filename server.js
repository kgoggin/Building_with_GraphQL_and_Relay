import express from 'express';
import webpack from 'webpack';
import GraphQLHTTP from 'express-graphql';
import path from 'path';
import config from './webpack.config';
import schema from './data/schema';
import links from './data/links';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/graphql', GraphQLHTTP({
	schema: schema(links),
	graphiql: true
}));

app.get('*', function(request, response) {
	response.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log(`Server listening on http://localhost:${port}`);
	}
});
