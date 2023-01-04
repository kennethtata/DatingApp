using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface ILiveStreamRepository
    {
        void AddGroup(Group group);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetMessageGroup(string groupName);

        Task<Group> GetGroupForConnection(string connectionId);

        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);
    }
}
