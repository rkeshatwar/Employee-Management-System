using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.Models
{
    public class OtherSkills
    {
        [Key]
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public int SkillRating { get; set; }

        [ForeignKey("EmployeeId")]
        public int EmployeeId { get; set; }
    }
}
