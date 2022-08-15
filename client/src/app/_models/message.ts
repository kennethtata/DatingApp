export interface Message{
  id: number;
  sennderId: number;
  senderUserName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientUserName: string;
  recipientPhotoUrl: string;
  content: string;
  dateRead?: Date;
  messageSent: Date;
}
