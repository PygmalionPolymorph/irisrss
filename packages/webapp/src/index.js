import m from 'mithril';
import { state } from 'kaleido';
import App from './view';

import './view/style/main.less';

m.mount(document.querySelector('#app'), App);
state.map(m.redraw);
