import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString
} from 'graphql';

let counter = 42;

let schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: function() {
			return {
				counter: {
					type: GraphQLInt,
					resolve: () => counter
				},
				message: {
					type: GraphQLString,
					resolve: () => {
						return "Hello GraphQL"
					}
				}
			}
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: function () {
			return {
				incrementCounter: {
					type: GraphQLInt,
					resolve: () => ++counter
				}
			}
		}
	})
});

export default schema;
