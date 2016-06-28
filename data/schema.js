import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from 'graphql';

let Schema = (data) => {
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
					links: {
						type: new GraphQLList(linkType),
						resolve: () =>  data  // TODO: Bring in data.
					}
				}
			}
		})
	});

	return schema;
};

export default Schema;
