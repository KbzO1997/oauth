import { StatusCode } from "./enum";

export class RsTrxService  {
    //status?: number;
    status?: StatusCode;
    code: number;
    ide: number;
    message: string;
    token: string;
    jwt:string;
    datoAdicional: string;
    error: string;
    constructor() {
        this.code = 0;
        this.ide = 0;
        this.message = '';
        this.token = "";
        this.jwt = "";
        this.datoAdicional = "";
        this.error = "";
    }
}