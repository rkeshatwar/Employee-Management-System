namespace LMS.Models.Repository
{
    public class AnyOtherForiegnLanguageRepository
    {
        private readonly AppDbContext appDbContext;

        public AnyOtherForiegnLanguageRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
    }
}
