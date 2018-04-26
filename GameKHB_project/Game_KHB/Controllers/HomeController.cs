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
        private GameObject game = new GameObject();

        public ActionResult Index()
        {
            ViewBag.CountList = FileReader.Instance.Lines.Count;
            ViewBag.List = ReturnList();
            ViewBag.HMAC = _HashEncoding._HMAC;
            ViewBag.Key = _HashEncoding.Key;
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
            List<string> ShowList = new List<string>();
            foreach(var item in FileReader.Instance.Lines)
            {
                ShowList.Add(item);
            }
           
            return ShowList ;
        }




        public ActionResult Accord(string hero,string dzen)
        {
            ViewBag.CountList = FileReader.Instance.Lines.Count;
            
            

            try
            {
                if(dzen!=null)
                {
                    int index = Convert.ToInt32(dzen);
                    var step = FileReader.Instance.Lines[index];
                    ViewBag.List = ReturnList();
                    ViewBag.HMAC = _HashEncoding._HMAC;
                    ViewBag.Result = game.GoStep(step);
                    ViewBag.Key = "Key:" + _HashEncoding.Key;
                }
                if (hero != null)
                {
                    ViewBag.List = ReturnList();
                    ViewBag.HMAC = _HashEncoding._HMAC;
                    ViewBag.Result = game.GoStep(hero);
                    ViewBag.Key = "Key:" + _HashEncoding.Key;
                }
                else
                {
                    ViewBag.List = ReturnList();
                    ViewBag.HMAC = _HashEncoding._HMAC;
                    ViewBag.Key = "Key:" + _HashEncoding.Key;
                }
               
            }
            catch(Exception ex)
            {
                ViewBag.Result = ex.Message;
            }
            return View("Index");
        }
    }
}