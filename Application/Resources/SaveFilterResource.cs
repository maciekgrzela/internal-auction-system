using System.ComponentModel.DataAnnotations;

namespace Application.Resources
{
    public class SaveFilterResource
    {
        [Required, MaxLength(20)]
        public string Name { get; set; }
        public string Value { get; set; }
    }
}