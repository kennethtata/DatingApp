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


        public void CreateChatRoom(LiveStream chatRoom)
        {
           _context.LiveStreams.Add(chatRoom);
        }

        public void CreateGroup(Group group)
        {
           _context.Groups.Add(group);
        }

        public void DeleteGroup(Group group)
        {
            throw new NotImplementedException();
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<Group> GetStreamGroupForConnection(string connectionId)
        {
            return await _context.Groups
                .Include(c => c.Connections)
                .Where(c => c.Connections.Any(x => x.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        public async Task<Group> GetStreamGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }


        public async Task<LiveStream> GetChatRoom(string roomName)
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