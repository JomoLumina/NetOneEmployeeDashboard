using System;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetOneEmployeesApp.Interfaces;
using NetOneEmployeesApp.Models.Requests;

namespace NetOneEmployeesApp.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController : ControllerBase
  {
    private HtmlEncoder _htmlEncoder;
    private IUserService _userService;

    public AuthController(HtmlEncoder htmlEncoder, IUserService userService)
    {
      _userService = userService;
      _htmlEncoder = htmlEncoder;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody] LoginRequest model)
    {
      try
      {
        var email = _htmlEncoder.Encode(model.EmailAddress);
        var password = _htmlEncoder.Encode(model.Password);
        var user = _userService.Authenticate(email, password);

        return user != null ? (IActionResult)Ok(user) :
            BadRequest("Unable to Authenticate");
      }
      catch (Exception ex)
      {
        throw new Exception(ex.InnerException.Message ?? ex.Message);
      }
    }

  }
}
