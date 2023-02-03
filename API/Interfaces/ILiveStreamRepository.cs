using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILiveStreamRepository
    {
        void CreateChatRoom(LiveStream chatRoom);

        Task<LiveStream> GetChatRoom(string roomName);

        void CreateGroup(Group group);

        void DeleteGroup(Group group);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetStreamGroup(string groupName);

        Task<Group> GetStreamGroupForConnection(string connectionId);
       
        
        
    }
}