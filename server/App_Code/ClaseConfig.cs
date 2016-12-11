using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de ClaseConfig
/// </summary>
public class ClaseConfig
{
	public ClaseConfig()
	{
	}

    public void setConfig()
    {
        try
        {
            string path = HttpContext.Current.Server.MapPath("Configuracion.txt");
            using (StreamReader sr = new StreamReader(path))
            {
                String line = sr.ReadToEnd();
                string[] split = line.Split(new Char[] { '>' });

                string[] dirVirtualSplit    = split[2].Split(new Char[] { '=' });
                string[] ipSQLSplit         = split[3].Split(new Char[] { '=' });
                string[] usuarioSQLSplit    = split[4].Split(new Char[] { '=' });
                string[] passSQLSplit       = split[5].Split(new Char[] { '=' });
                string[] dbSQLSplit         = split[6].Split(new Char[] { '=' });

                string dirVirtual = dirVirtualSplit[1].Trim();
                string ipSQL = ipSQLSplit[1].Trim();
                string usuarioSQL = usuarioSQLSplit[1].Trim();
                string passSQL = passSQLSplit[1].Trim();
                string dbSQL = dbSQLSplit[1].Trim();

                ClaseGlobalVars.urlServidor = dirVirtual;
                ClaseGlobalVars.ipSQL = ipSQL;
                ClaseGlobalVars.usuarioSQL = usuarioSQL;
                ClaseGlobalVars.passSQL = passSQL;
                ClaseGlobalVars.dbSQL = dbSQL;
            }
        }
        catch (Exception e)
        {
            
        }
    }
}