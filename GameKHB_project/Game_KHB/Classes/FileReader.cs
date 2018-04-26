using System.Collections.Generic;
using System.IO;
using System.Text;

namespace GameKHB
{
    public class FileReader
    {
        public List<string> Lines = new List<string>();
        const string @path = @"d:\GitRep\MVC\GameKHB\Game_KHB\file.txt";

        #region Singletone
        private static FileReader instance;
        public static FileReader Instance => instance ?? (instance = new FileReader());
        #endregion

        private FileReader()
        {
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    Lines.Add(line);
                }
               
            }
        }
    }
}
