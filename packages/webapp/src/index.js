import m from 'mithril';
import { state } from 'kaleido';
import App from './view';

import './view/style/main.less';

require('dotenv').config();

m.mount(document.querySelector('#app'), App);
state.map(m.redraw);
