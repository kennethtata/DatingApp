using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class LiveStreamController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LiveStreamController(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ActionResult<LiveStream>> GetChatRoom(string chatroom)
        {
            if(_unitOfWork.LiveStreamRepository.GetChatRoom == null)
            {
               return NotFound();
            }

            return await _unitOfWork.LiveStreamRepository.GetChatRoom(chatroom);
        }
    }
}