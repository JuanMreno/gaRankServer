
class PdfMakeConstructor {
  constructor(fileName) {
  	this.fName=fileName;

  	this.styles = {
  		watermark: {
  			margin: [0, 0, 0, 0]
  		},
		header: {
			fontSize: 20,
			bold: true,
			margin: [0, 20, 0, 25]
		},
		subheader: {
			fontSize: 13,
			bold: false,
			margin: [0, 0, 0, 2]
		},
		tableExample: {
			margin: [0, 0, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	};
  }

  makeStudentReport(data) {
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Unidad', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		b.push(
			[
				e.lab_name,
				e.less_name,
				e.delivery_date,
				estado,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score,
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
	  content: [
		{
			columns: [
				{
					alignment: 'center',
					image: 'data:image/png;base64,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'
					//fontSize: 40,

				},
				{
					alignment: 'right',
					image: 'data:image/png;base64,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'
				}
			],
			style: 'watermark'
		},
	  	{ text: 'Reporte de notas de laboratorio de laboratorio', style: 'header' },
	  	{ text: 'Nombre: ' + data.name, style: 'subheader' },
	  	{ text: 'Fecha:	' + data.date, style: 'subheader' },
	  	//{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: 'Materia: ' + data.subject, style: 'subheader' },
	    {
    		style: 'tableExample',
			table: {
			// headers are automatically repeated if the table spans over multiple pages
			// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
				body: b
			}
	    }
	  ],
	  styles:this.styles,
	  pageSize: 'FOLIO',
	  pageOrientation: 'landscape'
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }

  makeLabReport(data){
  	console.log(data);
  	
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Tiempo entrega', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Intentos', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		
		b.push(
			[
				e.user_name,
				e.delivery_date,
				estado,
				e.lab_delivery_time,
				e.lab_attempts,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score,
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
	  content: [
		{
			columns: [
				{
					alignment: 'center',
					image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAAyCAYAAACNtz0TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABzhJREFUeNrsmjFs60YMhtXibc6szPJsjcXzHAPdol27C3RzZ2WO52Tr4N27uxVwZwUd7dmeo/lpr874L2Fo3kl5cJBX4P8Aw4ly5vF4PJJHJ0kIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGX5yeaIEl+/fPftHt77F6rv3//ZUuLkP8TP9MEJ+Y8wISZ+G1mG3Vv0+6V4lHdHZCjGpN1b1cBEYdufCvGOlmZJQtZ9DqizgHv4+5zOyMD59CzhezG0tP47MiSGVufNbZH/2etj6VD9/pm2DeoH3RrnWzMP9KfD8yXh9YRGC/37dh9rg7pMWDeSUiOGPPGb4R9X9YXGhfZl2fDJ3I9PmBneQ5M/7oEXz7gAM+Q2U4GdwbsXmX3fNst4FEMXeJvFgv3WRhhCUfYB2TNYagQZfdyOhVCL6en/73BK4VsnZFPenbPl8p5ppA9D8x7tr5ORmtk/Jj+q+616akgptB/of52tmalm5O9xd9bXCeG7KuzRRk7BDgAd2LfEtjW/XwvPiv1+G45CAb3Yi3aRqf19YwL7d8WOiZqLq2r8/VK6bQU58CtZd49f7x0xfflwgd4CmdyjrpRkatyC3XPfXR0Y3sygI9ipTKO25And6i611LMs0BUfDQi/sE4wFpPdygX3ftOZilswo2LpELsG5lW9JfrQ0CaQX4jIvdY6zHQ1hnkrRFMNO7vu4hucv7NgMqqxLgSn9lFxi5xSOY+8windrZfCz0O75ST4vlcBB6nTxPIcmPYyP88JPMX4gCPDXlORmn0VGbClgWqhkrJdftf91UCn3InhtEXlkPCYTci+o3xvK+ES7E5rZB1hKxRYMOOsecw+Dyg5xrjCqknnGCKNfbNZa7PrQHzuUDwVdgsjciJ8Rtk1WJdkjwgN/cO/475vT38HqY9lU+CrNSofVu/wwfmATkNMuNM7MfECgawSSoCTta3VhGw1qJC08HxqPymEVWn51rrhP3f99jvUxtbU0QoM6q7AyLKCFkexXDj086wlXTSTk6oCRXaJDnfFE4cyj61OLynz6GMbhFpE+E4oTXE1ncU8sfvuWMad8SVOATXyhHTQLaUDt87P2SdsieC6bHHCWdirPaBjbB7nw9MI3JqFWTHAVm5yrzBCkIFLO/H1lrPZCDDZupa4D5fuOpOBn+XmYf0Hz6rnP4qFyeaLlbD6uSE3RjrIL2UoMgWFbLOyt2FsbHN0KaLaEIchHPUA9eUi8/VvlxCaXhqPA34XIwJdLTsECuxXZbaCjvojJFHstxYONtkQBYu4dRbseY0UuKPBto3j5TS+VA58LNY8N4pe2967vKFuAM/++fC1hP4rr7CLFXFULs+CvaqwB5vLllGf8QhvlKGHBsNgAXGZChX9kaUPRq/V9jYEof5zsgeGZzZ2shGGa8d6Fwyum5Ec6TvbpWFmjUIIrK8c476V6SrbjWYTvdx5UhpXyVgOHwWCzbCqfdiruseH0gGOmrMRklMjgrMsWoiF9eNLGZXEbBGqP5KVRo3QsZS+dCt6KW0qmKosWclDvP80gf50t3pkboHF7Lh5Q6kaGjUsbJCZ1a875CZb42yKOSQ+vm3SCZJEWnPGi/QvUE2bkMZLNawwZqcPg+yqfTOcrrE3NfqQGUDspwvL4c2tUoRGHOxx2lfdgx81eObUaNYUwt7pDOg5AbXnLYbY1YTImA9DGlqQb8Zgl+uAr7P6F6GrhB2yLRj/Ozk7PxcropxzSyj+fXD3Ylro/lj3VWHNrVusVmaJtJMOg54/gQ9U2PT7+Acu4CeNTY4j9ytzPUhilc4tMfvaWqJ7FDhblWh+7lNzr9zHwXue/WQphoCjnO4ezXXKiDbB1rdO5BXgCsc7qgP4HkjGmq6EpmJjnNsrY2Yo6+p9QcSi7atbFhlgYCRq+vVXAUCX1VcvJS+dCbewnBLRCV/T5vA6CtZ3hp3ipeGABb8hBLF/+zv3UXy+v2bDhSrvueIigVK47VoXpQw8n2kJPVrbCPR1Fqfb0S5e+xKNWUmyCZnQVH9U4tvMK2McuyoHH6DK0iTvH6/XhiZKTT/FvbYGgft4INS4BC6uecIkk9q7qrPB/ANQYI98w3Nf2DzG/jSo6gmtihTK3Et8eOWOrgac/r/E5gk9nfqB1HlWDJ8Bt+ILF/DBiMRBG4wtv5hDzFKmwUMMYfiLZSWd9gRjJaHutjisPmIWghnXQb+82evy7PQczhTIe5ADZxBNh7OGivIoDWy3iFypdDre0ZDbqc2fx+yg7HZOUo06x75LDOEaKqUyetXPnXy9uua2Px+7nVgn/cRP1gj8BYi4Dl5D2LukA88qzXcQf9K6PWmHyKan6UIwKafqGuBXOsk1DBNwl/TydJf/wPHSlQSacD+hBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgj5OP4TYAB0nUgrKCAQcwAAAABJRU5ErkJggg=='
					//fontSize: 40,

				},
				{
					alignment: 'right',
					image: 'data:image/png;base64,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'
				}
			],
			style: 'watermark'
		},
	  	{ text: 'Reporte de notas de laboratorio', style: 'header' },
	  	{ text: 'Nombre: ' + data.stuName, style: 'subheader' },
	  	{ text: 'Grupo: ' + data.group, style: 'subheader' },
	  	{ text: 'Periodo:	' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
	  	{ text: 'Materia: ' + data.subject, style: 'subheader' },
	  	{ text: 'Avance: ' + data.avanInd, style: 'subheader' },
	  	{ text: 'Promedio: ' + data.promInd, style: 'subheader' },
	    {
    		style: 'tableExample',
			table: {
			// headers are automatically repeated if the table spans over multiple pages
			// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
				body: b
			}
	    }
	  ],
	  styles:this.styles,
	  pageSize: 'FOLIO',
	  pageOrientation: 'landscape'
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }

  makeStuReport(data){
  	console.log(data);
  	
  	var b = [];
  	var header = [
  		{ text: 'Práctica', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Unidad', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Fecha', style: 'tableHeader', alignment: 'center' }, 
  		{ text: 'Estado', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Tiempo entrega', style: 'tableHeader', alignment: 'center' },
  		{ text: 'Intentos', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Profesor', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Lab', style: 'tableHeader', alignment: 'center' },
  		{ text: 'N. Final', style: 'tableHeader', alignment: 'center' }
	];

	b.push(header);

	data.rows.forEach(function(e,i,a){
		var estado = (e.lab_state == "1") ? "Entregado" : "Pendiente";
		
		b.push(
			[
				e.lab_name,
				e.less_name,
				e.delivery_date,
				estado,
				e.lab_delivery_time,
				e.lab_attempts,
				e.lab_teacher_score,
				e.lab_app_score,
				e.lab_final_score
			]
		);
 	});
	//.push(bodyData);

  	var docDefinition = {
		/*
		header: {
			
		},*/
		content: [
			{
				columns: [
					{
						alignment: 'center',
						image: 'data:image/png;base64,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'
						//fontSize: 40,

					},
					{
						alignment: 'right',
						image: 'data:image/png;base64,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'
					}
				],
				style: 'watermark'
			},
			{ text: 'Reporte de notas de laboratorio', style: 'header' },
			{ text: 'Nombre: ' + data.stuName, style: 'subheader' },
			{ text: 'Grupo: ' + data.group, style: 'subheader' },
			{ text: 'Periodo:	' + data.fIni + ' a ' + data.fFin, style: 'subheader' },
			{ text: 'Materia: ' + data.subject, style: 'subheader' },
			{ text: 'Avance: ' + data.avanInd, style: 'subheader' },
			{ text: 'Promedio: ' + data.promInd, style: 'subheader' },
			{
				style: 'tableExample',
				table: {
				// headers are automatically repeated if the table spans over multiple pages
				// you can declare how many rows should be treated as headers
					headerRows: 1,
					widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
					body: b
				}
			}
		],
		styles:this.styles,
		pageSize: 'FOLIO',
		pageOrientation: 'landscape'
	};
 	pdfMake.createPdf(docDefinition).download(this.fName);
  }
}