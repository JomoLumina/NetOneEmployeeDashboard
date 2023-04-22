using NetOneEmployeesApp.Models;
using NetOneEmployeesApp.Models.Requests;
using System.Threading.Tasks;

namespace NetOneEmployeesApp.Interfaces
{
  public interface IUserService
  {
    User Authenticate(string emailAddress, string password);
    User GetUser(int userId);
    User RegisterUser(User user);
    Task<int> UpdateUserAsync(UserRequest user);
  }
}
