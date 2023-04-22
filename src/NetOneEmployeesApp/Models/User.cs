using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace NetOneEmployeesApp.Models
{
  public class User : BaseModel
  {
    [Column("Name")]
    [Required]
    public string Name { get; set; }

    [Column("Surname")]
    [Required]
    public string Surname { get; set; }

    [Column("EmailAddress")]
    [Required]
    public string EmailAddress { get; set; }

    [Column("PhoneNumber")]
    public string PhoneNumber { get; set; }

    [Column("Password")]
    [Required]
    public string Password { get; set; }

    [Column("Token")]
    public string Token { get; set; }

  }
}
