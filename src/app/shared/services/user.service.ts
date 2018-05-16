import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../../app.tokens";
import {AUTHORIZATION_SERVER_URL} from "../../app.tokens";
import {AUTHORIZATION_SERVER_CLIENT_ID} from "../../app.tokens";
import {AUTHORIZATION_SERVER_CLIENT_SECRET} from "../../app.tokens";
import {Observable} from "rxjs/Observable";
import {map,mergeMap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

export class UserSignUp {
  firstName : string;
  lastName : string;
  password : string;
  uid : string;
}

export class UserLogin {
  uid : string;
  password : string;
}

export class User {
  firstName : string;
  lastName : string;
  customerId : string;
  uid : string;
}

class TokenResponse {
  access_token : string;
}


export abstract class UserService {

  abstract retrieveTokenForRegistration() : Observable<string>;
  abstract registerUser(user : UserSignUp) : Observable<User>;
  abstract loginUser(user : UserLogin) : Observable<string>;
  abstract logoutUser() : void;
  abstract getLoggedUserToken() : string;
  abstract tokenSubject : Subject<string>;
}

@Injectable()
export class HttpUserService implements UserService {

  token : string;
  tokenSubject : Subject<string> = new Subject<string>();

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    @Inject(AUTHORIZATION_SERVER_URL) private authorizationServerUrl: string,
    @Inject(AUTHORIZATION_SERVER_CLIENT_ID) private authorizationServerClientId: string,
    @Inject(AUTHORIZATION_SERVER_CLIENT_SECRET) private authorizationServerClientSecret: string,
    private http: HttpClient
  ) {}

  getLoggedUserToken() : string {
    return this.token;
  }

  getTokenRetrieveBaseUrl() : string {
    return `${this.authorizationServerUrl}/token?client_id=${this.authorizationServerClientId}`
    + `&client_secret=${this.authorizationServerClientSecret}`;
  }


  retrieveTokenForRegistration() : Observable<string> {
    console.log(`Retrieve new token for registration...`);
    let baseUrl : string = this.getTokenRetrieveBaseUrl();
    return this.http.post<TokenResponse>(`${baseUrl}&grant_type=client_credentials`, null)
      .pipe(map(tokenResponse => tokenResponse.access_token));
  }

  registerUser(user : UserSignUp) : Observable<User> {
    if (this.token != null) {
      console.log(`Use existing token ${this.token}`);
      return this.http.post<User>(`${this.baseUrl}/users?access_token=${this.token}`, user);
    } else {
      return this.retrieveTokenForRegistration().pipe(mergeMap(
        data => {
          console.log(`Got new token ${data}`);
          this.token = data;
          return this.http.post<User>(`${this.baseUrl}/users?access_token=${this.token}`, user);
        }
      ))
    }
  }

  loginUser(user : UserLogin) : Observable<string> {
    if (this.token != null) {
      this.token = null;
    }

    console.log(`Try to log user...`);
    let baseUrl : string = this.getTokenRetrieveBaseUrl();
    return this.http.post<TokenResponse>(`${baseUrl}&grant_type=password&username=${user.uid}&password=${user.password}`, null)
      .pipe(map(
      data => {
        console.log(`Got token for existing user`);
        this.token = data.access_token;
        this.tokenSubject.next(this.token);
        return this.token;
      }
    ));
  }

  logoutUser() : void {
    this.token = null;
    this.tokenSubject.next(null);
  }
}
