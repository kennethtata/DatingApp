import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { RtcService } from 'src/app/_services/rtc.service';

@Component({
  selector: 'app-member-stream',
  templateUrl: './member-stream.component.html',
  styleUrls: ['./member-stream.component.css']
})
export class MemberStreamComponent implements OnInit {
  @Input() member: Member;
  @Output() userSelected: EventEmitter<User> = new EventEmitter();
  user: User;

  public users$: Observable<Array<User>>;

  constructor(private rtcService: RtcService,private accountService: AccountService,private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.users$ = this.rtcService.users$;
  }



  public userClicked(user: User) {
    this.userSelected.emit(user);
  }


}
