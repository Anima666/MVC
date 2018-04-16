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
            int n = (FileReader.Instance.Lines.Count - 1) / 2;

            List<int> ListWin = new List<int>();
            List<int> ListLose = new List<int>();
            //_HashEncoding.Coding(index.ToString());
            if (FileReader.Instance.Lines.Count < 3 || FileReader.Instance.Lines.Count % 2 == 0)
            {
                return "Error count players";
            }
            int step;
            try
            {
                step = Convert.ToInt32(_step);
            }
            catch (Exception ex)
            {
                return $"{ex.Message}";
            }

            if (step <= -1)
            {
                return "Step <= -1!";
            }
            else if (step > FileReader.Instance.Lines.Count)
            {
                return $"Step > {FileReader.Instance.Lines.Count}!";
            }
            else
            {
                if (step <= n)
                {
                    ListWin = WinList(ListWin, step);
                    if (ListWin.Contains(index)) return "You win";

                    else return "You lose";
                }
                else if (step > n)
                {
                    ListLose = LoseList(ListLose, step);


                    if (ListLose.Contains(index))
                    {
                        return "You lose";
                    }

                    else
                    {
                        return "You win";
                    }
                }
                else
                {
                    return "Что-то пошло не так";
                }


                #region 1
                //    bool flag = false;

                //    while (flag == false)
                //    {
                //        try
                //        {
                //            if ()
                //            {
                //                return "Ничья";
                //            }
                //            else if (ListWin.Contains(step))
                //            {

                //            }
                //            else
                //            {
                //                return "Победил комп";
                //            }
                //        }
                //        catch (Exception ex)
                //        {

                //            return $"{ex.Message}";
                //        }
                //    }
                //}
                //return string.Empty;
                #endregion
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
