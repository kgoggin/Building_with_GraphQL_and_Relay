import React, { Component } from 'react';
import Relay from 'react-relay';

class Main extends Component {
	render() {
		let content = this.props.store.links.slice(0, this.props.limit).map( link => {
			return (
				<li key={link._id}>
					<a href={link.url}>{link.title}</a>
				</li>
			)
		});

		return (
			<div>
				<h3>Links</h3>
				<ul>
					{content}
				</ul>
			</div>
		)
	}
}

Main.propTypes = {
	limit: React.PropTypes.number
}

Main.defaultProps = {
	limit: 5
}

export default Relay.createContainer(Main, {
	fragments: {
		store: () => Relay.QL`
			fragment on Store {
				links {
					_id,
					url,
					title
				}
			}
		`
	}
});
