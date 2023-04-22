using NetOneEmployeesApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetOneEmployeesApp.Models;
using System.Data;
using Microsoft.Extensions.Logging;
using NetOneEmployeesApp.Helpers;
using NetOneEmployeesApp.Models.Requests;

namespace NetOneEmployeesApp.Services
{
  public class EmployeeService : IEmployeeService
  {
    private readonly MainDbContext _database;
    private readonly ILogger<EmployeeService> _logger;

    public EmployeeService(MainDbContext database, ILogger<EmployeeService> logger)
    {
      _logger = logger;
      _database = database;
    }

    public async Task<int> AddEmployeeAsync(EmployeeRequest employee)
    {
      try
      {
        int response = 0;

        employee.ContactDetails.Created = DateTime.Now;
        employee.ContactDetails.Modified = DateTime.Now;
        employee.EmploymentDetails.Created = DateTime.Now;
        employee.EmploymentDetails.Modified = DateTime.Now;
        employee.EmergencyContactDetails.Created = DateTime.Now;
        employee.EmergencyContactDetails.Modified = DateTime.Now;

        Employee emp = new Employee()
        {
          Name = employee.Name,
          Surname = employee.Surname,
          NrcNumber = employee.NrcNumber,
          DateOfBirth = employee.DateOfBirth,
          Gender = employee.Gender,
          MaritalStatus = employee.MaritalStatus,
          Active = 1,
          Created = DateTime.Now,
          Modified = DateTime.Now,
          ContactDetails = employee.ContactDetails,
          EmploymentDetails = employee.EmploymentDetails,
          EmergencyContactDetails = employee.EmergencyContactDetails
        };
        await _database.Employees.AddAsync(emp);
        response = await _database.SaveChangesAsync();
        return response;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        throw ex;
      }
    }

    public Employee GetEmployee(int employeeId)
    {
      Employee employee = _database.Employees.Where(emp => emp.Id == employeeId).FirstOrDefault();
      employee.ContactDetails = _database.ContactDetails.Where(cd => cd.EmployeeId == employeeId).FirstOrDefault();
      employee.EmploymentDetails = _database.EmploymentDetails.Where(ed => ed.EmployeeId == employeeId).FirstOrDefault();
      employee.EmergencyContactDetails = _database.EmergencyContactDetails.Where(ecd => ecd.EmployeeId == employeeId).FirstOrDefault();
      return employee;
    }
    
    public List<Employee> GetEmployees()
    {
      return _database.Employees.ToList();
    }

    public async Task<int> UpdateEmployeeAsync(Employee employee)
    {
      try
      {
        int response = 0;
        int employeeId = employee.Id;
        Employee _employee = _database.Employees.Where(e => e.Id == employeeId).FirstOrDefault();
        _employee.ContactDetails = _database.ContactDetails.Where(cd => cd.EmployeeId == employeeId).FirstOrDefault();
        _employee.EmploymentDetails = _database.EmploymentDetails.Where(ed => ed.EmployeeId == employeeId).FirstOrDefault();
        _employee.EmergencyContactDetails = _database.EmergencyContactDetails.Where(ecd => ecd.EmployeeId == employeeId).FirstOrDefault();
        if (_employee != null)
        {
          //Update employee changed values
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "Name");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "Surname");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "NrcNumber");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "DateOfBirth");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "Gender");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "MaritalStatus");
          ExtentionMethods.UpdateEmployeePropertyChange(_employee, employee, "Active");

          //Update employee contact details changed values
          ExtentionMethods.UpdateContactDetailsPropertyChange(_employee.ContactDetails, employee.ContactDetails, "PhoneNumber");
          ExtentionMethods.UpdateContactDetailsPropertyChange(_employee.ContactDetails, employee.ContactDetails, "PhoneNumberAlt");
          ExtentionMethods.UpdateContactDetailsPropertyChange(_employee.ContactDetails, employee.ContactDetails, "EmailAddress");
          ExtentionMethods.UpdateContactDetailsPropertyChange(_employee.ContactDetails, employee.ContactDetails, "PhysicalAddress");

          //Update employee employment details changed values
          ExtentionMethods.UpdateEmploymentDetailsPropertyChange(_employee.EmploymentDetails, employee.EmploymentDetails, "Title");
          ExtentionMethods.UpdateEmploymentDetailsPropertyChange(_employee.EmploymentDetails, employee.EmploymentDetails, "EmpId");
          ExtentionMethods.UpdateEmploymentDetailsPropertyChange(_employee.EmploymentDetails, employee.EmploymentDetails, "Department");
          ExtentionMethods.UpdateEmploymentDetailsPropertyChange(_employee.EmploymentDetails, employee.EmploymentDetails, "Supervisor");

          //Update employee emergency contact details changed values
          ExtentionMethods.UpdateEmergencyContactDetailsPropertyChange(_employee.EmergencyContactDetails, employee.EmergencyContactDetails, "Name");
          ExtentionMethods.UpdateEmergencyContactDetailsPropertyChange(_employee.EmergencyContactDetails, employee.EmergencyContactDetails, "PhoneNumber");
          ExtentionMethods.UpdateEmergencyContactDetailsPropertyChange(_employee.EmergencyContactDetails, employee.EmergencyContactDetails, "PhysicalAddress");

          _employee.Modified = DateTime.Now;
          _database.Entry(_employee).Property(emp => emp.Modified).IsModified = true;
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
  }
}
