using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using PSApp.Model;
using PSApp.DataBase;

namespace PSApp.DataBase
{
    public class BicoDAO
    {
        public static List<Bico> Sync(List<Bico> lista)
        {
            List<Bico> bicos = null;

            string sql = "EXEC SyncBicos @id,  @desc, @num";
        

            try
            {
                SqlConnection conn = DBAccess.GetConnection();
                

                
                try
                {
                    int count = 0;
                    foreach (Bico b in lista)
                    {
                        if (count == 0)
                        {
                            conn.Open();
                        }
                        SqlCommand command = new SqlCommand(sql, conn);
                        

                        command.Parameters.Add(new SqlParameter("@desc", b.DescricaoCombustivel));
                        command.Parameters.Add(new SqlParameter("@id", b.Id));
                        command.Parameters.Add(new SqlParameter("@num", b.Numero));
                        command.ExecuteNonQuery();
                        count++;
                    }

                    string query = "SELECT * FROM bico";
                    bicos = GetData(conn, query);

                }
                catch (NullReferenceException e)
                {
                    Util.WriteLog.Write("" + e, Util.ENUM.LOG_FILENAME_SYSTEM);
                }
                finally
                {
                    conn.Close();
                }
            }
            catch (SqlException e)
            {
                Util.WriteLog.Write("" + e, Util.ENUM.LOG_FILENAME_DB);
            }

            return bicos;
        }

        public static List<Bico> GetData(SqlConnection conn, string query)
        {
            List<Bico> lista = new List<Bico>();

            if (conn.State == System.Data.ConnectionState.Closed)
            {
                conn.Open();
            }

            SqlCommand command = new SqlCommand(query, conn);
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Bico b = new Bico();
                b.Id = Convert.ToInt32(reader["id"].ToString());
                b.DescricaoCombustivel = reader["DescricaoCombustivel"].ToString();
                b.Numero = Convert.ToInt32(reader["Numero"].ToString());
                

                lista.Add(b);
            }
            conn.Close();
            return lista;
        }
    }
}
