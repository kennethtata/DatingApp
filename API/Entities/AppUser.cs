using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;


namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
     

        public DateOnly DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime ProfileCreated { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string  Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests  { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection <UserLike> LikedByUsers { get; set; } //list of user that like the current logged in user

        public ICollection<UserLike> LikedUsers { get; set; } //list of users the currently logged in user has liked

        public ICollection<Message> MessagesSent { get; set; }

        public ICollection<Message> MessagesReceived { get; set; }

        //a collection of different type of chat room the use can join
        public ICollection<LiveStream> LiveStreamsStarted { get; set; }
        
        //a collection of chat room a user can join
        public ICollection<LiveStream> LiveStreamsJoined{ get; set; }


        public ICollection<AppUserRole> UserRoles { get; set; }


    }
}