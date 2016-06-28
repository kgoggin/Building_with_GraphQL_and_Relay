import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from 'graphql';

let Schema = (data) => {
	let store = {};

	let storeType = new GraphQLObjectType({
		name: 'Store',
		fields: function() {
			return {
				links: {
					type: new GraphQLList(linkType),
					resolve: () => data
				}
			}
		}
	});

	let linkType = new GraphQLObjectType({
		name: 'Link',
		fields: function() { 
			return  {
				_id: { type: GraphQLString },
				title: { type: GraphQLString },
				url: { type: GraphQLString }
			}
		}
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: function() {
				return {
					store: {
						type: storeType,
						resolve: () =>  store  // TODO: Bring in data.
					}
				}
			}
		})
	});

	return schema;
};

export default Schema;
