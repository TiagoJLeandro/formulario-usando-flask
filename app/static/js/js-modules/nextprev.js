export default function nextPrev(){

    let removerMsgDeError = function(e){
        if (e.nextElementSibling && e.nextElementSibling.classList.contains("error_form")){
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

    let validarEmail = function(){
        let $email = document.formRegister.email;
        let emailValidado = $email.value
        .match(/^["a-z0-9_]+[.+-]?(?:[a-z]+)?[0-9a-z"_]@[a-z0-9\[](?:[a-z0-9-]+\.[a-z0-9]+\]?)+$/i);
        if (!emailValidado){
            $email.classList.add("invalid")
            removerMsgDeError($email);
            let text = "Digite um email válido.<br>Exemplo: exemplo@gmail.com";
            let btnFechar = "<button class='close'>x</button>";
            $email.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`)
            return 1
        }
        else {
            $email.classList.remove("invalid")
            removerMsgDeError($email);
        }
    }

    let validarName = function(){
        let $name = document.formRegister.name;
        if ($name.value.length > 128 || $name.value.length < 4){
            $name.classList.add("invalid");
            removerMsgDeError($name);
            let text = "O nome precisa ter no mínimo 04, e no máximo 128 caractéres.";
            let btnFechar = "<button class='close'>x</button>";
            $name.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`)
            return 1
        }
        else {
            $name.classList.remove("invalid");
            removerMsgDeError($name);
        }
    }

    let validarSenhas = function() {

        if ($senha1.value !== $senha2.value || $senha1.value.trim().length == 0) {
            $senha2.classList.add("invalid");
            removerMsgDeError($senha2);
            let text = "As senhas precisam estar identicas e também não podem estar vazias.";
            let btnFechar = "<button class='close'>x</button>";
            $senha2.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`)
            return 1
        }
        else {
            $senha2.classList.remove("invalid");
            removerMsgDeError($senha2);
        }
    }

    let validarDadosPessoais = function(){
        let validacoes = [validarName(), validarSenhas(), validarEmail()]
        if ( validacoes[0] || validacoes[1] || validacoes[2]  ){
            removerMsgDeError($btnNext);
            let text = "Dados inválidos. Por favor, corrija-os antes de prosseguir.";
            let btnFechar = "<button class='close'>x</button>";
            $btnNext.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`);
            return
        }
    }

    let alterTable = function(e){

        if (e.target.id == "next"){
            e.preventDefault();
            if (!validarDadosPessoais()) { return};
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
    const $email = document.forms.formRegister.email;
    const $senha1 = document.forms.formRegister.password;
    const $senha2 = document.forms.formRegister.password2;
    const $btnNext = document.forms.formRegister.next;
    $name.addEventListener("change", validarName);
    $email.addEventListener("change", validarEmail);
    $senha2.addEventListener("change", validarSenhas);
}