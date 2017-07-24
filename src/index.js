import m from 'mithril';
import { state } from 'kaleido';

import { signIn } from './api/hoodie';

import App from './view/layout/app';

// Debug
window.m = m;

signIn('admin', 'admin');

m.mount(document.querySelector('#app'), App);

window.state = state;
state.map(m.redraw);
