using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Context : DbContext
    {
        public DbSet<Produto> produtos { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}