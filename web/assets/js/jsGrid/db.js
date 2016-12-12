(function() {

    var db = {

        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.Practica || client.Practica.indexOf(filter.Practica) > -1)
                    && (!filter.Unidad || client.Unidad.indexOf(filter.Unidad) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado);
            });
        },

        insertItem: function(insertingClient) {
            this.clients.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }

    };

    window.db = db;

    db.clients = [];

    /////////////////       ESTUDIANTES     /////////////////////////////////////////////////////
    var dbEst = {

        loadData: function(filter) {
            return $.grep(this.practs, function(client) {
                return (!filter.Estudiante || client.Estudiante.indexOf(filter.Estudiante) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado)
                    && (!filter.N_PROFESOR || client.N_PROFESOR.indexOf(filter.N_PROFESOR) > -1)
                    && (!filter.N_APP || client.N_APP.indexOf(filter.N_APP) > -1)
                    && (!filter.N_FINAL || client.N_FINAL.indexOf(filter.N_FINAL) > -1);
            });
        },

        insertItem: function(insertingClient) {
            this.practs.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.practs);
            this.practs.splice(clientIndex, 1);
        }

    };

    window.dbEst = dbEst;

    dbEst.practs = [];

    ////////////////////////    RANKING     /////////////////////////////////////////////////////////////////////////////////
    var dbRan = {

        loadData: function(filter) {
            return $.grep(this.est, function(client) {
                return (!filter.Estudiante || client.Estudiante.indexOf(filter.Estudiante) > -1)
                    && (!filter.Grupo || client.Grupo.indexOf(filter.Grupo) > -1)
                    && (!filter.Nota || client.Nota.indexOf(filter.Nota) > -1)
                    && (!filter.Practicas || client.Practicas.indexOf(filter.Practicas) > -1)
                    && (!filter.Tiempo || client.Tiempo.indexOf(filter.Tiempo) > -1);
            });
        },

        insertItem: function(insertingClient) {
            this.est.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.est);
            this.est.splice(clientIndex, 1);
        }

    };

    window.dbRan = dbRan;

    dbRan.est = [];

    ////////////////////////    ANUNCIOS     /////////////////////////////////////////////////////////////////////////////////
    var dbAnun = {

        loadData: function(filter) {
            return $.grep(this.dbAnun, function(client) {
                return (!filter.Titulo || client.Titulo.indexOf(filter.Titulo) > -1)
                    && (!filter.Profesor || client.Profesor.indexOf(filter.Profesor) > -1)
                    && (!filter.Contenido || client.Contenido.indexOf(filter.Contenido) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
            });
        },

        insertItem: function(insertingClient) {
            this.dbAnun.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.dbAnun);
            this.dbAnun.splice(clientIndex, 1);
        }

    };

    window.dbAnun = dbAnun;

    dbAnun.dbAnun = [];

    /////////////////////////   PRACTICAS   ////////////////////////////////////////////////
    var dbPracs = {

        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.Practica || client.Practica.indexOf(filter.Practica) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado)
                    && (!filter.Entrega || client.Entrega.indexOf(filter.Entrega) > -1)
                    && (!filter.Intentos || client.Intentos.indexOf(filter.Intentos) > -1)
                    && (!filter.N_PROFESOR || client.N_PROFESOR.indexOf(filter.N_PROFESOR) > -1)
                    && (!filter.N_APP || client.N_APP.indexOf(filter.N_APP) > -1)
                    && (!filter.N_FINAL || client.N_FINAL.indexOf(filter.N_FINAL) > -1)
            });
        },

        insertItem: function(insertingClient) {
            this.data.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.data);
            this.data.splice(clientIndex, 1);
        }

    };

    window.dbPracs = dbPracs;

    dbPracs.data = [];

}());