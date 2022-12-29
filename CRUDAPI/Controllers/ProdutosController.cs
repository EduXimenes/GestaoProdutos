using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly Context _context;

        public ProdutosController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> ListarProdutosAsync()
        {
            return await _context.produtos.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Produto>> RecuperarProdutoAsync(int Id)
        {
            Produto produto = await _context.produtos.FindAsync(Id);
            if (produto == null)
                return NotFound();

            return produto;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> AdicionarProdutoAsync(Produto produto)
        {
            await _context.produtos.AddAsync(produto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> AtualizarProdutoAsync(Produto produto)
        {
            _context.produtos.Update(produto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> ExcluirProdutoAsync(int Id)
        {
            Produto produto = await _context.produtos.FindAsync(Id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Remove(produto);
            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}