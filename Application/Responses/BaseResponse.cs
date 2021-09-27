namespace Application.Responses
{
    public abstract class BaseResponse
    {
        public bool Success { get; protected set; }
        public string Message { get; protected set; }
        public BaseResponse(string message, bool success)
        {
            Message = message;
            Success = success;
        }
    }
}