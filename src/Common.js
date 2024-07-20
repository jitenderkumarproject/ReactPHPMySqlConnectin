function ajaxRequest() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    return new XMLHttpRequest();
  }
}
function replaceSpecialChar(getString) {
  if (typeof getString != "number" && getString != null) {
    getString = getString.replace(/\#/g, "^^hash^^");
    getString = getString.replace(/\+/g, "^^plus^^");
    getString = getString.replace(/\%/g, "^^mod^^");
    getString = getString.replace(/\&amp;/g, "^^and^^");
    getString = getString.replace(/\&/g, "^^and^^");
    getString = getString.replace(/\=/g, "^^equal^^");
  }
  return getString;
}
export const callApi = (url, prm, Success) => {
  var prms = "";
  if (typeof prm != "undefined") {
    for (let i = 0; i < prm.length; i++) {
      if (prms.length > 0) prms = prms + "&";
      prms = prms + (i + 1) + "=" + replaceSpecialChar(prm[i]);
    }
  }
  var xhr = new ajaxRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var SessXML = xhr.responseText
        .replace(/[\r\n\s]*</g, "<")
        .replace(/[\r\n\s]*$/g, "");
      if (SessXML.indexOf(".php") >= 0) {
        alert(SessXML);
      } else {
        Success(SessXML);
      }
    }
  };
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(prms);
};
