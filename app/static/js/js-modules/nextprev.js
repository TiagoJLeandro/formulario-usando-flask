export default function nextPrev(){

    let removerMsgDeError = function(e){
        if (e.nextElementSibling.classList.contains("error_form")){
            let $next = e.nextElementSibling;
            $next.parentNode.removeChild($next);
        }

    }

    let removerSuaveMsgDeError = function(e){
        if (e.target.classList.contains("close")) {
            e.preventDefault();
            let msgError = e.target.parentNode;
            msgError.classList.add("hidden");
            setTimeout(() => {
                msgError.parentNode.removeChild(msgError);
            }, 350)

        }
    }

    let validarName = function(){
        console.log("aqui");
        let $name = document.formRegister.name;
        if ($name.value.length > 128 || $name.value.length < 4){
            $name.classList.add("invalid");
            removerMsgDeError($name);
            let text = "O nome precisa ter no mínimo 04, e no máximo 128 caractéres."
            let btnFechar = "<button class='close'>x</button>"
            $name.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`)
        }
        else {
            $name.classList.remove("invalid");
            removerMsgDeError($name);
        }
    }

    let validarDadosPessoais = function(){
        validarName();
    }

    let alterTable = function(e){

        if (e.target.id == "next"){
            e.preventDefault();
            let sectionDadosPessoais = document.querySelector(".dados-pessoais");
            let sectionEndereco = document.querySelector(".endereco")
            let abaDadosPessoais = document.querySelectorAll(".aba")[0]
            let abaEndereco = document.querySelectorAll(".aba")[1]
            
            sectionDadosPessoais.classList.toggle("section--active")
            sectionEndereco.classList.toggle("section--active")
            abaDadosPessoais.classList.toggle("active")
            abaDadosPessoais.classList.toggle("validated")
            abaEndereco.classList.toggle("active")
        }

        if (e.target.id == "prev"){
            e.preventDefault();
            let sectionDadosPessoais = document.querySelector(".dados-pessoais");
            let sectionEndereco = document.querySelector(".endereco");
            let abaDadosPessoais = document.querySelectorAll(".aba")[0];
            let abaEndereco = document.querySelectorAll(".aba")[1];
            
            sectionDadosPessoais.classList.toggle("section--active")
            sectionEndereco.classList.toggle("section--active")
            abaDadosPessoais.classList.toggle("active")
            abaDadosPessoais.classList.toggle("validated")
            abaEndereco.classList.toggle("active")
        }

    }

    
    window.addEventListener("click", (e) => {removerSuaveMsgDeError(e);})
    window.addEventListener("touchend", (e) => {removerSuaveMsgDeError(e);})
    window.addEventListener("click", (e) => {alterTable(e);})
    window.addEventListener("touchend", (e) => {alterTable(e);})
    const $name = document.forms.formRegister.name;
    $name.addEventListener("change", validarName);

}