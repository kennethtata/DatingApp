export interface liveStream{
  id: number;
  streamerId: number;
  streamerUserName : string;
  streamerPhotoUrl: string;
  streamViewerId: number;
  streamVierUserName: string;
  streamViewerUrl:string;
  streamEndTime?: Date;
  streamStartTime?: Date;

}
