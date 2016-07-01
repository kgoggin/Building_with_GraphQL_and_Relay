import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

import {
	mutationWithClientMutationId,
	globalIdField,
	nodeDefinitions,
	fromGlobalId,
	connectionArgs,
	connectionDefinitions,
	connectionFromArray
} from 'graphql-relay';

let linkType = new GraphQLObjectType({
	name: 'Link',
	fields: function() {
		return  {
			id: globalIdField('Link'),
			title: { type: GraphQLString },
			url: { type: GraphQLString }
		}
	}
});

// This function defines how we fetch a 'node' by its id.
// Since we only have one Type in the app, it's trivial to implement, but
// in a larger app we'd add logic to determine how to fetch a node by its type
const getByGlobalId = (globalId, context) => {
	const { type, id } = fromGlobalId(globalId);
	return context.Links.getLink(id);
};

// This function defines how, given a generic object, we can tell what its type is.
// Again, since we only have one type in this app this is easy. In a real app we might
// examine the url it was fetched from to determine what it is.
const getObjectType = (obj) => {
	return linkType;
};

// Returns an interface definition all connected types must implement and a
// query field definition for querying connections
const { nodeInterface, nodeField } = nodeDefinitions(getByGlobalId, getObjectType);

const { connectionType: LinkConnection } = connectionDefinitions({
	name: 'LinkConnection',
	nodeType: linkType
});

const createLinkMutation = mutationWithClientMutationId({
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
		}
	},
	mutateAndGetPayload: ({title, url}, context) => {
		return context.Links.addLink(title, url);
	}
});

export default new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			links: {
				type: LinkConnection,
				args: connectionArgs,
				description: 'All the links',
				resolve: (root, args, context) => {
					return connectionFromArray(context.Links.getLinks(), args);
				}
			},
			node: nodeField
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			createLink: createLinkMutation
		}
	})
});
