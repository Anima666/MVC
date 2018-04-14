using System;

namespace GameKHB
{
    public class GameObject
    { 
        Random rnd = new Random();
        public static int index { get; set; }
        public GameObject()
        {
            index = rnd.Next(1,FileReader.Instance.Lines.Count);// step bot
            _HashEncoding.Coding(index.ToString());
        }

        public string GoStep(string _step)
        {
            _HashEncoding.Coding(index.ToString());
            if (FileReader.Instance.Lines.Count < 3 || FileReader.Instance.Lines.Count % 2 == 0)
            {
                return "Error count players";
            }
            int step;
            try
            {
                step = Convert.ToInt32(_step);
            }
            catch(Exception ex)
            {
                return $"{ex.Message}";
            }

            if (step <= 0)
            {
                return "Step <= 0!";
            }
            else if (step > FileReader.Instance.Lines.Count)
            {
                return $"Step > {FileReader.Instance.Lines.Count}!";
            }
            else
            {
                bool flag = false;
                
                while (flag == false)
                {
                    try
                    {
                        if (step - index == 0)
                        {
                            return "Ничья";
                        }
                        else if (step - index < 0)
                        {

                            return "Победил я";
                        }
                        else
                        {
                            return "Победил комп";
                        }
                    }
                    catch (Exception ex)
                    {
                        
                        return $"{ex.Message}";
                    }
                }
            }
            return string.Empty;
        }

    }
}
