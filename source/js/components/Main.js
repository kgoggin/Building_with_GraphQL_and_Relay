import React, { Component } from 'react';
import Relay from 'react-relay';

import CreateLinkMutation from '../mutations/CreateLinkMutation';
import Link from './Link';

class Main extends Component {
	handleSubmit = (event) => {
		event.preventDefault();
		Relay.Store.update(
			new CreateLinkMutation({
				title: this.refs.newTitle.value,
				url: this.refs.newUrl.value,
				store: this.props.store
			})
		);
		this.refs.newTitle.value = "";
		this.refs.newUrl.value = "";
	}

	render() {
		let content = this.props.store.links.map( link => {
			return (
				<Link key={link._id} link={link} />
			)
		});

		return (
			<div>
				<h3>Links</h3>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Title" ref="newTitle" />
					<input type="text" placeholder="URL" ref="newUrl" />
					<button type="submit">Add Link</button>
				</form>
				<ul>
					{content}
				</ul>
			</div>
		)
	}
}

export default Relay.createContainer(Main, {
	fragments: {
		store: () => Relay.QL`
			fragment on Store {
				links {
					id,
					${Link.getFragment('link')}
				}
			}
		`
	}
});
