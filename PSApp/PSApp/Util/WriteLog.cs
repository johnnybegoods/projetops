using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace PSApp.Util
{
    public class WriteLog
    {
        public static int index = System.AppDomain.CurrentDomain.BaseDirectory.ToString().LastIndexOf("PSApp");
        public static string absolutePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString().Substring(0, index + 6);
        public static void Write(string content, string FileName)
        {
            //string path = System.AppDomain.CurrentDomain.BaseDirectory.ToString();
            string dir = WriteLog.absolutePath + @"\Log";
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            using (System.IO.StreamWriter file =
            new System.IO.StreamWriter(dir + "\\"+FileName, true))
            {
                file.WriteLine(DateTime.Now + " - "+content);
            }
            
            
        }

    }
}
