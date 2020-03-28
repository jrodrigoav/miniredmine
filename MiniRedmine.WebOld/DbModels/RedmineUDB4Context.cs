using Microsoft.EntityFrameworkCore;

namespace MiniRedmine.Web.DbModels
{
    public class RedmineUDB4Context : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<UserTemplate> UserTemplates { get; set; }
        public RedmineUDB4Context(DbContextOptions<RedmineUDB4Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTemplate>().HasKey(ut => new { ut.Id, ut.UserId });
        }
    }
}