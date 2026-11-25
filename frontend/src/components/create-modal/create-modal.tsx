interface InputProps{
    label: string,
    value: string | number,
    updateValue(value: string | number): void
}
const Input = ({label, value, updateValue}: InputProps) =>{
    return (
        <>
        <label>{label}</label>
        <input value={value} onChange={ e => updateValue(e.target.value)}></input>
        </>
    )
}
export function CreateModal(){
    return(
        <div className="modal">
            <h2>Cadastre um novo item no Cardapio</h2>
            <form action=""
            className="input-container"></form>
        </div>
    )
}