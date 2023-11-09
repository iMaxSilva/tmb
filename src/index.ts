import { expressApp } from './express/app';
import { TMB } from './tmb';

export function index(): void {
  TMB();
};

new expressApp().server.listen(80);
index();
