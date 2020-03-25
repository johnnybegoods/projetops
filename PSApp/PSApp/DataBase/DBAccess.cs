using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using PSApp.Util;
using System.IO;

namespace PSApp.DataBase
{
    public class DBAccess
    {
        public static SqlConnection GetConnection()
        {
            string connectionString = @"Server =.\sqlexpress; Database = psapp; Trusted_Connection = True;";
           
            SqlConnection conn = new SqlConnection(connectionString);
            return conn;
        }
    }
}
