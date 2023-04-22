using Microsoft.EntityFrameworkCore;
using NetOneEmployeesApp.Models;

namespace NetOneEmployeesApp
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ContactDetails> ContactDetails { get; set; }
        public DbSet<EmploymentDetails> EmploymentDetails { get; set; }
        public DbSet<EmergencyContactDetails> EmergencyContactDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                  .HasIndex(u => u.EmailAddress)
                  .IsUnique();
        }
    }
}