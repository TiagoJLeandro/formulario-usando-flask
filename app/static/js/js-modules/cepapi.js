export default function cepApi(){

    let removerMsgDeError = function(e){
        if (e.nextElementSibling && e.nextElementSibling.classList.contains("error_form")){
            let $next = e.nextElementSibling;
            $next.parentNode.removeChild($next);
        }
    }

    let pegarEndereco = function() {
        let numero = $cep.value;
        fetch(`https://viacep.com.br/ws/${numero}/json/`)
        .then((response) => {return response.json()})
        .then((json) => {
            removerMsgDeError($cep);
            let {logradouro, bairro, localidade, uf, erro} = json;
            if (erro == true) {
                $cep.classList.add("invalid");
                $cep.classList.remove("invalid");
                $rua.value = "";
                $bairro.value = "";
                $cidade.value = "";
                $uf.value = "";
                let text = "Cep inválido.";
                let btnFechar = "<button class='close'>x</button>";
                $cep.insertAdjacentHTML("afterend", `<span class='error_form'>${text} ${btnFechar}</span>`)
                return
            }
            $cep.classList.remove("invalid");
            $rua.value = logradouro;
            $bairro.value = bairro;
            $cidade.value = localidade;
            $uf.value = uf;
        })
    }

    let $cep = document.forms.formRegister.cep;
    let $rua = document.forms.formRegister.rua;
    let $bairro = document.forms.formRegister.bairro;
    let $cidade = document.forms.formRegister.cidade;
    let $uf = document.forms.formRegister.uf;
    $cep.addEventListener("change", pegarEndereco);
    $cep.addEventListener("input", (e) => {
        return e.target.value = e.target.value.replace(/[^0-9]/g, "")
        .replace(/([0-9]{8})(.*)/, "$1")
    }
    )
}