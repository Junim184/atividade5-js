const Mask ={
    cpfCnpj(input){
        let value = input.value;
        value = value.replace(/\D/,"");
        if(value.length > 14){
            value = value.slice(0,-1);
        }

        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        input.value = value;
    },
    cep(input){
        let value = input.value;
        value = value.replace(/\D/,"");

        if(value.length > 8){
            value = value.slice(0,-1)
        }
        value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
        input.value = value;
    },

    //de implementaçao crier a mask de name e numb para o input de nome e telefone 

    Name(input){
        let value = input.value;
        value = value.replace(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
    
    },

    Numb(input){
        let value = input.value;
        value = value.replace(/\D/,"");

        if(value.length > 9){
            value = value.slice(0,-1)
        }
        value = value.replace(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g);
        input.value = value;
    }
}

const Validate = {
    isName(input) {
        Validate.clearErrors(input);
        let value = input.value;
        let error = null;

        const formatName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

        if(!value.match(formatName)){
            error = "nome invalido";
            Validate.displayError(input, error);
            return;
        }
        input.value = value;
    },

    isNumb(input) {
        Validate.clearErrors(input);
        let value = input.value;
        let error = null;

        const cleanValues = value.replace(/\D/g, '');

        if(cleanValues.length != 9){
            error = 'NUMERO incorreto';
            Validate.displayError(input, error);
        }
        input.value = value;
    },
            // aqui acaba o que eu mesmo implementei Francisco raimundo 
    isEmail(input) {
    Validate.clearErrors(input);
    let value = input.value;
    let error = null;

    const formatEmail = /^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,3})/;
    if(!value.match(formatEmail)){
        error = "email invalido";
        Validate.displayError(input,error);
        return;
    }
    input.value = value;

    },

    isCPF_CNPJ(input) {
        Validate.clearErrors(input);
        let value = input.value;
        let error = null;
        const cleanValues = value.replace(/\D/g, '');

        if(cleanValues.length < 14 && cleanValues.length != 14){
            error = "CNPJ incorreto";
        }else if(cleanValues.length < 12 && cleanValues.length != 11){
            error = "CPF incorreto";
        }

        if(error){
            Validate.displayError(input, error);
            return;
        }
        input.value = value;
    },

    isCEP(input){
        Validate.clearErrors(input);
        let value = input.value;
        let error = null;
        const cleanValues = value.replace(/\D/g, '');

        if(cleanValues.length != 8){
            error = 'CEP incorreto';
            Validate.displayError(input, error);
        }
        input.value = value;
    },

    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector('.error')
        if(errorDiv){
            errorDiv.remove()
        }
    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;
        input.parentNode.appendChild(div);
        input.focus();
    }
}