using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Web.Db;

namespace Web.Infrastructure
{
    /// <summary>
    /// A simple service where we can put any user BL we like 
    /// </summary>
    public class UsersFacade
    {
        readonly UserManager<AppUser> _userManager;
        readonly RoleManager<IdentityRole> _roleManager;
        public UsersFacade(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> EnsureRole(string userId, string role)
        {
            IdentityResult respVal = null;
            if (!await _roleManager.RoleExistsAsync(role))
            {
                respVal = await _roleManager.CreateAsync(new IdentityRole(role));
            }
            AppUser user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                throw new Exception("The testUserPw password was probably not strong enough!");
            }
            respVal = await _userManager.AddToRoleAsync(user, role);
            return respVal;
        }

        public async Task<string> EnsureUser(string testUserPw, string userName)
        {
            AppUser user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                user = new AppUser {
                    UserName = userName,
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(user, testUserPw);
            }
            if (user == null)
            {
                throw new Exception("The password is probably not strong enough!");
            }
            return user.Id;
        }
    }
}