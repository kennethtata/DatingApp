﻿using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
    
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;

        public MessageHub(IMapper mapper,
            IUnitOfWork unitOfWork, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _presenceHub = presenceHub;
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext(); 
            var otherUser = httpContext.Request.Query["user"].ToString(); // for later....we could add an array and add users so we could have more than two use plus check is that user is liked by you and if so let them in
            var groupName = GetGroupName(Context.User.GetUserName(), otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var group = await AddToGroup(groupName);//this is howwe add users to groups
            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            var messages = await _unitOfWork.MessageRepository.GetMessageThread(Context.User.GetUserName(), otherUser);

            if(_unitOfWork.HasChanges())
            {
                await _unitOfWork.Complete();
            }

            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = await RemoveFromMessageGroup();
            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            var userName = Context.User.GetUserName();

            if (userName == createMessageDto.RecipientUserName.ToLower())
            {
               throw new HubException("You cannot send message to yourself");
            }

            var sender = await _unitOfWork.UserRepository.GetUserByUserNameAsync(userName);
            var recipient = await _unitOfWork.UserRepository.GetUserByUserNameAsync(createMessageDto.RecipientUserName);

            if (recipient == null)
            {
                throw new HubException("User Not Found");
            }

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUserName = sender.UserName,
                RecipientUserName = recipient.UserName,
                Content = createMessageDto.Content
            };

            var groupName = GetGroupName(sender.UserName, recipient.UserName);

            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);

            if(group.Connections.Any(x => x.UserName == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                //sends notification to user that they have a message..they could be in a diffenrent hub
                var connections = await _tracker.GetConnectionsForUser(recipient.UserName);
                if(connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                        new { userName = sender.UserName, knownAs = sender.KnownAs });
                }
            }

            _unitOfWork.MessageRepository.AddMessage(message);

            if (await _unitOfWork.Complete())
            {
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
            }

        }

        private async Task<Group>AddToGroup(string groupName)
        {
            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.GetUserName());

            if(group == null)
            {
                group = new Group(groupName);
                _unitOfWork.MessageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to join Group");
        }

        private async Task<Group> RemoveFromMessageGroup()
        {
            //can use this to get the groups that are connected   var group = await _unitOfWork.MessageRepository.GetGroupForConnection(Context.ConnectionId);
            //and then add to that group by using group.connections.add(connectionId)
            var group = await _unitOfWork.MessageRepository.GetGroupForConnection(Context.ConnectionId);
            var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            _unitOfWork.MessageRepository.RemoveConnection(connection);

            if(await _unitOfWork.Complete())
            {
                return group;
            }

            throw new HubException("Failed to remove from Group");
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}
