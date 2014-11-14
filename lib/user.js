var edge = require('edge');
var config = require('config');

module.exports.create = edge.func('ps', function() {
  /*
  $secure = convertto-securestring $inputFromJS.rpc_password -force -asPlainText
  $credential = new-object -typename System.Management.Automation.PSCredential `
    -argumentlist $inputFromJS.rpc_user, $secure

  invoke-command -computer $inputFromJS.rpc_server `
    -Credential $credential -Authentication credssp `
    -scriptblock { `
      import-module nextuclync2013; `
      New-HostedUser `
        -container $args[0] `
        -upn $args[1] `
        -displayName $args[2] `
        -description $args[3] `
        -givenName $args[4] `
        -surName $args[5] `
        -password $args[6] `
        -email $args[7] `
        -phone $args[8] `
        -mobilePhone $args[9] `
        | convertto-json; `
    } `
  -args `
    $inputFromJS.container, `
    $inputFromJS.upn, `
    $inputFromJS.displayName, `
    $inputFromJS.description, `
    $inputFromJS.givenName, `
    $inputFromJS.surName, `
    $inputFromJS.password, `
    $inputFromJS.email, `
    $inputFromJS.phone, `
    $inputFromJS.mobilePhone


  */
});

module.exports.get = edge.func('ps', function() {
  /*
  $secure = convertto-securestring $inputFromJS.rpc_password -force -asPlainText
  $credential = new-object -typename System.Management.Automation.PSCredential `
    -argumentlist $inputFromJS.rpc_user, $secure

  invoke-command -computer $inputFromJS.rpc_server `
    -Credential $credential -Authentication credssp `
    -scriptblock { `
      import-module nextuclync2013; `
      Get-HostedUser `
        -container $args[0] `
        -upn $args[1] `
        | convertto-json; `
    } `
    -args `
      $inputFromJS.container, `
      $inputFromJS.upn



  */
});

module.exports.destroy = edge.func('ps', function() {
  /*
  $secure = convertto-securestring $inputFromJS.rpc_password -force -asPlainText
  $credential = new-object -typename System.Management.Automation.PSCredential `
    -argumentlist $inputFromJS.rpc_user, $secure

  invoke-command -computer $inputFromJS.rpc_server `
    -Credential $credential -Authentication credssp `
    -scriptblock { `
      import-module nextuclync2013; `
      Remove-HostedUser `
        -container $args[0] `
        -upn $args[1] `
        | convertto-json; `
    } `
    -args `
      $inputFromJS.container, `
      $inputFromJS.upn


  */
});
