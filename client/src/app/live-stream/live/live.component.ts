import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';

import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit { members: Partial<Member[]>;
container ='liveStream';
pageNumber =1;
pageSize = 5;
pagination: Pagination;
loading = false;
@Input() member: Member;

  constructor(private memberService: MembersService){}

  ngOnInit() :void{
   this.loadLiveStreamers();
  };

  loadLiveStreamers()
  {
    this.loading = true;
    this.memberService.getLikes(this.container,this.pageNumber, this.pageSize ).subscribe(response =>{
    this.members = response.result;
    this.pagination = response.pagination;
    this.loading = false;
    })
  }

  loadMember(){
    this.memberService.getMember(this.member.userName).subscribe(member => {
      this.member = member;
    })
  }

  pageChanged(event: any)
  {
    this.pageNumber = event.page;
    this.loadLiveStreamers()
  }
}
