import TmbRenderRequest from './actions/tmb-render-request/tmb-render-request';
import { expressApp } from './express/app';
import { TMB } from './tmb';

export function index(): void {
  TMB();
};

new TmbRenderRequest().startAutoRefresh();
new expressApp().server.listen(80);
index();
