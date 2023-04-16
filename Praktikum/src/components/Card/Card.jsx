import { Link } from "react-router-dom"

const Card = ({ card }) => {

    // console.log(card)

    return (
        <div className="card m-5" style={{ width: "18rem" }}>
            <img src={card.image}
                style={{ width: "17rem", height: "10rem" }}
                className="card-img-top"
                alt="image.jpg" />
            <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">
                    {card.description}
                </p>
                <Link
                    to={`/detailproduct/${card.id}`}
                    className="btn btn-primary">
                    Detail
                </Link>
            </div>
        </div>
    );
}

export default Card