import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail-stream',
  templateUrl: './member-detail-stream.component.html',
  styleUrls: ['./member-detail-stream.component.css']
})
export class MemberDetailStreamComponent implements OnInit {
@ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
 member: Member;
 messages: Message[] = [];
 activeTab: TabDirective;
 user: User;

 constructor(public presence: PresenceService, private route: ActivatedRoute,
  private messageService: MessageService, private accountService: AccountService,private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }


ngOnInit(): void {
  this.route.data.subscribe(data =>{
    this.member = data.member;
  });

  this.route.queryParams.subscribe(params => {
    params.tab ? this.selectTab(params.tab) : this.selectTab(0);
  })


}

    loadMessages(){
      this.messageService.getMessageThread(this.member.userName).subscribe(messages => {this.messages = messages;
      })
    }

    selectTab(tabId: number)
    {
      this.memberTabs.tabs[tabId].active = true;
    }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0)
      {
        this.messageService.createHubConnection(this.user, this.member.userName);
      }
      else
      {
        this.messageService.stopHubConnection();
      }
    }

    ngOnDestroy(): void
    {
      this.messageService.stopHubConnection();
    }


}
