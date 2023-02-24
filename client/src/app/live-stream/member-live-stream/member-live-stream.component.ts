import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { PeerData, SignalInfo } from 'src/app/_models/peerData.interface';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { RtcServiceService } from 'src/app/_services/rtc.service.service';
import { SignalrLiveService } from 'src/app/_services/signalr-live.service';

@Component({
  selector: 'app-member-live-stream',
  templateUrl: './member-live-stream.component.html',
  styleUrls: ['./member-live-stream.component.css']
})
export class MemberLiveStreamComponent implements OnInit { members: Partial<Member[]>;

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  public subscriptions = new Subscription();

  private stream;

  public currentUser: string;

  public dataString: string;

  public userVideo: string;

  @Input() member: Member;

  pagination: Pagination;

  userParams: UserParams;

 user:User;
  //public messages: Array<ChatMessage>;

  public mediaError = (): void => { console.error(`Can't get user media`); };

  constructor(private memberService: MembersService, private breakpointObserver: BreakpointObserver, private accountService: AccountService, public platform: Platform,private rtcService: RtcServiceService, private signalR: SignalrLiveService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.userParams = this.memberService.getUserParams();

  }



  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }


  ngOnInit() {
    //this.messages = new Array();

    this.loadMembers();

    this.subscriptions.add(this.signalR.newPeer$.subscribe((user: Member) => {
      this.rtcService.newUser(user);
      this.signalR.sayHello(this.currentUser, user.knownAs);
    }));

    this.subscriptions.add(this.signalR.helloAnswer$.subscribe((user: Member) => {
      this.rtcService.newUser(user);
    }));

    this.subscriptions.add(this.signalR.disconnectedPeer$.subscribe((user: Member) => {
      this.rtcService.disconnectedUser(user);
    }));

    this.subscriptions.add(this.signalR.signal$.subscribe((signalData: SignalInfo) => {
      this.rtcService.signalPeer(signalData.user, signalData.signal, this.stream);
    }));

    this.subscriptions.add(this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
      this.signalR.sendSignalToUser(data.data, data.id);
    }));

    this.subscriptions.add(this.rtcService.onData$.subscribe((data: PeerData) => {
     // this.messages = [...this.messages, { own: false, message: data.data }];
      console.log(`Data from user ${data.id}: ${data.data}`);
    }));

    this.subscriptions.add(this.rtcService.onStream$.subscribe((data: PeerData) => {
      this.userVideo = data.id;
      this.videoPlayer.nativeElement.srcObject = data.data;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }));
  }


  public onUserSelected(userInfo: Member) {
    const peer = this.rtcService.createPeer(this.stream, userInfo.knownAs, true);
    this.rtcService.currentPeer = peer;
   
  }

  public async saveUsername(): Promise<void> {
    try {
      await this.signalR.startConnection(this.user);
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (error) {
      console.error(`Can't join room, error ${error}`);
    }
  }

  public sendMessage() {
    this.rtcService.sendMessage(this.dataString);
    //this.messages = [...this.messages, { own: true, message: this.dataString }];
    this.dataString = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
