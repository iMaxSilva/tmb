import express from "express";
import { router } from "./router";

export class expressApp{
  public server: express.Application;

  constructor(){
    this.server = express();  
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
  }  

  private router(){
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(router);
  }
}