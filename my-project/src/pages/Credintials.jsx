
import '../style.css';

function Credentials() {
    return (
        <div className="container">
            <h1>Credential</h1>
            <div className="button-container">
                <button className="button" id="button1">
                    <img src="/image3.png" alt="Image 1" />
                    <span>Course completion certificate</span>
                </button>
                <button className="button" id="button2">
                    <img src="/image.png" alt="Image 2" />
                    <span>Certificate of appreciation</span>
                </button>
                <button className="button" id="button3">
                    <img src="/image2.png" alt="Image 3" />
                    <span>Volunteer work certificate</span>
                </button>
            </div>
            <a href="#" id="add-credential-link">Add New Credential</a>

        </div>
    );
}

export default Credentials;



