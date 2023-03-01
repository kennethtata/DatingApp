import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BusyService } from './busy.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { SignalInfo, UserInfo } from '../_models/peerData.interface';
import { Member } from '../_models/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrLiveService {



  private newPeer = new Subject<UserInfo>();
  public newPeer$ = this.newPeer.asObservable();

  private helloAnswer = new Subject<UserInfo>();
  public helloAnswer$ = this.helloAnswer.asObservable();

  private disconnectedPeer = new Subject<UserInfo>();
  public disconnectedPeer$ = this.disconnectedPeer.asObservable();

  private signal = new Subject<SignalInfo>();
  public signal$ = this.signal.asObservable();



  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  mainUser: User;

  constructor(private http: HttpClient,private busyService: BusyService, private accountService: AccountService,) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.mainUser = user);
  }

  public async startConnection(currentUser: string): Promise<void> {

    this.busyService.busy();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'livestream',{
      accessTokenFactory: () => this.mainUser.token
    })
    .withAutomaticReconnect()
    .build()

    await this.hubConnection.start()
    .catch(error => console.log(error))
    .finally(() => this.busyService.idle());

    console.log('Connection started');

    this.hubConnection.on('NewUserArrived', (data) => {
      this.newPeer.next(JSON.parse(data));
      console.log('looking for new users in the New User has Arrives method');
    });

    this.hubConnection.on('UserSaidHello', (data) => {
      this.helloAnswer.next(JSON.parse(data));
      console.log('Users saying hello to each other in the User say hello Method');
    });

    this.hubConnection.on('UserDisconnect', (data) => {
      this.disconnectedPeer.next(JSON.parse(data));
      console.log("User is disconnecting ");
    });

    this.hubConnection.on('SendSignal', (user, signal) => {
      this.signal.next({ user, signal });
      console.log("sending signal to other user in the send signal method");
    });

    this.hubConnection.invoke('NewUser', currentUser);
    console.log("invoking a new user in the invoke new user method");
  }

  public sendSignalToUser(signal: string, user: string) {
    this.hubConnection.invoke('SendSignal', signal, user);
    console.log("sending signal to users in the send signal method")
  }

  public sayHello(userName: string, user: string): void {
    this.hubConnection.invoke('HelloUser', userName, user);
    console.log("say hello in the say hello method")
  }

  stopHubConnection()
  {
    if(this.hubConnection)
    {
      this.hubConnection.stop();
    }
  }

}
