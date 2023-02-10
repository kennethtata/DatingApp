import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-vs-live-stream',
  templateUrl: './member-vs-live-stream.component.html',
  styleUrls: ['./member-vs-live-stream.component.css']
})
export class MemberVSLiveStreamComponent implements OnInit {members: Partial<Member[]>;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  public subscriptions = new Subscription();

  private stream;

  public currentUser: string;

  public dataString: string;

  public userVideo: string;

  @Input() member: Member;

  pagination: Pagination;

  userParams: UserParams;

  public mediaError = (): void => { console.error(`Can't get user media`); };

  constructor(private memberService: MembersService, private breakpointObserver: BreakpointObserver, public platform: Platform) {
    this.userParams = this.memberService.getUserParams();

  }
  ngOnInit(): void {
    this.loadMembers();
  }


  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }
}
