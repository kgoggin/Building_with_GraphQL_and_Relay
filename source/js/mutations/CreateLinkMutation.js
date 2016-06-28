import Relay from 'react-relay';

class CreateLinkMutation extends Relay.Mutation {
	getMutation() {
		return RelayQL`
		mutation { createLink }
		`;
	}

	getVariables() {
		
	}

	getFatQuery() {
		
	}

	getConfig() {

	}
}
