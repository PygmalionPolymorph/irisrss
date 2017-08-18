import m from 'mithril';
import R from 'ramda';
import { state } from 'kaleido';

import './view/style/main.less';

import App from './view/layout/app';

m.mount(document.querySelector('#app'), App);

window.state = state;
window.R = R;
window.redraw = m.redraw;
state.map(m.redraw);
