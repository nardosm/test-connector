(function(){
  var fileType; //define global variable
  // mstr is a global object from mstrgdc-1.0.js, which represents the data connector framework
  var myConnector = mstr.createDataConnector();
  // Connector must define fetchTable function
  myConnector.fetchTable = function(table, params, doneCallback) {       
    // params represents information sent by connector to MSTR at interactive phase
    var mstrObj = JSON.parse(params);
    var file = mstrObj.connectionData.file;
    var url = "https://eventmanager-4c485.firebaseio.com/-Kkpnt0DxRpQeHvUp3Lv.json";  
	debugger;
    // Retrieve file type from params
    fileType = mstrObj.fileType;
    $.get(url, function(resp) {
      var data = resp;
      if (fileType == "JSON"){
        // resp is a JSON object. You need to transform it to a string.
        data = JSON.stringify(resp);
      }
      table.appendRawData(data);
      doneCallback(table);
    });
  };
  // validateDataConnector does the validation check of the connector
  mstr.validateDataConnector(myConnector);
});


// Create event listener for when the user submits the form
$(document).ready(function() {
  $("#submitButton").click(function() {
    var content = $("#file").val();
    mstr.connectionName = "RawDataFiles";
    // connectionData is a JSON object. Connector can put any information here.
    mstr.connectionData = {};
    mstr.connectionData.file = content;
    // Get file type from extension
    fileType = content.split('.').pop().toUpperCase();
    if(fileType == "JSON"){
      mstr.fileType = "JSON";
    }
    // MUST define tableList field. Can import multiple tables in one connection
    mstr.tableList = [];
    mstr.tableList.push({tableName: "RawDataFiles"});
    // Inform that interactive phase is finished and send information to MSTR
    window.mstr.submit();
  });
});








/*
(function(){
  // mstr is a global object from mstrgdc-1.0.js, which represents the data connector framework
  var myConnector = mstr.createDataConnector();
  // Connector must define fetchTable function
  myConnector.fetchTable = function(table, params, doneCallback) {
debugger;
    // params represents information sent by connector to MSTR at interactive phase
    var mstrObj = JSON.parse(params);
    var file = mstrObj.connectionData.file;
	debugger;
    var url = "https://www.ibm.com/support/knowledgecenter/en/SVU13_7.2.1/com.ibm.ismsaas.doc/reference/AssetsImportCompleteSample.csv";
    $.get(url, function(resp) {
      table.appendRawData(resp)
      doneCallback(table);
    });
	
  };
  // validateDataConnector does a validation check of the connector
  mstr.validateDataConnector(myConnector);
})();

// Create event listener for when the user submits the form

$(document).ready(function() {
  $("#submitButton").click(function() {
    var content = $("#file").val();
    mstr.connectionName = "RawDataFiles20";
    // connectionData is a JSON object. Connector can put any information here.
    mstr.connectionData = {};
    mstr.connectionData.file = content;
    // MUST define tableList field. Can import multiple tables in one connection.
    mstr.tableList = [];
    mstr.tableList.push({tableName: "RawDataCsv21"});
    // Inform that interactive phase is finished and send information to MSTR
	debugger;
    window.mstr.submit();
  });
});

*/
