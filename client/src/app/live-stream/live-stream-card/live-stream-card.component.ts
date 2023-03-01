import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { UserInfo } from 'src/app/_models/peerData.interface';
import { User } from 'src/app/_models/user';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { RtcServiceService } from 'src/app/_services/rtc.service.service';

@Component({
  selector: 'app-live-stream-card',
  templateUrl: './live-stream-card.component.html',
  styleUrls: ['./live-stream-card.component.css']
})
export class LiveStreamCardComponent implements OnInit {

  @Input() member: Member;

  constructor(private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService,private rtcService: RtcServiceService) { }

  //@Output() userSelected: EventEmitter<UserInfo> = new EventEmitter();

 // public users$: Observable<Array<UserInfo>>;



  ngOnInit() {
   // this.users$ = this.rtcService.users$;


  }

  //public userClicked(user: UserInfo) {
   // this.userSelected.emit(user);
  //}

}
