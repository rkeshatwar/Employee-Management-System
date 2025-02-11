using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text;

namespace LMS.Models
{
    public class Employee
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int EmployeeId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Designation { get; set; }

        [AllowNull]
        public int? ReportingManagerId { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }


        [AllowNull]
        [DataType(DataType.Date)]
        public DateTime? DOB { get; set; }

        [AllowNull]
        [MaxLength(10)]
        public string? ContactNumber { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string EmailId { get; set; }

        [AllowNull]
        public string Address { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfJoining { get; set; }

        [Required]
        public float TotalExperience { get; set; }

        [AllowNull]
        public string? BachelorDegree { get; set; }

        [AllowNull]
        public string? BachelorSpecialization { get; set; }

        [AllowNull]
        public string? MasterDegree { get; set; }

        [AllowNull]
        public string? MasterSpecialization { get; set; }

        [AllowNull]
        public string? Certification { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Password { get; set; }

        public string? Photo { get; set; }

        [AllowNull]
        public DateTime? LastLoggedIn { get; set; }

        [AllowNull]
        public string? CurrentIpAdderss { get; set; }

    }
}

        /*[Key]
        [MaxLength(5)]
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public int ReportingManagerId { get; set; }
        public string Gender { get; set; }
        public byte[] Photo { get; set; }
        public DateTime DOB { get; set; }
        public string ContactNumber { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int TotalExperience { get; set; }
        public string BachelorDegree { get; set; }
        public string BachelorSpecialization { get; set; }
        public string MasterDegree { get; set; }
        public string MasterSpecialization { get; set; }
        public string Certification { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }


        public void EncryptPassword()
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(Password));
                StringBuilder stringBuilder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    stringBuilder.Append(bytes[i].ToString("x2"));
                }
                Password = stringBuilder.ToString();
            }
        }
    }
}*/
