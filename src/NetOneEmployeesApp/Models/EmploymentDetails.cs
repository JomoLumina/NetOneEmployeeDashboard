using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace NetOneEmployeesApp.Models
{
  public class EmploymentDetails : BaseModel
  {
    [Column("EmployeeId")]
    [ForeignKey("Employee")]
    [Required]
    public int EmployeeId { get; set; }

    [Column("Title")]
    [Required]
    public string Title { get; set; }

    [Column("EmpId")]
    [Required]
    public string EmpId { get; set; }

    [Column("Department")]
    public string Department { get; set; }

    [Column("Supervisor")]
    public string Supervisor { get; set; }
  }
}
