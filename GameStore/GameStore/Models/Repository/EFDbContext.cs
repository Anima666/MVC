using System.Data.Entity;

namespace GameStore.Models.Repository
{
    public class EFDbContext
    {
        public DbSet<Game> Games { get; set; }
    }
}