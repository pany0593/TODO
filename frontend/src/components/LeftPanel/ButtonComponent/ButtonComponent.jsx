import "./ButtonComponent.css"

function ButtonComponent({ onClick }) {
    return (
        <div>
            <button className="left-button" onClick={onClick}>Add Memo</button>
        </div>
    );
}

export default ButtonComponent;
