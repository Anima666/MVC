using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;

namespace Task_3_1.Controllers
{
    public class HomeController : Controller
    {
        static List<string> parametersBallsList = new List<string>();
        static List<string> parametersWallsList = new List<string>();

        [HttpPost]
        public JsonResult ClearWallList()
        {
            parametersWallsList.Clear();
            return Json("");
        }

        [HttpPost]
        public JsonResult ClearListParameters()
        {
            parametersBallsList.Clear();
            return Json("");
        }

        [HttpPost]
        public JsonResult BallData()
        {
            //parametersBallsList.Sort();
            return Json(parametersBallsList);
        }

        [HttpPost]
        public JsonResult WallData()
        {
            //parametersBallsList.Sort();
            return Json(parametersWallsList);
        }

        [HttpPost]
        public ActionResult AddIngrid(string parameters)
        {
            parametersBallsList.Add(parameters);
            return View();
        }
        [HttpPost]
        public ActionResult PostParametersWalls(string parameters)
        {
            parametersWallsList.Add(parameters);
            return View();
        }

        public ActionResult Index()
        {
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
    }
}