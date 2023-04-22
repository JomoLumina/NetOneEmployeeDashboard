using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace NetOneEmployeesApp.Models
{
  public class EmergencyContactDetails : BaseModel
  {
    [Column("EmployeeId")]
    [ForeignKey("Employee")]
    [Required]
    public int EmployeeId { get; set; }

    [Column("Name")]
    [Required]
    public string Name { get; set; }

    [Column("PhoneNumber")]
    [Required]
    public string PhoneNumber { get; set; }

    [Column("PhysicaAddress")]
    public string PhysicalAddress { get; set; }
  }
}
