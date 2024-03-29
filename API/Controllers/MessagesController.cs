﻿using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
  
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MessagesController(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery]MessageParams messageParams)
        {
            messageParams.UserName = User.GetUserName();

            var messages = await _unitOfWork.MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

       

        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteMessage(int id)
        {
            var userName = User.GetUserName();

            var message = await _unitOfWork.MessageRepository.GetMessage(id);

            if(message.Sender.UserName != userName && message.Recipient.UserName != userName)
            {
                return Unauthorized();
            }

            if(message.Sender.UserName == userName)
            {
                message.SenderDeleted = true;
            }

            if(message.Recipient.UserName == userName)
            {
                message.RecipientDeleted = true;
            }

            if(await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Problem deleting the message, contact system admin");

        }
    }
}
