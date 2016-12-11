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
			                            s.id = @schoolId
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

                result["ESTADO"] = "TRUE";
                result["MENSAJE"] = "Consulta correcta";
                result["RESULTADO"] = new JArray(obj.ToString());
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
    
}