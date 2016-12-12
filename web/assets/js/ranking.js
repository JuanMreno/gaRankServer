
(function($) {
    var filter = {
        country : false,
        city : false,
        schoolName : false,
        studentName : false,
        class_group : false,
        labs_delivery : false,
        score : false,
    };

	function mainInit() {
        setDropsDown();
        setTable();
	}

	mainInit();

    function setDropsDown() {

        var data = {
            METHOD:"getFilters",
            PARAMS:{}
        };

        var xmlhttp;
        var jData = JSON.stringify(data);

        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseXML;

                //var obj = jQuery.parseJSON(xmlDoc.getElementsByTagName("string")[0].innerHTML);

                var data = $.parseJSON(xmlDoc.getElementsByTagName("string")[0].innerHTML);

                if(data.RESULT.ESTADO == 'TRUE'){
                    var dataFilters = data.RESULT.RESULTADO;

                    setCountryDropDown(dataFilters.countries);
                    setCityDropDown(dataFilters.cities);
                    setSchoolDropDown(dataFilters.schools);

                }
                else{
                    $('#alertModalCont').text("Algo ha fallado en la conexión a Internet o con los servidores.");
                    $('#alertModal').modal('show');
                }
            }
            else{
                console.log("ajax fail");
            }
        }
        xmlhttp.open("POST", CON_URL, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("data=" + window.btoa(jData));
    }

    function setCountryDropDown(data) {
        $dropDown = $("#countryDropDown");
        $dropDownMenu = $dropDown.children('.dropdown-menu').first();
        $dropDownMenu.html("");
        if(data.length == 0){
            //setTableAnun('-1');
            $dropDown.children('button').text('Ninguno')
            return;
        }
        else{
            //setTableAnun(res.data[0].user_group_id);
            $dropDown.children('button').html("Todos" + '  <span class="caret"></span>');

            $aNewRow = $('<a class="userGroupSelElem" href="#">' + "Todos" + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                $dropDown.children('button').html("Todos" + '  <span class="caret"></span>');

                filter.country = false;
                console.log(filter);
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $dropDownMenu.append($newRow);
        }

        data.forEach(function(e,i) {
            $aNewRow = $('<a class="userGroupSelElem" href="#">' + e.name + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                $this = $(this);

                $dropDown.children('button').html($this.text() + '  <span class="caret"></span>');

                filter.country = $this.text();
                console.log(filter);
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $dropDownMenu.append($newRow);
        });
    }

    function setCityDropDown(data) {
        $cDropDown = $("#cityDropDown");
        $cDropDownMenu = $cDropDown.children('.dropdown-menu').first();
        $cDropDownMenu.html("");
        if(data.length == 0){
            //setTableAnun('-1');
            $cDropDown.children('button').text('Ninguno')
            return;
        }
        else{
            //setTableAnun(res.data[0].user_group_id);
            $cDropDown.children('button').html("Todos" + '  <span class="caret"></span>');

            $aNewRow = $('<a class="userGroupSelElem" href="#">' + "Todos" + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                filter.city = false;
                console.log(filter);
    
                $cDropDown.children('button').html("Todos" + '  <span class="caret"></span>');
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $cDropDownMenu.append($newRow);
        }

        data.forEach(function(e,i) {
            $aNewRow = $('<a class="userGroupSelElem" href="#">' + e.name + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                $this = $(this);

                $cDropDown.children('button').html($this.text() + '  <span class="caret"></span>');

                filter.city = $this.text();
                console.log(filter);
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $cDropDownMenu.append($newRow);
        });
    }

    function setSchoolDropDown(data) {
        $sDropDown = $("#schoolDropDown");
        $sDropDownMenu = $sDropDown.children('.dropdown-menu').first();
        $sDropDownMenu.html("");
        if(data.length == 0){
            //setTableAnun('-1');
            $sDropDown.children('button').text('Ninguno')
            return;
        }
        else{
            //setTableAnun(res.data[0].user_group_id);
            $sDropDown.children('button').html("Todos" + '  <span class="caret"></span>');

            $aNewRow = $('<a class="userGroupSelElem" href="#">' + "Todos" + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                filter.schoolName = false;
                console.log(filter);

                $sDropDown.children('button').html("Todos" + '  <span class="caret"></span>');
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $sDropDownMenu.append($newRow);
        }

        data.forEach(function(e,i) {
            $aNewRow = $('<a class="userGroupSelElem" href="#">' + e.name + '</a>');

            $aNewRow.off("click").on('click', function(event) {
                event.preventDefault();
                $this = $(this);

                $sDropDown.children('button').html($this.text() + '  <span class="caret"></span>');

                filter.schoolName = $this.text();
                console.log(filter);
                $("#jsGrid").jsGrid("loadData", filter);
            });

            $newRow = $('<li></li>').append($aNewRow);
            $sDropDownMenu.append($newRow);
        });
    }

    function setTable() {
        $("#jsGrid").jsGrid({
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            editting: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            noDataContent: "Ningún dato encontrado.",
            controller: {
                loadData: function(filter) {
                    var d = $.Deferred();
                    var session = $.cookie(SESSION_COOKIE);

                    var data = {
                        METHOD:"getRankingTable",
                        PARAMS:{}
                    };

                    var xmlhttp;
                    var jData = JSON.stringify(data);

                    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp = new XMLHttpRequest();
                    }
                    else {// code for IE6, IE5
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            xmlDoc = xmlhttp.responseXML;

                            //var obj = jQuery.parseJSON(xmlDoc.getElementsByTagName("string")[0].innerHTML);

                            var data = $.parseJSON(xmlDoc.getElementsByTagName("string")[0].innerHTML);

                            if(data.RESULT.ESTADO == 'TRUE'){
                                var dt = data.RESULT.RESULTADO;

                                dtGlobal = dt;
                                var dataFiltered = $.grep(dt, function(obj) {
                                    return (!filter.schoolName || obj.schoolName.indexOf(filter.schoolName) > -1)
                                        && (!filter.city || obj.city.indexOf(filter.city) > -1)
                                        && (!filter.country || obj.country.indexOf(filter.country) > -1)
                                        && (!filter.studentName || obj.studentName.indexOf(filter.studentName) > -1)
                                        && (!filter.class_group || obj.class_group.indexOf(filter.class_group) > -1)
                                        && (!filter.labs_delivery || obj.labs_delivery.indexOf(filter.labs_delivery) > -1)
                                        && (!filter.score || obj.score.indexOf(filter.score) > -1);
                                });

                                d.resolve(dataFiltered);
                            }
                            else{
                                $('#alertModalCont').text("Algo ha fallado en la conexión a Internet o con los servidores.");
                                $('#alertModal').modal('show');
                                d.resolve([]);
                            }
                        }
                        else{
                            console.log("ajax fail");
                        }
                    }

                    xmlhttp.open("POST", CON_URL, true);
                    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlhttp.send("data=" + window.btoa(jData));

                    return d.promise();
                }
            },

            pagerFormat: "Pag {first} {prev} {pages} {next} {last}    {pageIndex} de {pageCount}",
            pagePrevText: " < ",
            pageNextText: " > ",
            pageFirstText: " << ",
            pageLastText: " >> ",

            loadIndicator: {
                show: function() {
                },
                hide: function() {
                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(5)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Cantidad de laboratorios entregados'
                    });

                    $e = $(".jsgrid-header-row > .jsgrid-header-cell:eq(6)");
                    $e.attr({
                        "data-toggle": 'tooltip',
                        "data-container": 'body',
                        "title": 'Puntaje total'
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                }
            },

            fields: [
                { name: "country", type: "text", align: "center", title: "País" },
                { name: "city", type: "text", align: "center", title: "Ciudad" },
                { name: "schoolName", type: "text", align: "center", title: "Escuela" },
                { name: "studentName", type: "text", align: "center", title:"Estudiante" },
                { name: "class_group", type: "text", align: "center", title:"Grupo" },
                { name: "labs_delivery", type: "text", align: "center", title:"L" },
                { name: "score", type: "text", align: "center", title:"Pts." },
                { type: "control" }
            ]
        });
    }

})(jQuery);