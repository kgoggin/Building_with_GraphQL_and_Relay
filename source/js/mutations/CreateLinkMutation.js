import Relay from 'react-relay';

class CreateLinkMutation extends Relay.Mutation {

	getMutation() {
		return RelayQL`mutation{createLink}`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on CreateLinkPayload {
				store,
				link
			}
		`
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				store: this.props.store
			}
		}];
	}

	getVariables() {
		return {
			title: this.props.title,
			url: this.props.url,
		}
	}

}

export default CreateLinkMutation;
