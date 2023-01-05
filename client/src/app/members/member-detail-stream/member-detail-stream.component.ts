import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { PeerData, SignalInfo } from 'src/app/_models/peerData.interface';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { LivestreamService } from 'src/app/_services/livestream.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { RtcService } from 'src/app/_services/rtc.service';

@Component({
  selector: 'app-member-detail-stream',
  templateUrl: './member-detail-stream.component.html',
  styleUrls: ['./member-detail-stream.component.css']
})
export class MemberDetailStreamComponent implements OnInit,OnDestroy {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  public subscriptions = new Subscription();

  private stream;

  public currentUser: string;

  public dataString: string;

  public userVideo: string;

  user: User;
  //public messages: Array<ChatMessage>;

  public mediaError = (): void => { console.error(`Can't get user media`); };

 constructor(private rtcService: RtcService, private signalR: LivestreamService, private accountService: AccountService,private router: Router) {
  this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
 }


ngOnInit(): void {

  //this.messages = new Array();

  this.subscriptions.add(this.signalR.newPeer$.subscribe((user: User) => {
    this.rtcService.newUser(user);
    this.signalR.sayHello2(this.currentUser);
  }));

  this.subscriptions.add(this.signalR.helloAnswer$.subscribe((user: User) => {
    this.rtcService.newUser(user);
  }));

  this.subscriptions.add(this.signalR.disconnectedPeer$.subscribe((user: User) => {
    this.rtcService.disconnectedUser(user);
  }));

  this.subscriptions.add(this.signalR.signal$.subscribe((signalData: SignalInfo) => {
    this.rtcService.signalPeer(signalData.user, signalData.signal, this.stream);
  }));

  this.subscriptions.add(this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
    this.signalR.sendSignalToUser(data.data, data.id);
  }));


  this.subscriptions.add(this.rtcService.onStream$.subscribe((data: PeerData) => {
    this.userVideo = data.id;
    this.videoPlayer.nativeElement.srcObject = data.data;
    this.videoPlayer.nativeElement.load();
    this.videoPlayer.nativeElement.play();
  }));

}

public onUserSelected(user: User) {
  const peer = this.rtcService.createPeer(this.stream, user.userName, true);
  this.rtcService.currentPeer = peer;
}

public async saveUsername(): Promise<void> {
  try {
    await this.signalR.createHubConnection(this.user ,this.currentUser );
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch (error) {
    console.error(`Can't join room, error ${error}`);
  }
}

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

}
