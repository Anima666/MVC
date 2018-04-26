using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GameKHB
{
    class Program
    {
        static void Main(string[] args)
        {
            GameObject gameObject = new GameObject();
            string step;
            while (true)
            {
               step  = Console.ReadLine();
                
                Console.WriteLine(gameObject.GoStep(step));
            }
        }
    }
}
