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
        string tmp = "";
        [HttpPost]
        public JsonResult BallData()
        {
            DataBall dataBall = new DataBall();

            dataBall.radius = 30;
            dataBall.id = 0;
            dataBall.dx = 1;
            dataBall.dy = 2;
            dataBall.mass = dataBall.radius * 3;
            dataBall.x = 500;
            dataBall.y = 500;

            return Json(
                dataBall.radius + " " +
                dataBall.id + " " +
                dataBall.dx + " " +
                dataBall.dy + " " +
                dataBall.mass + " " +
                dataBall.x + " " +
                dataBall.y + " " + 
                tmp
                );
        }

        [HttpPost]
        public ActionResult AddIngrid(int id)
        {
            tmp += id;
            return PartialView();
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