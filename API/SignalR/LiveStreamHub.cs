using System.Text.Json;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class LiveStreamHub : Hub
    {
         private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;

       // public LiveStreamHub(IMapper mapper,IUnitOfWork unitOfWork,IHubContext<PresenceHub> presenceHub,PresenceTracker tracker)
      //  {
       ///     _mapper = mapper;
          //  _unitOfWork = unitOfWork;
          //  _presenceHub = presenceHub;
        //   _tracker = tracker;
     //   }

        //    public override async Task OnConnectedAsync()
        //    {
        //     var httpContext = Context.GetHttpContext(); 
        //     var groupName = GetGroupName(Context.User.GetUserName(), "LiveStream");
        //      await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        //      var group = await AddToChatRoomGroup(groupName);
        //      await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

        //       if(_unitOfWork.HasChanges())
        //        {
        //            await _unitOfWork.Complete();
        //        }

        //       await Clients.All.SendAsync("HelloUser");
        //    }

           public async Task NewUser(string username)
        {
            var userInfo = new UserInfo() { userName = username, connectionId = Context.ConnectionId };
            await Clients.Others.SendAsync("NewUserArrived", JsonSerializer.Serialize(userInfo));
        }

        public async Task HelloUser(string userName, string user)
        {
            var userInfo = new UserInfo() { userName = userName, connectionId = Context.ConnectionId };
            await Clients.Client(user).SendAsync("UserSaidHello", JsonSerializer.Serialize(userInfo));
        }

        public async Task SendSignal(string signal, string user)
        {
            await Clients.Client(user).SendAsync("SendSignal", Context.ConnectionId, signal);
        }


         public override async Task OnDisconnectedAsync(Exception exception)
        {
           // var group = await RemoveFromLiveStreamGroup();
            await Clients.All.SendAsync("UserDisconnect", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
            
        }

        // private async Task<Group>AddToChatRoomGroup(string groupName)
        // {
        //     var group = await _unitOfWork.LiveStreamRepository.GetStreamGroup(groupName);
        //     var connection = new Connection(Context.ConnectionId, Context.User.GetUserName());

        //     if(group == null)
        //     {
        //         group = new Group(groupName);
        //         _unitOfWork.LiveStreamRepository.AddChatRoomGroup(group);
        //     }

        //     group.Connections.Add(connection);

        //     if (await _unitOfWork.Complete()) return group;

        //     throw new HubException("Failed to join Group");
        // }

        // private async Task<Group> RemoveFromLiveStreamGroup()
        // {
            
        //     var group = await _unitOfWork.LiveStreamRepository.GetStreamGroupForConnection(Context.ConnectionId);
        //     var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
        //     _unitOfWork.LiveStreamRepository.RemoveConnection(connection);

        //     if(await _unitOfWork.Complete())
        //     {
        //         return group;
        //     }

        //     throw new HubException("Failed to remove from Group");
        // }


        // private string GetGroupName(string caller, string livestream)
        // {
        //     var stringCompare = string.CompareOrdinal(caller, livestream) < 0;
        //     return stringCompare ? $"{caller}-{livestream}" : $"{livestream}-{caller}";
        // }

       
    

    }
}