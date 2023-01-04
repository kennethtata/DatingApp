using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub: Hub
    {
        private readonly PresenceTracker _tracker;

        public PresenceHub(PresenceTracker tracker)
        {
            _tracker = tracker;
        }

        //need to create this method for the streaming but use client.All in the onConnectedAsync method to get all online users in the stream
        public override async Task OnConnectedAsync()
        {
            var isOnline = await _tracker.UserConnected(Context.User.GetUserName(), Context.ConnectionId);
            if(isOnline)
            {
                await Clients.Others.SendAsync("UserIsOnLine", Context.User.GetUserName());
            }

            var currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers); //we can change Clients.Caller to Clients.All to get all connected users
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var isOffline = await _tracker.UserDisconnected(Context.User.GetUserName(), Context.ConnectionId);

            if(isOffline)
            {
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUserName());
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
