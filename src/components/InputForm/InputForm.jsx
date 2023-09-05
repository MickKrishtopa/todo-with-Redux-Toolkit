import "./InputForm.css";

export default function InputForm({ text, handleChangeInput, handleSubmit }) {
    return (
        <form className='input-form'>
            <input
                className='input-form__input'
                value={text}
                onChange={(e) => handleChangeInput(e.target.value)}
            />
            <button
                className='input-form__button'
                type='button'
                onClick={() => handleSubmit(text)}>
                Add todo
            </button>
        </form>
    );
}
