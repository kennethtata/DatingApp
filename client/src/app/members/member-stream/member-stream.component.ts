import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
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

  ngOnInit(){}

}
