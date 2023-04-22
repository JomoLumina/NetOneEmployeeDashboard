using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetOneEmployeesApp.Models
{
  public class Employee : BaseModel
  {
    [Column("Name")]
    [Required]
    public string Name { get; set; }

    [Column("Surname")]
    [Required]
    public string Surname { get; set; }

    [Column("NrcNumber")]
    [Required]
    public string NrcNumber { get; set; }

    [Column("Gender")]
    public string Gender { get; set; }

    [Column("DateOfBirth")]
    [Required]
    public string DateOfBirth { get; set; }

    [Column("MaritalStatus")]
    public string MaritalStatus { get; set; }

    [Column("Active")]
    [Required]
    public int Active { get; set; }

    public ContactDetails ContactDetails { get; set; }

    public EmploymentDetails EmploymentDetails { get; set; }

    public EmergencyContactDetails EmergencyContactDetails { get; set; }
  }
}
