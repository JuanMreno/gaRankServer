using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


/// <summary>
/// Summary description for ConexionSQL
/// </summary>
public class ConexionSQL
{
    SqlConnection conexion;

	public ConexionSQL()
	{
        string ipSQL        = ClaseGlobalVars.ipSQL;
        string usuarioSQL   = ClaseGlobalVars.usuarioSQL;
        string passSQL      = ClaseGlobalVars.passSQL;
        string dbSQL        = ClaseGlobalVars.dbSQL;

        conexion = new SqlConnection("Data Source=" + ipSQL + 
                                     ";Initial Catalog=" + dbSQL + 
                                     ";User ID=" + usuarioSQL + 
                                     ";Password=" + passSQL + "");
    }

    public string openConexion()
    {
        try
        {
            if (conexion.State != ConnectionState.Open)
                conexion.Open();
            return "TRUE";
        }
        catch (SqlException ex)
        {
            return ex.ToString();
        }
    }

    public void closeConexion()
    {
        if (conexion.State == ConnectionState.Open)
            conexion.Close();
        SqlConnection.ClearPool(conexion);
    }

    public SqlConnection getConexion()
    {
        return this.conexion;
    }
}