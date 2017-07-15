using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de ClaseAccionesClaves
/// </summary>
public class Ranking
{
    public Ranking()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }

    public JObject put_ranking(JObject param)
    {
        JObject result = new JObject();
        ConexionSQL conexion = new ConexionSQL();
        String schoolId;

        if ((conexion.openConexion()) == "TRUE")
        {
            SqlDataAdapter adapter = new SqlDataAdapter();
            try
            {
                adapter = new SqlDataAdapter(
                    String.Format(@"
                            DECLARE @schoolId INT= {0}
                            DECLARE @schoolName varchar(100) = '{1}'
                            DECLARE @schoolCity varchar(100) = '{2}'
                            DECLARE @schoolCountry varchar(100) = '{3}'

                            IF(
	                            NOT EXISTS (
		                            SELECT
			                            s.*
		                            FROM
			                            schools s
		                            WHERE
			                            s.id = @schoolId OR
                                        (
		                                    s.city = @schoolCity AND
		                                    s.country = @schoolCountry
                                        )
	                            )
                            )
                            BEGIN
	                            INSERT INTO
		                            schools
	                            (
		                            name,
		                            city,
		                            country
	                            )
	                            VALUES
	                            (
		                            @schoolName,
		                            @schoolCity,
		                            @schoolCountry
	                            )
	                            SET @schoolId = SCOPE_IDENTITY()
                            END
                            ELSE
                            BEGIN
	                            UPDATE
		                            schools
	                            SET
		                            name = @schoolName,
		                            city = @schoolCity,
		                            country = @schoolCountry
	                            WHERE
		                            id = @schoolId
                            END

                            SELECT
	                            @schoolName = [name],
	                            @schoolCity = [city],
	                            @schoolCountry = [country]
                            FROM
	                            schools
                            WHERE
	                            id = @schoolId

                            SELECT
	                            @schoolId
                        ",
                        param["schoolId"].ToString(),
                        param["schoolName"].ToString(),
                        param["schoolCity"].ToString(),
                        param["schoolCountry"].ToString()
                    ),
                    conexion.getConexion()
                );

                object obj = adapter.SelectCommand.ExecuteScalar();

                if(obj == null)
                {
                    result["ESTADO"] = "FALSE";
                    result["MENSAJE"] = "Consulta Incorrecta. Query: " + adapter.SelectCommand.CommandText;
                    return result;
                }

                schoolId = obj.ToString();

                JArray students = (JArray)param["students"];
                for(int i=0; i<students.Count; i++)
                {
                    String labsDelvry = "NULL";
                    String stScore = "NULL";

                    JObject student = (JObject)students[i];

                    if(!student["labsDelivery"].ToString().Equals(""))
                        labsDelvry = student["labsDelivery"].ToString();

                    if(!student["score"].ToString().Equals(""))
                        stScore = student["score"].ToString();

                    adapter = new SqlDataAdapter(
                        String.Format(@"
                            DECLARE @schoolId INT                   = {0}
                            DECLARE @studentId INT					= {1}
                            DECLARE @studentName varchar(100) 		= '{2}'
                            DECLARE @studentLastName varchar(100)   = '{3}'
                            DECLARE @labsDelivery varchar(100) 		= {4}
                            DECLARE @score float 					= {5}
                            DECLARE @classGroup varchar(100) 		= '{6}'

                            IF(
	                            NOT EXISTS (
		                            SELECT
			                            r.*
		                            FROM
			                            ranking r
		                            WHERE
			                            r.school_id = @schoolId AND
			                            r.student_id = @studentId
	                            )
                            )
                            BEGIN
	                            INSERT INTO
		                            ranking
	                            (
		                            school_id,
		                            student_id,
		                            student_name,
		                            student_last_name,
		                            labs_delivery,
		                            score,
		                            class_group
	                            )
	                            VALUES
	                            (
		                            @schoolId,
		                            @studentId,
		                            @studentName,
		                            @studentLastName,
		                            @labsDelivery,
		                            @score,
		                            @classGroup
	                            )
                            END
                            ELSE
                            BEGIN
	                            UPDATE
		                            ranking
		                        SET 
                                    student_name = @studentName,
		                            student_last_name = @studentLastName,
		                            labs_delivery = @labsDelivery,
		                            score = @score,
		                            class_group = @classGroup
	                            WHERE
		                            school_id = @schoolId AND
		                            student_id = @studentId
                            END
                            ",
                            schoolId,
                            student["id"].ToString(),
                            student["name"].ToString(),
                            student["last_name"].ToString(),
                            labsDelvry,
                            stScore,
                            student["class_group"].ToString()
                        ),
                        conexion.getConexion()
                    );
                    adapter.SelectCommand.ExecuteNonQuery();
                }

                JObject jObjSId = new JObject();
                jObjSId["schoolId"] = schoolId;

                result["ESTADO"] = "TRUE";
                result["MENSAJE"] = "Consulta correcta";
                result["RESULTADO"] = new JObject(jObjSId);
                result["N"] = students.Count.ToString();
            }
            catch (System.Data.SqlClient.SqlException e)
            {
                result["ESTADO"] = "FALSE";
                result["MENSAJE"] = "Consulta Incorrecta. Query: " + e.ToString();
                result["QUERY"] = "Query: " + adapter.SelectCommand.CommandText;
                return result;
            }
            conexion.closeConexion();
        }
        else
        {
            result["ESTADO"] = "FALSE";
            result["MENSAJE"] = "Consulta Incorrecta. Conexion: " + conexion.openConexion();
            return result;
        }
        return result;
    }

    public JObject getFilters(JObject param)
    {
        JObject result = new JObject();
        ConexionSQL conexion = new ConexionSQL();
        String schoolId;

        if ((conexion.openConexion()) == "TRUE")
        {
            SqlDataAdapter adapter = new SqlDataAdapter();
            try
            {
                adapter = new SqlDataAdapter(
                    String.Format(@"
                        SELECT	
	                        name as name
                        FROM
	                        schools
                        ORDER BY
                            name ASC

                        SELECT	
	                        ci.name as name
                        FROM
	                        schools s
                        INNER JOIN cities ci ON s.city = ci.id
                        GROUP BY
	                        ci.name
                        ORDER BY
                            ci.name ASC

                        SELECT	
	                        co.name as name
                        FROM
	                        schools s
                        INNER JOIN countries co ON s.country = co.id
                        GROUP BY
	                        co.name
                        ORDER BY
                            co.name ASC
                        "
                    ),
                    conexion.getConexion()
                );

                DataSet dataSet = new DataSet();
                adapter.Fill(dataSet);


                JObject jObjs = new JObject();

                JArray jSchoolsObjs = new JArray();
                DataTable dt = dataSet.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        JObject jObj = new JObject();
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            String columnName = dt.Columns[i].ColumnName;
                            jObj[columnName] = dt.Rows[j][i].ToString();
                        }
                        jSchoolsObjs.Add(new JObject(jObj));
                    }
                }
                jObjs["schools"] = new JArray(jSchoolsObjs);

                JArray jCitiesObjs = new JArray();
                dt = dataSet.Tables[1];
                if (dt.Rows.Count > 0)
                {
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        JObject jObj = new JObject();
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            String columnName = dt.Columns[i].ColumnName;
                            jObj[columnName] = dt.Rows[j][i].ToString();
                        }
                        jCitiesObjs.Add(new JObject(jObj));
                    }
                }
                jObjs["cities"] = new JArray(jCitiesObjs);

                JArray jCountriesObjs = new JArray();
                dt = dataSet.Tables[2];
                if (dt.Rows.Count > 0)
                {
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        JObject jObj = new JObject();
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            String columnName = dt.Columns[i].ColumnName;
                            jObj[columnName] = dt.Rows[j][i].ToString();
                        }
                        jCountriesObjs.Add(new JObject(jObj));
                    }
                }
                jObjs["countries"] = new JArray(jCountriesObjs);


                result["ESTADO"] = "TRUE";
                result["MENSAJE"] = "Consulta correcta";
                result["RESULTADO"] = jObjs;
            }
            catch (System.Data.SqlClient.SqlException e)
            {
                result["ESTADO"] = "FALSE";
                result["MENSAJE"] = "Consulta Incorrecta. Query: " + e.ToString();
                result["QUERY"] = "Query: " + adapter.SelectCommand.CommandText;
                return result;
            }
            conexion.closeConexion();
        }
        else
        {
            result["ESTADO"] = "FALSE";
            result["MENSAJE"] = "Consulta Incorrecta. Conexion: " + conexion.openConexion();
            return result;
        }
        return result;
    }

    public JObject getRankingTable(JObject param)
    {
        JObject result = new JObject();
        ConexionSQL conexion = new ConexionSQL();
        String schoolId;

        if ((conexion.openConexion()) == "TRUE")
        {
            SqlDataAdapter adapter = new SqlDataAdapter();
            try
            {
                adapter = new SqlDataAdapter(
                    String.Format(@"
                        SELECT
	                        s.name as schoolName,
	                        ci.name as city,
	                        co.name as country,
	                        ( r.student_name + ' ' + r.student_last_name ) as studentName,
	                        r.class_group,
	                        r.labs_delivery,
	                        r.score
                        FROM
	                        ranking r
                        INNER JOIN schools s ON r.school_id = s.id
                        INNER JOIN cities ci ON s.city = ci.id
                        INNER JOIN countries co ON s.country = co.id
                        ORDER BY
	                        r.score DESC
                        "
                    ),
                    conexion.getConexion()
                );

                DataSet dataSet = new DataSet();
                adapter.Fill(dataSet);

                JArray jObjs = new JArray();
                DataTable dt = dataSet.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        JObject jObj = new JObject();
                        for (int i = 0; i < dt.Columns.Count; i++)
                        {
                            String columnName = dt.Columns[i].ColumnName;
                            jObj[columnName] = dt.Rows[j][i].ToString();
                        }
                        jObjs.Add(new JObject(jObj));
                    }
                }

                result["ESTADO"] = "TRUE";
                result["MENSAJE"] = "Consulta correcta";
                result["RESULTADO"] = jObjs;
            }
            catch (System.Data.SqlClient.SqlException e)
            {
                result["ESTADO"] = "FALSE";
                result["MENSAJE"] = "Consulta Incorrecta. Query: " + e.ToString();
                result["QUERY"] = "Query: " + adapter.SelectCommand.CommandText;
                return result;
            }
            conexion.closeConexion();
        }
        else
        {
            result["ESTADO"] = "FALSE";
            result["MENSAJE"] = "Consulta Incorrecta. Conexion: " + conexion.openConexion();
            return result;
        }
        return result;
    }

}