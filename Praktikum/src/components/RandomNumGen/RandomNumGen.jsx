import Button from "../../elements/Button/Button";
import { useState } from "react";

const RandomNumGen = () => {

    const [randomNum, setRandomNum] = useState(0)

    return (
        <>
            <div className="container d-flex flex-column mt-5">
                <div className="d-inline-flex mx-auto">
                    <p>Nomor random yang keluar adalah : {randomNum} </p>
                </div>
                <div className="d-inline-flex mx-auto">
                    <Button
                        className="btn btn-success"
                        label="Generate"
                        onClick={() => setRandomNum(Math.ceil(Math.random() * 100))}
                    />
                </div>
            </div>
        </>
    );
}

export default RandomNumGen