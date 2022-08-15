using API.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("User")]
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash {get;set;}

        public byte[] PasswordSalt {get;set;}

        public DateTime DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime ProfileCreated { get; set; } = DateTime.Now;

        public DateTime LastActive { get; set; } = DateTime.Now;

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


    }
}