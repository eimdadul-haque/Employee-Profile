using Employe_Info_API.Data;
using Employe_Info_API.IRepository;
using Employe_Info_API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace Employe_Info_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IEmployeRepository _repo;
        private readonly IWebHostEnvironment _env;
        public EmployeController(IEmployeRepository repo, ApplicationDbContext db, IWebHostEnvironment env)
        {
            _repo = repo;
            _db = db;
            _env = env;
        }

        public async Task<IActionResult> GetAllEmployee()
        {
            return Ok(await _repo.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetONeEmploye([FromRoute] int id)
        {
            return Ok(await _repo.GetONe(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddEmploye([FromForm]EmployeModel employe)
        {
            if (ModelState.IsValid)
            {
                await _repo.Add(employe);
            }
            return Ok(await _repo.GetAll());
        }


        [HttpPut]
        public async Task<IActionResult> EditEmploye([FromBody] EmployeModel employe)
        {
            if (ModelState.IsValid)
            {
                await _repo.Edit(employe);
            }
            return Ok(await _repo.GetAll());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmploye([FromRoute] int id)
        {
            if (ModelState.IsValid)
            {
                await _repo.Delete(await _repo.GetONe(id));
            }
            return Ok(await _repo.GetAll());
        }

    }
}
