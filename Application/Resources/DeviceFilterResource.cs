namespace Application.Resources
{
    public class DeviceFilterResource
    {
        public string Name { get; set; }
        public string[] Type { get; set; }
        public double? MinPrice { get; set; }
        public double? MaxPrice { get; set; }
        public double[] Diagonal { get; set; }
        public int[] LocationIds { get; set; }
        public int[] DestinationIds { get; set; }
        public int[] InterestIds { get; set; }
        public string[] InterfacePorts { get; set; }
        public string[] ScreenResolution { get; set; }
        public bool? HasTouchScreen { get; set; }
        public bool? HasSpeakers { get; set; }
        public string[] Matrix { get; set; }
        public int[] Refreshing { get; set; }
        public string[] Contrast { get; set; }
        public string[] ExtensionsCards { get; set; }
    }
}