using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NetOneEmployeesApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        public AppController(){}

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("NetOne Employee Admin API running");
        }
    }
}
