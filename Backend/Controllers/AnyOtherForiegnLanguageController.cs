using LMS.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnyOtherForiegnLanguageController : Controller
    {
        private readonly AnyOtherForiegnLanguageRepository anyOtherForiegnLanguageRepository;

        public AnyOtherForiegnLanguageController(AnyOtherForiegnLanguageRepository anyOtherForiegnLanguageRepository)
        {
            this.anyOtherForiegnLanguageRepository = anyOtherForiegnLanguageRepository;
        }

        
    }
}
