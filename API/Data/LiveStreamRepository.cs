using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LiveStreamRepository : ILiveStreamRepository
    {
         private readonly DataContext _context;
           private readonly IMapper _mapper;
         public LiveStreamRepository(DataContext context,IMapper mapper)
         {
            _context = context;
            _mapper = mapper;
         }

        //once we start a chatroom we will create a group so other users can join 
        public void AddChatRoomGroup(Group group)
        {
           _context.Groups.Add(group);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        //used to remove user from chatroom group
        public async Task<Group> GetStreamGroupForConnection(string connectionId)
        {
            return await _context.Groups
                .Include(c => c.Connections)
                .Where(c => c.Connections.Any(x => x.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        //user can send message to group and also sue the message Hub to send message
        public async Task<Group> GetStreamGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }

        //us to join other user chatromm
       //user select chat room to enter and we will get the chatroom name from the selected user and enter that user chat room
        //this is similar to AddToGroup
        public async Task<LiveStream> JoinChatRoom(string roomName)
        {
            return await _context.LiveStreams
                .FirstOrDefaultAsync(x => x.ChatRoomName == roomName);
        }
        
        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }

      
    }
}