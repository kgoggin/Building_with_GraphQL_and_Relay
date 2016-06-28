import React from 'react';
import Relay from 'react-relay';

class HomeRoute extends Relay.Route {
	static routeName = 'Home';
	static queries = {
		store: (Component) => Relay.QL`
			query MainQuery {
				store { ${Component.getFragment('store')} }
			}
		`
	}
}

export default HomeRoute;
