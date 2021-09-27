namespace Application.Responses
{
    public class Response<T> : BaseResponse
    {
        public T Type { get; private set; }

        private Response(bool success, string message, T type) : base(message, success)
        {
            Type = type;
        }
        public Response(T type) : this(true, string.Empty, type) { }
        public Response(string message) : this(false, message, default(T)) { }
    }
}