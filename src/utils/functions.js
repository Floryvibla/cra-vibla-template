export function searchToObject(routerUrl) {
  var pairs = routerUrl.substring(2).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}
export function validaEmail(value) {
  if (value !== '') {
    const usuario = value.substring(0, value.indexOf('@'));
    const dominio = value.substring(value.indexOf('@') + 1, value.length);

    if (usuario.length >= 1 && dominio.length >= 3 && usuario.search('@') === -1
      && dominio.search('@') === -1 && usuario.search(' ') === -1 && dominio.search(' ') === -1
      && dominio.search('.') !== -1 && dominio.indexOf('.') >= 1 && dominio.lastIndexOf('.') < dominio.length - 1) {
      return true;
    }

    return false;
  }

  return true;
}