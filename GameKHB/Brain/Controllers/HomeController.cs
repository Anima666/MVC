using Nemiro.OAuth;
using Nemiro.OAuth.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Brain.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult VK()
        {
            return View("Contact");
        }

        public ActionResult Twitter()
        {
            return View("About");
        }

        public ActionResult Facebook()
        { 
            return View("Contact");
        }


        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Vk(string provider = "VK")
        {
            OAuthManager.RegisterClient(
            new VkontakteClient(
            "",
            "")
            );

            string returnUrl = Url.Action("ExternalLoginResult", "Home", null, null, Request.Url.Host);
            return Redirect(OAuthWeb.GetAuthorizationUrl(provider, returnUrl));
        }
        public void ExternalLoginResult()
        {
            AuthorizationResult result = OAuthWeb.VerifyAuthorization();
            UserInfo user = result.UserInfo;

        }
    }
}