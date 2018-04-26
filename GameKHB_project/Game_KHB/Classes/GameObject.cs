using System;
using System.Collections.Generic;
using System.Linq;

namespace GameKHB
{
    public class GameObject
    {
        Random rnd = new Random();
        public static int index { get; set; }
        public GameObject()
        {
            index = rnd.Next(1, FileReader.Instance.Lines.Count);// step bot
            _HashEncoding.Coding(FileReader.Instance.Lines[index]);
        }

        public string GoStep(string _step)
        {
            int step = FileReader.Instance.Lines.FindIndex(u=>u==_step);
            int n = (FileReader.Instance.Lines.Count - 1) / 2;
            
            List<int> ListWin = new List<int>();
            List<int> ListLose = new List<int>();
            //_HashEncoding.Coding(index.ToString());
            if (FileReader.Instance.Lines.Count < 3 || FileReader.Instance.Lines.Count % 2 == 0)
            {
                return "Error count players";
            }
            //try
            //{
            //    step = Convert.ToInt32(_step);
            //}
            //catch (Exception ex)
            //{
            //    return $"{ex.Message}";
            //}

            if (step <= -1)
            {
                return "You choice <= -1!";
            }
            else if (step > FileReader.Instance.Lines.Count)
            {
                return $"You choice > {FileReader.Instance.Lines.Count}!";
            }
            else
            {
                if (step <= n)
                {
                    ListWin = WinList(ListWin, step);
                    if (ListWin.Contains(index)) return "You win, choice of a bot -> " + FileReader.Instance.Lines[index] + " ";

                    else return "You lose, choice of a bot -> " + FileReader.Instance.Lines[index] + " ";
                }
                else
                {
                    ListLose = LoseList(ListLose, step);
                    if (ListLose.Contains(index))
                    {
                        return "You lose, choice of a bot -> " + FileReader.Instance.Lines[index]+ " ";
                    }

                    else
                    {
                        return "You win, choice of a bot -> " + FileReader.Instance.Lines[index] + " ";
                    }
                }
               
            }
        }

        private List<int> WinList(List<int> ListWin, int step)
        {
            int n = (FileReader.Instance.Lines.Count - 1) / 2;


            for (int i = step; i <= step + n; ++i)
                ListWin.Add(i);

            return ListWin;
        }


        private List<int> LoseList(List<int> ListLose, int step)
        {
            int n = (FileReader.Instance.Lines.Count - 1) / 2;

            for (int i = step-n; i <= step; ++i)
            {
                ListLose.Add(i);
            }
            return ListLose;
        }
    }
}
