import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member-detail-stream',
  templateUrl: './member-detail-stream.component.html',
  styleUrls: ['./member-detail-stream.component.css']
})
export class MemberDetailStreamComponent implements OnInit{


ngOnInit(): void {}


}
