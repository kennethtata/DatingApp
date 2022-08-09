﻿namespace API.Helpers
{
    public class UserParams
    {
        public const int MaxPagesize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10; 

        public int PageSize
        {
            get => _pageSize; 
            set => _pageSize = (value > MaxPagesize) ? MaxPagesize : value;
        }

        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 200;
        public string OrderBy { get; set; } = "lastActive";
    }
}
