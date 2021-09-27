namespace Application.Resources
{
    public class StorageResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LocationResource Location { get; set; }
    }
}