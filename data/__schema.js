import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from 'graphql';

import {
	mutationWithClientMutationId,
	globalIdField
} from 'graphql-relay';

import { createLink } from './links';

let Schema = (data) => {

	// Create our linkType 
	let linkType = new GraphQLObjectType({
		name: 'Link',
		fields: () => ({
			id: { type: GraphQLString },
			title: { type: GraphQLString },
			url: { type: GraphQLString }
		})
	});

	// Create our mutation to create links
	let createLinkMutation = mutationWithClientMutationId({
		name: 'CreateLink',

		inputFields: {
			title: { type: new GraphQLNonNull(GraphQLString) },
			url: { type: new GraphQLNonNull(GraphQLString) },
		},

		outputFields: {
			link: {
				type: linkType,
				resolve: (obj) => obj
			}
		},

		mutateAndGetPayload: ({ title, url }) => {
			let newLink = createLink(title, url);
			return newLink;
		}
	});

	// Create the GraphQL Schema
	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: () => ({
				links: {
					type: new GraphQLList(linkType),
					resolve: () => data
				}
			})
		}),

		mutation: new GraphQLObjectType({
			name: 'Mutation',
			fields: () => ({
				createLink: createLinkMutation
			})
		})
	});

	return schema;
}

export default Schema;
