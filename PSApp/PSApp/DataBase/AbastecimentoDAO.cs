﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using PSApp.Model;

namespace PSApp.DataBase
{
    public class AbastecimentoDAO
    {
        public static List<Abastecimento> Sync(List<Abastecimento> lista)
        {
            List<Abastecimento> abastecimentos = null;

            string sql = "EXEC SyncAbastecimentos @Datahora, @Desc, @Func, @Id, @IdBico, @IdCombustivel, "+ 
                "@IdFuncionario, @IdTipoPreco, @Litros, @NumeroBico, @Preco, "+
                "@PrevalecePrecoBico, @Selecionar, @Total";


            try
            {
                SqlConnection conn = DBAccess.GetConnection();



                try
                {
                    int count = 0;
                    foreach (Abastecimento a in lista)
                    {
                        if (count == 0)
                        {
                            conn.Open();
                        }
                        SqlCommand command = new SqlCommand(sql, conn);


                        command.Parameters.Add(new SqlParameter("@Datahora", a.DataHora));
                        command.Parameters.Add(new SqlParameter("@Desc", a.Descricao));
                        command.Parameters.Add(new SqlParameter("@Func", a.Funcionario));
                        command.Parameters.Add(new SqlParameter("@Id", a.Id));
                        command.Parameters.Add(new SqlParameter("@IdBico", a.IdBico));
                        command.Parameters.Add(new SqlParameter("@IdCombustivel", a.IdCombustivel));
                        command.Parameters.Add(new SqlParameter("@IdFuncionario", a.IdFuncionario));
                        command.Parameters.Add(new SqlParameter("@IdTipoPreco", a.IdTipoPreco));
                        command.Parameters.Add(new SqlParameter("@Litros", a.Litros));
                        command.Parameters.Add(new SqlParameter("@NumeroBico", a.NumeroBico));
                        command.Parameters.Add(new SqlParameter("@Preco", a.Preco));
                        command.Parameters.Add(new SqlParameter("@PrevalecePrecoBico", a.PrevalecePrecoBico));
                        command.Parameters.Add(new SqlParameter("@Selecionar", a.Selecionar));
                        command.Parameters.Add(new SqlParameter("@Total", a.Total));

                        command.ExecuteNonQuery();
                        count++;
                    }

                    string query = "SELECT * FROM abastecimento";
                    abastecimentos = GetData(query);

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

            return abastecimentos;
        }


        public static List<Abastecimento> GetData(string query)
        {
            SqlConnection conn = DBAccess.GetConnection();
            List<Abastecimento> lista = new List<Abastecimento>();

            if(conn.State == System.Data.ConnectionState.Closed)
            {
                conn.Open();
            }

            SqlCommand command = new SqlCommand(query, conn);
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Abastecimento a = new Abastecimento();
                a.Id = Convert.ToInt32(reader["Id"].ToString());
                a.DataHora = Convert.ToDateTime(reader["DataHora"].ToString());
                a.Descricao = reader["Descricao"].ToString();
                a.Funcionario = reader["Funcionario"].ToString();
                a.IdBico = Convert.ToInt32(reader["IdBico"].ToString());
                a.IdCombustivel = Convert.ToInt32(reader["IdCombustivel"].ToString());
                a.IdFuncionario = Convert.ToInt32(reader["IdFuncionario"].ToString());
                a.IdTipoPreco = Convert.ToInt32(reader["IdTipoPreco"].ToString());
                a.Litros = Convert.ToInt64(reader["Litros"].ToString());
                a.NumeroBico = Convert.ToInt32(reader["NumeroBico"].ToString());
                a.Preco = Convert.ToDouble(reader["Preco"].ToString());
                a.PrevalecePrecoBico = reader.GetBoolean(reader.GetOrdinal("PrevalecePrecoBico"));
                a.Selecionar = reader.GetBoolean(reader.GetOrdinal("Selecionar"));
                a.Total = Convert.ToInt32(reader["Total"].ToString());

                lista.Add(a);
            }
            conn.Close();
            return lista;
        }

        public static SqlException PersistAfericao(Abastecimento a)
        {
            SqlException ex = null;
            SqlConnection conn = DBAccess.GetConnection();

            try
            {
                string insert = "INSERT INTO afericao(id_abastecimento, processado) VALUES(@id_abast, @proc)";
                conn.Open();
                SqlCommand command = new SqlCommand(insert, conn);
                command.Parameters.Add(new SqlParameter("@id_abast", a.Id));
                command.Parameters.Add(new SqlParameter("@proc", false));
                command.ExecuteNonQuery();
            }catch(SqlException e)
            {
                Util.WriteLog.Write("" + e, Util.ENUM.LOG_FILENAME_DB);
                ex = e;
            }
            finally
            {
                conn.Close();
            }


            return ex;
        }

        public static SqlException UpdateAfericao(Abastecimento a)
        {
            SqlException ex = null;
            SqlConnection conn = DBAccess.GetConnection();

            try
            {
                string insert = "UPDATE afericao " +
                            "set processado =  @proc " +
                            "WHERE id_abastecimento = @id_abast";
                conn.Open();
                SqlCommand command = new SqlCommand(insert, conn);
                command.Parameters.Add(new SqlParameter("@id_abast", a.Id));
                command.Parameters.Add(new SqlParameter("@proc", true));
                command.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                Util.WriteLog.Write("" + e, Util.ENUM.LOG_FILENAME_DB);
                ex = e;
            }
            finally
            {
                conn.Close();
            }


            return ex;
        }
    }
}
