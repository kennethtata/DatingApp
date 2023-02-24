import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../_models/user';
import { Instance } from 'simple-peer';
import { PeerData } from '../_models/peerData.interface';
import { HubConnection,HubConnectionBuilder} from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

declare var SimplePeer: any;

@Injectable({
  providedIn: 'root'
})
export class RtcServiceService {
  private users: BehaviorSubject<Array<User>>;
  public users$: Observable<Array<User>>;

  private onSignalToSend = new Subject<PeerData>();
  public onSignalToSend$ = this.onSignalToSend.asObservable();

  private onStream = new Subject<PeerData>();
  public onStream$ = this.onStream.asObservable();

  private onConnect = new Subject<PeerData>();
  public onConnect$ = this.onConnect.asObservable();

  private onData = new Subject<PeerData>();
  public onData$ = this.onData.asObservable();

  public currentPeer: Instance;

  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;

  private hubConnection: HubConnection;




  constructor(private user: User) {
    this.users = new BehaviorSubject([]);
    this.users$ = this.users.asObservable();
    //this.hubConnection = new HubConnectionBuilder()
    //.withUrl(this.hubUrl + 'livestream',{
     // accessTokenFactory: () => user.token
    //})
    //.withAutomaticReconnect()
    //.build()

  }

  public newUser(user: User): void {
    this.users.next([...this.users.getValue(), user]);
  }



  public createPeer(stream, userId: string, initiator: boolean): Instance {
    const peer = new SimplePeer({ initiator, stream });

    peer.on('signal', data => {
      const stringData = JSON.stringify(data);
      this.onSignalToSend.next({ id: userId, data: stringData });
    });

    peer.on('stream', data => {
      console.log('on stream', data);
      this.onStream.next({ id: userId, data });
    });

    peer.on('connect', () => {
      this.onConnect.next({ id: userId, data: null });
    });

    peer.on('data', data => {
      this.onData.next({ id: userId, data });
    });

    return peer;
  }

  public signalPeer(userId: string, signal: string, stream: any) {
    const signalObject = JSON.parse(signal);
    if (this.currentPeer) {
      this.currentPeer.signal(signalObject);
    } else {
      this.currentPeer = this.createPeer(stream, userId, false);
      this.currentPeer.signal(signalObject);
    }
  }

  public sendMessage(message: string) {
    this.currentPeer.send(message);
  }

  public disconnectedUser(user: User): void {
    const filteredUsers = this.users.getValue().filter(x => x.userName === user.userName);
    this.users.next(filteredUsers);
  }


  stopHubConnection()
  {
    if(this.hubConnection)
    {

      this.hubConnection.stop();
    }
  }

}

