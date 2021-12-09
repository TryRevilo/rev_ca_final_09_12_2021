var net = require("net");

var revRegIPDataArr = {
  filter: []
};

var revRegIPAddressesObj = {};

var regNewClientConnectionObject = revConnectionObject => {
  console.log('>>>> ' + JSON.stringify(revConnectionObject));

  let revClientIP = revConnectionObject.revClientIP;
  let revLoggedInEntityGUID = revConnectionObject.revLoggedInEntityGUID;

  if (!revRegIPAddressesObj.hasOwnProperty(revLoggedInEntityGUID)) {
    let revClientSocket = new net.Socket();

    revClientSocket.connect(revClientSocket, revClientIP, function () {
      console.log('revSocket : ' + revClientSocket + ' revClientIP : ' + revClientIP + "Connected");

      let revRetData = { item: "revSocket : " + " IP " + revClientIP + " =>>> message :::> Hello, Wanja Babe Server! Love, Client." };

      revClientSocket.write(JSON.stringify(revRetData));
    });

    revClientSocket.on("data", function (data) {
      console.log("Received: " + data);
    });

    revClientSocket.on("close", function () {
      console.log("Connection closed");
      revClientSocket.destroy(); // kill client after server's response
    });

    revRegIPAddressesObj[revLoggedInEntityGUID] = { 'revClientIP': revClientIP, 'revClientSocket': revClientSocket };

  }
};

var deleteConnectionObjectRef = revConnectionObject => {
  let revIP = revConnectionObject.rev_client_ip;

  if (revRegIPDataArr.filter.some(item => item.rev_client_ip === revIP)) {
    let revItemIndex = revRegIPDataArr.filter.findIndex(
      item => item.rev_client_ip === revIP
    );
    console.log(
      "DELETED Index " +
      revItemIndex +
      JSON.stringify(revRegIPDataArr.filter.splice(revItemIndex))
    );
  }
};

module.exports.revRegIPDataArr = revRegIPDataArr;
module.exports.regNewClientConnectionObject = regNewClientConnectionObject;
module.exports.deleteConnectionObjectRef = deleteConnectionObjectRef;
