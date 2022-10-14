import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-stream',
  templateUrl: './member-stream.component.html',
  styleUrls: ['./member-stream.component.css']
})
export class MemberStreamComponent implements OnInit {
  @Input() member: Member;
  user: User;
  constructor(private accountService: AccountService,private memberService: MembersService, private toastr: ToastrService, public presence: PresenceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  liveStream(){
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }

}
