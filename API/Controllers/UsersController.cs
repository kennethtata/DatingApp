﻿using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using DotNetOpenAuth.InfoCard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
   [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);

        }

   
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
           
        }

        [HttpPut]
        public async Task<ActionResult>UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var usernmae = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(await _userRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to Update user");
        }
    }
}
