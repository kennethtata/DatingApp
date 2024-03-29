import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';;
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = environment.apiUrl;
private currentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private presence: PresenceService) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((reponse: User) => {
         const user = reponse;
      if(user) {
        this.setCurrentUser(user);
        this.presence.createHubConnection(user);

      }
    })
  )
}


register(model: any) {
  return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
    map(user => {
      if (user) {
        this.setCurrentUser(user);
      }
    })
  )
}

setCurrentUser(user: User){
  user.roles = [];
  const roles = this.getDecodedToken(user.token).role;
  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
  this.presence.createHubConnection(user); //user are connected to signalr when they sign in
}


logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null)
  this.presence.stopHubConnection();
}

getDecodedToken(token){
  return JSON.parse(atob(token.split('.')[1]));
}

}
