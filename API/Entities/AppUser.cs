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

        public DateTime LastActived { get; set; } = DateTime.Now;

        public string  Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests  { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photo { get; set; }

        public int Getage()
        {
            return DateOfBirth.CalculateAge();
            
        }

    }
}