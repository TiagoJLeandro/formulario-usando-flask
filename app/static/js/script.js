import base from "./js-modules/base.js";
import nextPrev from "./js-modules/nextprev.js"

base();
if (window.location.pathname == "/auth/register"){
    nextPrev();
}
