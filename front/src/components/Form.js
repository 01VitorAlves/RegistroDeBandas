import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({getBandas, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.album.value = onEdit.album;
            user.nota.value = onEdit.nota;
            user.data_conheceu.value = onEdit.data_conheceu;
        }
    }, [onEdit]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome.value ||
            !user.album.value ||
            !user.nota.value ||
            !user.data_conheceu.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.idBandas, {
                    nome: user.nome.value,
                    album: user.album.value,
                    nota: user.nota.value,
                    data_conheceu: user.data_conheceu.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }else {
            await axios
                .post("http://localhost:8800", {
                    nome: user.nome.value,
                    album: user.album.value,
                    nota: user.nota.value,
                    data_conheceu: user.data_conheceu.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }

        user.nome.value = "";
        user.album.value = "";
        user.nota.value = "";
        user.data_conheceu.value = "";

        setOnEdit(null);
        getBandas();
        
    };

    return (
        <FormContainer ref = {ref} onSubmit={handleSubmit} >
            <InputArea>
                <Label>Nome da Banda</Label>
                <Input name = "nome" />
            </InputArea>
            <InputArea>
                <Label>Album favorito</Label>
                <Input name = "album" />
            </InputArea>
            <InputArea>
                <Label>Nota da Banda</Label>
                <Input name = "nota" />
            </InputArea>
            <InputArea>
                <Label>Data que conheceu a banda</Label>
                <Input name = "data_conheceu" type = "date" />
            </InputArea>

            <Button type = "submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;