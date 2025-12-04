import * as _ from 'lodash-es';
import insertCss from 'insert-css';
import { setupWebChat } from '../services/webchat';

// 挂载一些全局变量
if (window) {
  (window as any).lodash = _;
  (window as any).insertCss = insertCss;
}

setupWebChat().catch((e) => {
  console.error('webchat setup failed', e);
});
