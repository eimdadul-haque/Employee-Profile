using Employe_Info_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employe_Info_API.IRepository
{
    public interface IEmployeRepository
    {
        Task<List<EmployeModel>> GetAll();
        Task<EmployeModel> GetONe(int id);
        Task Add(EmployeModel employe);
        Task Edit(EmployeModel employe);
        Task Delete(EmployeModel employe);
    }
}
