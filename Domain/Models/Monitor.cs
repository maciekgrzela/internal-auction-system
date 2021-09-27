using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Monitor : BaseDevice
    {
        [Required, MinLength(7), MaxLength(9)]
        public string ScreenResolution { get; set; }
        public double Diagonal { get; set; }
        public string Matrix { get; set; }
        [Range(30, 240)]
        public int? Refreshing { get; set; }
        public string Contrast { get; set; }
        public bool HasSpeakers { get; set; }
        public bool HasTouchScreen { get; set; }
    }
}