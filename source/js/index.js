import React, { Component } from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import Main from './components/Main';
import HomeRoute from './routes/HomeRoute';

render(
	 <Relay.RootContainer
			Component={Main}
			route={new HomeRoute()} />,
	document.getElementById('app')
);
