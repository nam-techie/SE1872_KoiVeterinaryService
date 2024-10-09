import "../styles/ContactButton.css"
import ZaloIcon from "../assets/images/zalo_icon.jpg"

function  ContactButton(){
    return (
        <div className="button-container">
            <a href="Https://zalo.me/0816518989" className="zalo-button" target="_blank">
                <img
                    src={ZaloIcon}
                    alt="Zalo"
                    className="icon"
                />
            </a>
        </div>
    );
}
export default  ContactButton