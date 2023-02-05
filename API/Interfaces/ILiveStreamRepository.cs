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
        void AddChatRoomGroup(Group group);

        Task<LiveStream> JoinChatRoom(string roomName);


        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetStreamGroup(string groupName);

        Task<Group> GetStreamGroupForConnection(string connectionId);
       
        
        
    }
}