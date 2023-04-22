using System.Threading.Tasks;
using System.Collections.Generic;
using NetOneEmployeesApp.Models;
using NetOneEmployeesApp.Models.Requests;

namespace NetOneEmployeesApp.Interfaces
{
    public interface IEmployeeService
    {
        Task<int> AddEmployeeAsync(EmployeeRequest employee);
        List<Employee> GetEmployees();
        Employee GetEmployee(int employeeId);
        Task<int> UpdateEmployeeAsync(Employee employee);
    }
}
