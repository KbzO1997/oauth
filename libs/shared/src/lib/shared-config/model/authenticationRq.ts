export class AuthenticationRq {
    username: string;
    password: string;
      
    constructor(username = '', password = '') {
      this.username = username;
      this.password = password;     
    }
}