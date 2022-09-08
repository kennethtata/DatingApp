using API.Entities;
using System.Threading.Tasks;

namespace API.interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}