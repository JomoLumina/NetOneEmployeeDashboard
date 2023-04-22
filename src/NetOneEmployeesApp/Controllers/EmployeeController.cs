using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetOneEmployeesApp.Interfaces;
using NetOneEmployeesApp.Models;
using NetOneEmployeesApp.Models.Requests;

namespace NetOneEmployeesApp.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EmployeesController : ControllerBase
  {
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
      _employeeService = employeeService;
    }

    [HttpGet]
    [Route("{employeeId}")]
    public IActionResult GetEmployee(int employeeId)
    {

      try
      {
        var user = _employeeService.GetEmployee(employeeId);

        if (user != null)
        {
          return Ok(user);
        }
        else
        {
          return BadRequest("Employee not found");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetEmployees()
    {
      try
      {
        var employees = _employeeService.GetEmployees();

        if (employees != null)
        {
          return Ok(employees);
        }
        else
        {
          return BadRequest("No employees found");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddEmployee([FromBody] EmployeeRequest model)
    {

      try
      {

        var employee = await _employeeService.AddEmployeeAsync(model);

        if (employee > 0)
        {
          return Ok(new ContentResult { StatusCode = (int)HttpStatusCode.OK, ContentType = "application/json", Content = "Employee was added successfully" });
        }
        else
        {
          return BadRequest("Something went wrong, error adding a employee");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateEmployee([FromBody] Employee model)
    {

      try
      {
        var employee = await _employeeService.UpdateEmployeeAsync(model);

        if (employee > 0)
        {
          return Ok(new ContentResult { StatusCode = (int)HttpStatusCode.OK, ContentType = "application/json", Content = "Employee was updated successfully" });
        }
        else
        {
          return BadRequest("Something went wrong, error updating employee");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
