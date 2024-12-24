

import ReactStars from "react-rating-stars-component";
import ProfileImg from "../../../images/profo.png";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };

    return (
        <div className="ReviewCard">
            <img src={ProfileImg} alt="User" />
            
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
        
    );
};
ReviewCard.propTypes

export default ReviewCard;
