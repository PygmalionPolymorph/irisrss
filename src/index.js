import m from 'mithril';

import { signIn } from './backend';
import App from './layout/app';

signIn('admin', 'admin');

m.mount(document.querySelector('#app'), App);
