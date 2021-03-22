function myParse(xml) {
  // I do declare...
  var y, yy, plugv, descv, riskv, solv, xmlDoc;
  var medV = 0, highV = 0, critV = 0, vulner;
  var txt = "", arr, arr2, arr3, finding, hosts;
  xmlDoc = xml.responseXML;

  // build classes for our risk output
  classCritical = " <span style=\"background-color: rgb(178,34,34)\">"
  classHigh = " <span style=\"background-color: rgb(255,140,0)\">"
  classMedium = " <span style=\"background-color: rgb(255,215,0)\">"
  endSpan = "<\/span>"

  // build records for the Array of objects.
  var records = [];
  var record = 
  {
    "vuln": "",
    "desc": "",
    "risk": "",
    "solu": "",
    "ip"  : ""
  }
  
  // pull selection
  selectItem = document.getElementById("select");

  ///////////////////////////////////////////////////
  // new way grab all ReportHosts to get each ip scan.
  yy = xmlDoc.getElementsByTagName("ReportHost");
  // make new array of all HTML Collection Objects.
  // Array of IP's.
  var arr = Array.prototype.slice.call(yy);
  //    Get length of IP children, and loop.
  for (hosts of arr) { 
    if (hosts.childNode = "ReportHost"){
        var ipv = hosts.outerHTML.split('"')[1];
        // New Array of the individual host data
        var arr2 = Array.prototype.slice.call(hosts.childNodes);

    // now loop through the hosts data
    for(finding of arr2) { 
      if (finding.childNode = "ReportItem") {
        // now loop through the vulns for each finding
        var arr3 = Array.prototype.slice.call(finding.childNodes);

        for(vulner of arr3) {

          switch (vulner.localName) {
            case "description":
              var descv = vulner.innerHTML;
              break;
            case "plugin_name":
              var plugv = vulner.innerHTML;
              break;
            case "risk_factor":
              var riskv = vulner.innerHTML;
              break;
            case "solution":
              var solv = vulner.innerHTML;

              // create core database array.
            record = {
              "vuln": plugv,
              "desc": descv,
              "risk": riskv,
              "solu": solv,
              "ip"  : ipv
            }
            // add record to array.
            records.push(record);
          } 
        }      
      }

    }
           
    }
    
  }


// sort the objects by the risk level (critical, high, medium)
// Alphabetically works.
  records.sort ((a, b) => (a.risk > b.risk) ? 1 : -1);
  // make a Key index for matching IP addresses.
  var keyRecords = makeKeyArray(records);
console.log(keyRecords);
console.log(records);
// Build numbers for the graphics, medium, high and critical && creating
// webpage details.

  for (y = 0; y < keyRecords.length; y++) {
    // find record 1 and compare to key to get set of IP addresses
    const index = records.findIndex(item => item.vuln === keyRecords[y].vuln);

    switch (records[index].risk) {
      case("Critical"):
        critV += 1;
        // Always display criticals.
        txt += "<h4>Vulnerability Name: </h4></b>" + keyRecords[y].vuln + "<b><h4> Description: </h4></b> " + records[index].desc + "<br><br><b>Risk Factor:</b> " + classCritical + records[index].risk  + endSpan + "<br><b>Solution: </b>" + records[index].solu + "<br><br><b>IP Address: </b>" + keyRecords[y].ip + "<hr>";      
      break;
      case("High"):
        highV += 1;
        // If selector is high or less add high items to list. otherwise filter them out.
        if (selectItem.value <= 2) {
          txt += "<h4>Vulnerability Name: </h4></b>" + keyRecords[y].vuln + "<b><h4> Description: </h4></b> " + records[index].desc + "<br><br><b>Risk Factor: </b> " + classHigh + records[index].risk + endSpan + "<br><b>Solution: </b>" + records[index].solu + "<br><br><b>IP Address: </b>" + keyRecords[y].ip + "<hr>"; 
        }    
      break;
      case("Medium"):
        medV += 1;
        // If selector is medium then add medium items to list.  otherwise filter them out.
        if (selectItem.value == 1) {
          txt += "<h4>Vulnerability Name: </h4></b>" + keyRecords[y].vuln + "<b><h4> Description: </h4></b> " + records[index].desc + "<br><br><b>Risk Factor: </b> " + classMedium + records[index].risk + endSpan + "<br><b>Solution: </b>" + records[index].solu + "<br><br><b>IP Address: </b>" + keyRecords[y].ip + "<hr>";
        }
             
      break;
    }

  }

 

  // post the div
  document.getElementById("mainDiv").innerHTML = txt;

  // Enable copy button we should something to copy
  document.getElementById("btnCopy").disabled = false; 
  
  // draw the chart using the values
  // draw doughnut
  drawOverall(medV, highV, critV);
  // draw criticals
  buildBar(critV, "Critical", "rgb(178,34,34)", critV);
  // draw highs
  buildBar(highV, "High", "rgb(255,140,0)", highV);
  // draw mediums
  buildBar(medV, "Medium", "rgb(255,215,0)", medV);
  // enable select 
  document.getElementById("select").disabled = false;
  // set data message
  document.getElementById("btnConn").value = "Data Returned..."
}

// Function to create an array of IP's that match vulnerabilties.
// Returns a key index.
function makeKeyArray(items){
  result = []

  for(let item of items){
      if(item.vuln in result){
          result[item.vuln] += ', ' + item.ip
      }else{
          result[item.vuln] = item.ip
      }
  }
  let resultArray = Object.entries(result).map((data)=> 
      {return {vuln: data[0], ip: data[1]}})
console.log(resultArray);
  return resultArray;
}
