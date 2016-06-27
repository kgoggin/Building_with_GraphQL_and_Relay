import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString
} from 'graphql';

let schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: function() {
			return {
				counter: {
					type: GraphQLInt,
					resolve: function() {
						return 42
					}
				},
				message: {
					type: GraphQLString,
					resolve: function() {
						return "Hello GraphQL"
					}
				}
			}
		}
	})
});

export default schema;
