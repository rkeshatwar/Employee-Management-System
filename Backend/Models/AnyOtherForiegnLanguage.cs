using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.Models
{
    public class AnyOtherForiegnLanguage
    {
        [Key]
        public int LanguageId { get; set; }
        public string Language { get; set; }
        public int LanguageRating { get; set; }

        [ForeignKey("EmployeeId")]
        public int EmployeeId { get; set; }

    }
}
