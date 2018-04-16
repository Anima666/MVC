
using System;
using System.Security.Cryptography;
using System.Text;

namespace GameKHB
{
    public static class _HashEncoding
    {
        public static string _HMAC;
        public static string Key;
        //public static void Coding(string message, int index)
        //{
             
        //    byte[] keyByte = Encoding.Default.GetBytes(index.ToString());
        //    HMACSHA1 alg = new HMACSHA1(keyByte);

        //    byte[] messageBytes = Encoding.ASCII.GetBytes(message);
        //    byte[] hashmessage = alg.ComputeHash(messageBytes);
        //    string hmac1 = ByteToString(hashmessage);
        //}

        //public static string ByteToString(byte[] buff)
        //{
        //    string sbinary = "";
        //    for (int i = 0; i < buff.Length; ++i)
        //    {
        //        sbinary += buff[i].ToString("X2");//hex format
        //    }
        //    _HMAC = sbinary;
        //    return sbinary;
        //}


        public static string[] Coding(string message)
        {
            string[] result = { "", "" };
            HMACSHA256 newHash = new HMACSHA256();
            byte[] secretKey = new byte[4];
            byte[] messageBytes = new ASCIIEncoding().GetBytes(message + "");
            byte[] hashmessage = new HMACSHA256(newHash.Key).ComputeHash(messageBytes);

            result[0] = String.Concat(Array.ConvertAll(hashmessage, x => x.ToString("x2")));
            result[1] = String.Concat(Array.ConvertAll(newHash.Key, x => x.ToString("x2")));

            _HMAC = result[0];
            Key = result[1];
            return result;
        }

        
    }
}

