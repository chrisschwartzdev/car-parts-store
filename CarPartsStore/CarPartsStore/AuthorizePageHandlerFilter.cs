using System.Net;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace CarPartsStore
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AuthorizeFilterAttribute : ActionFilterAttribute
    {
        public AuthorizationType AuthorizationType { get; set; }
        public AuthLevel RequiredAuthLevel { get; set; }
        
        public AuthorizeFilterAttribute(AuthorizationType authorizationType = AuthorizationType.None, AuthLevel requiredAuthLevel = 0)
        {
            AuthorizationType = authorizationType;
            RequiredAuthLevel = requiredAuthLevel;
        }
        
        public override async void OnActionExecuting(ActionExecutingContext context)
        {
            var httpContext = context.HttpContext;
            var requiredAuthLevel = RequiredAuthLevel;
            
            switch (AuthorizationType)
            {
                case AuthorizationType.None:
                    break;
                case AuthorizationType.UserAuthLevel:
                    var userAuthLevel = httpContext.Session.GetInt32(SessionKeys.UserAuthLevelKey);
                    if (userAuthLevel == null || userAuthLevel.Value < (int)requiredAuthLevel)
                    {
                        if (!httpContext.Response.HasStarted)
                            context.Result = new UnauthorizedResult();
                    }
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }

    public enum AuthLevel
    {
        Undefined = 0,
        User = 1,
        Admin = 2
    }

    public static class SessionKeys
    {
        public const string UserAuthLevelKey = "USER_AUTHLEVEL";
    }

    public enum AuthorizationType
    {
        None,
        UserAuthLevel = 1
    }
}
