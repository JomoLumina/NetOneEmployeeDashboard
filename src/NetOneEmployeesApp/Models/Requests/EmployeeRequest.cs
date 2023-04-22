

namespace NetOneEmployeesApp.Models.Requests
{
  public class EmployeeRequest : BaseModel
  {
    public string Name { get; set; }

    public string Surname { get; set; }

    public string NrcNumber { get; set; }

    public string Gender { get; set; }

    public string DateOfBirth { get; set; }
    
    public int Active{ get; set; }

    public string MaritalStatus { get; set; }

    public ContactDetails ContactDetails { get; set; }

    public EmploymentDetails EmploymentDetails { get; set; }

    public EmergencyContactDetails EmergencyContactDetails { get; set; }
  }
}
