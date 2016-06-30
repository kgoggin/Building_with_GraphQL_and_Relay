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
	let store = {};

	let storeType = new GraphQLObjectType({
		name: 'Store',
		fields: function() {
			return {
				id: globalIdField("Store"),
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
				id: { type: GraphQLString },
				title: { type: GraphQLString },
				url: { type: GraphQLString }
			}
		}
	});

	let createLinkMutation = mutationWithClientMutationId({
		name: 'CreateLink',

		inputFields: {
			title: { type: new GraphQLNonNull(GraphQLString) },
			url: { type: new GraphQLNonNull(GraphQLString) }
		},
		outputFields: {
			link: {
				type: linkType,
				resolve: (obj) => {
					return obj;
				}
			},
			store: {
				type: storeType,
				resolve: () => store
			}
		},
		mutateAndGetPayload: ({title, url}) => {
			let newLink = createLink(title, url);
			data.push(newLink);
			return newLink;
		}
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: function() {
				return {
					store: {
						type: storeType,
						resolve: () =>  store
					}
				}
			}
		}),

		mutation: new GraphQLObjectType({
			name: "Mutation",
			fields: function() {
				return {
					createLink: createLinkMutation
				}
			}
		})
	});

	return schema;
};

export default Schema;
