using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace NetOneEmployeesApp.Models
{
  public class ContactDetails : BaseModel
  {
    [Column("EmployeeId")]
    [ForeignKey("Employee")]
    [Required]
    public int EmployeeId { get; set; }

    [Column("PhoneNumber")]
    [Required]
    public string PhoneNumber { get; set; }

    [Column("PhoneNumberAlt")]
    public string PhoneNumberAlt { get; set; }

    [Column("EmailAddress")]
    public string EmailAddress { get; set; }

    [Column("PhysicalAddress")]
    [Required]
    public string PhysicalAddress { get; set; }
  }
}
