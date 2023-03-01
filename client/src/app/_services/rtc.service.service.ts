import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Instance } from 'simple-peer';
import { PeerData, UserInfo } from '../_models/peerData.interface';
import { environment } from 'src/environments/environment';


declare var SimplePeer: any;

@Injectable({
  providedIn: 'root'
})
export class RtcServiceService {

  private users: BehaviorSubject<Array<UserInfo>>;
  public users$: Observable<Array<UserInfo>>;

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

  constructor() {
    this.users = new BehaviorSubject([]);
    this.users$ = this.users.asObservable();

  }

  public newUser(user: UserInfo): void {
    this.users.next([...this.users.getValue(), user]);
    console.log("in the RTC on new User  method" + "the user is " + user + "and the user.Getvalue is " + this.users.getValue())
  }


  public createPeer(stream, userId: string, initiator: boolean): Instance {
    const peer = new SimplePeer({ initiator, stream });
    console.log("in the RTC on create Peer and calling Simple Peer  method");

    peer.on('signal', data => {
      const stringData = JSON.stringify(data);
      this.onSignalToSend.next({ id: userId, data: stringData });
      console.log("in the RTC on cstreamnnect  method");
    });

    peer.on('stream', data => {
      console.log('on stream', data);
      this.onStream.next({ id: userId, data });
    });

    peer.on('connect', () => {
      this.onConnect.next({ id: userId, data: null });
      console.log("in the RTC on connect  method");
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
      console.log("in the RTC singnalPeer method");
    } else {
      this.currentPeer = this.createPeer(stream, userId, false);
      this.currentPeer.signal(signalObject);
    }
  }

  public sendMessage(message: string) {
    this.currentPeer.send(message);
    console.log("in the RTC send message method");
  }

  public disconnectedUser(user: UserInfo): void {
    const filteredUsers = this.users.getValue().filter(x => x.connectionId === user.connectionId);
    this.users.next(filteredUsers);
  }




}

