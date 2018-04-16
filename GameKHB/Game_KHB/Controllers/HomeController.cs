using GameKHB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Game_KHB.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            
            ViewBag.List = ReturnList();
            GameObject game = new GameObject();
            ViewBag.HMAC = _HashEncoding._HMAC;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        private List<string> ReturnList()
        {
            return FileReader.Instance.Lines;
        }

        public ActionResult Accord(string Answer)
        {

            ViewBag.List = ReturnList();
            GameObject game = new GameObject();
            ViewBag.HMAC = _HashEncoding._HMAC;
            ViewBag.Result = game.GoStep(Answer);
            ViewBag.Result +="\n"+"Key:\n" + _HashEncoding.Key;
            return View("Index");
        }
    }
}