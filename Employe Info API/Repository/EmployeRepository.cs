using Employe_Info_API.Data;
using Employe_Info_API.IRepository;
using Employe_Info_API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employe_Info_API.Repository
{
    public class EmployeRepository : IEmployeRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _http;

        public EmployeRepository(ApplicationDbContext db, IWebHostEnvironment env, IHttpContextAccessor http)
        {
            _db = db;
            _env = env;
            _http = http;
        }

        public async Task<List<EmployeModel>> GetAll()
        {
            return (await _db.employe.Select(x => new EmployeModel()
            {
                Id = x.Id,
                Name = x.Name,
                Occupation = x.Occupation,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", 
                _http.HttpContext.Request.Scheme,
                _http.HttpContext.Request.Host,
                _http.HttpContext.Request.PathBase,
                x.ImageName)
            }).ToListAsync());
        }

        public async Task<EmployeModel> GetONe(int id)
        {
            return (await _db.employe.FindAsync(id));
        }

        public async Task Add(EmployeModel employe)
        {
            if (employe != null)
            {
                employe.ImageName = await ImageHandleAsync(employe);
                await _db.employe.AddAsync(employe);
                await _db.SaveChangesAsync();
            }
        }

        public async Task Edit(EmployeModel employe)
        {
            if (employe != null)
            {
                _db.employe.Update(employe);
                await _db.SaveChangesAsync();
            }
        }

        public async Task Delete(EmployeModel employe)
        {
            var res = await deleteImage(employe);
            if (employe != null)
            {
                _db.employe.Remove(employe);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<string> ImageHandleAsync(EmployeModel employeModel)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(employeModel.ImageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            string Extention = Path.GetExtension(employeModel.ImageFile.FileName);
            imageName = imageName + DateTime.Now.ToString("yy-MM-ss-ff") + Extention;
            string path = Path.Combine(_env.ContentRootPath, "Images", imageName);

            using (var fileStrem = new FileStream(path, FileMode.Create))
            {
                await employeModel.ImageFile.CopyToAsync(fileStrem);
            }
            return imageName;
        }

        public async Task<bool> deleteImage(EmployeModel employeModel)
        {
            if (employeModel.ImageName != null)
            {
                string imgName = employeModel.ImageName;
                string path = Path.Combine(_env.ContentRootPath, "Images", imgName);
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                return true;
            }
            return false;
        }
    }
}




