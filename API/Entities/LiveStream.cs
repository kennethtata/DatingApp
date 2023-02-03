using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class LiveStream
    {
       
        public int Id { get; set; }

         //id of the live streamer
        public int StreamerId { get; set; }
        public string StreamerUserName { get; set; }

        //chat room name
        [Required]
        public string ChatRoomName {get;set;}

        //the user that start the stream 
        public AppUser Streamer { get; set; }

         public int StreamViewerId { get; set; }

        public string StreamViewerUserName { get; set; }


        //user viewing the stream 
        public AppUser OtherStreamer { get; set; }


        public string Content { get; set; }

        public DateTime? StreamEnd { get; set; }

        public DateTime StreamStart{ get; set; } = DateTime.UtcNow;

         public bool StreamDeleted { get; set; }

         public DateTime? StreamDeleteDate { get; set; }

    }
}
