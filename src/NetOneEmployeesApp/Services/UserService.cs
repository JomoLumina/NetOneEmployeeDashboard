using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NetOneEmployeesApp.Interfaces;
using NetOneEmployeesApp.Models;
using Microsoft.Extensions.Logging;
using NetOneEmployeesApp.Helpers;
using System.Threading.Tasks;
using NetOneEmployeesApp.Models.Requests;

namespace NetOneEmployeesApp.Services
{
  public class UserService : IUserService
  {
    private readonly IConfiguration _configuration;
    private readonly MainDbContext _database;
    private readonly ILogger<UserService> _logger;

    public UserService(IConfiguration configuration, MainDbContext database, ILogger<UserService> logger)
    {
      _logger = logger;
      _configuration = configuration;
      _database = database;
    }
    public User Authenticate(string emailAddress, string password)
    {
      try
      {
        User user = GetAuthenticateUser(emailAddress, password);

        // return null if user not found
        if (user == null)
          return null;

        // authentication successful so generate jwt token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Secret"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
          Expires = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("ExpiresInDays")),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        user.Token = tokenHandler.WriteToken(token);
        user.Modified = DateTime.Now;

        //update access token so that it lasts
        _database.Users.Attach(user);
        _database.Entry(user).Property(u => u.Token).IsModified = true;
        _database.Entry(user).Property(u => u.Modified).IsModified = true;
        _database.SaveChanges();

        return user.WithoutPassword();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        throw ex;
      }
    }
    private User GetAuthenticateUser(string emailAddress, string password)
    {
      var hashedPassword = HashHex(password);
      var user = _database.Users.Where(u => u.EmailAddress == emailAddress && u.Password == hashedPassword).FirstOrDefault();
      return user;
    }
    public User GetUser(int userId)
    {
      var user = _database.Users.Where(u => u.Id == userId).FirstOrDefault();
      return user.WithoutPassword();
    }
    public async Task<int> UpdateUserAsync(UserRequest user)
    {
      try
      {
        int response = 0;
        User inputUser = new User
        {
          Id = user.Id,
          Name = user.Name,
          Surname = user.Surname,
          PhoneNumber = user.PhoneNumber,
        };
        User _user= _database.Users.Where(u => u.Id == user.Id).FirstOrDefault();
        if (_user != null)
        {
          UpdatePropertyChange(_user, inputUser, "Name");
          UpdatePropertyChange(_user, inputUser, "Surname");
          UpdatePropertyChange(_user, inputUser, "PhoneNumber");

          _user.Modified = DateTime.Now;
          _database.Entry(_user).Property(u => u.Modified).IsModified = true;
          response = await _database.SaveChangesAsync();
        }
        return response;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        throw ex;
      }
    }

    private void UpdatePropertyChange(User oldUser, User newUser, string property)
    {
      //update only changed properties
      if (!ExtentionMethods.ComparePropertyValues(oldUser, newUser, property))
      {
        var typeName = oldUser.GetType().GetProperty(property).PropertyType.Name;
        if (typeName == typeof(bool).Name)
        {
          oldUser.GetType().GetProperty(property).SetValue(oldUser,
            ExtentionMethods.GetPropertyValue<bool>(newUser, property), null);
        }
        else if (typeName == typeof(int).Name)
        {
          oldUser.GetType().GetProperty(property).SetValue(oldUser,
            ExtentionMethods.GetPropertyValue<int>(newUser, property), null);
        }
        else
        {
          oldUser.GetType().GetProperty(property).SetValue(oldUser,
            ExtentionMethods.GetPropertyValue<string>(newUser, property), null);
        }
      }
    }
    public User RegisterUser(User user)
    {
      try
      {
        var hashedPassword = HashHex(user.Password);

        user.Created = DateTime.Now;
        user.Modified = DateTime.Now;
        user.Password = hashedPassword;

        _database.Users.Add(user);
        var results = _database.SaveChanges();
        
        return user.WithoutPassword();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        if (ex.Message.Contains("Violation of UNIQUE KEY constraint"))
        {
          throw new Exception("Email Adress already exists");
        }
        else
        {
          throw ex;
        }
      }
    }

    private string HashHex(string password)
    {
      var sb = new StringBuilder();

      using (var hash = SHA256.Create())
      {
        var enc = Encoding.UTF8;
        var result = hash.ComputeHash(enc.GetBytes(password));

        foreach (var b in result)
          sb.Append(b.ToString("x2"));
      }

      return sb.ToString();
    }
  }
}
