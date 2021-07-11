export default function base() {
    window.addEventListener("click", (e) => {
        let targetClass = e.target.classList
        if(targetClass.contains("error__text")){
            const divErrorMsg = document.querySelector(".error")
            const errorMsg = document.querySelector(".error__text")
            errorMsg.classList.add("remove");
            setTimeout(() => {
                const parent = divErrorMsg.parentNode
                parent.removeChild(divErrorMsg)
            }, 400)
            
        }
    })
}