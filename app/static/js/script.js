import base from "./js-modules/base.js";
import nextPrev from "./js-modules/nextprev.js"
import cepApi from "./js-modules/cepapi.js"

base();
if (window.location.pathname == "/auth/register"){
    nextPrev();
    cepApi();
}
