import { Injectable } from '@angular/core';
import { HttpClient, HubConnection } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  constructor(private http: HttpClient,private busyService: BusyService) { }


}
