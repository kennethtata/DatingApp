using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LiveStreamRepository : ILiveStreamRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LiveStreamRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<Group> GetGroupForConnection(string connectionId)
        {
            return await _context.Groups
               .Include(c => c.Connections)
               .Where(c => c.Connections.Any(x => x.ConnectionId == connectionId))
               .FirstOrDefaultAsync();
        }

        public async Task<Group> GetMessageGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName)
        {
            //get the conversation of users
            var messages = await _context.Messages
                .Where(m => m.Recipient.UserName == currentUserName && m.RecipientDeleted == false
                && m.Sender.UserName == recipientUserName
                || m.Recipient.UserName == recipientUserName
                && m.Sender.UserName == currentUserName && m.SenderDeleted == false
                )
                .OrderBy(m => m.MessageSent)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return messages;
        }

        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }
    }
}
