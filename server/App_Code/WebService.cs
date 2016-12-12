using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Data.SqlClient;


//[WebService(Namespace = "http://indesap.com/")]
//[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {
        new ClaseConfig().setConfig();        
    }

    [System.Web.Services.WebMethod()]
    public string entry(string data)
    {
        JObject result = new JObject();
        JObject res = new JObject();

        data = Encoding.UTF8.GetString(Convert.FromBase64String(data));
        //data = Server.UrlDecode(data);

        JObject dataObj = JsonConvert.DeserializeObject<JObject>(data);
        JObject param = (JObject)dataObj["PARAMS"];

        switch (dataObj["METHOD"].ToString())
        {
            //////////////////////            Clase Login             /////////////////////////////////////////////////////    
            case "put_ranking":
                result = (new Ranking()).put_ranking(param);
                break;
            case "getFilters":
                result = (new Ranking()).getFilters(param);
                break;
            case "getRankingTable":
                result = (new Ranking()).getRankingTable(param);
                break;
            default:
                result["ESTADO"] = "FALSE";
                result["MENSAJE"] = "Metodo " + dataObj["METHOD"].ToString() + " no encontrado";
                break;
        }
        res["RESULT"] = result;
        return res.ToString();
    }
}