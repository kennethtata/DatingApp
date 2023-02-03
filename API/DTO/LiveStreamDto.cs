using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTO
{
    public class LiveStreamDto
    {
        public int Id { get; set; }

        [Required]
        public string ChatRoomName {get;set;}
        public int streamerId { get; set; }
        
        public string StreamerUserName { get; set; }

       public string StreamerPhotoUrl { get; set; }
  
        public int StreamViewerId { get; set; }

        public string StreamViewerUserName { get; set; }

        public string StreamViewerPhotoUrl { get; set; }

        public string Content { get; set; }

        public DateTime? StreamEnd { get; set; }

        public DateTime StreamStart{ get; set; } = DateTime.UtcNow;

         public bool StreamDeleted { get; set; }

         public DateTime? StreamDeleteDate { get; set; }

    }
}