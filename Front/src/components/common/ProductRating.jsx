const ProductRating = ({ ratings }) => {

    const calculateAverageRating = () => {

        const totalRatings = ratings.length;
        const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = (sumRatings / totalRatings).toFixed(1);

        return { averageRating, totalRatings };

    };

    const renderStarRating = (averageRating) => {

        const fullStars = Math.floor(averageRating);
        const halfStars = Math.ceil(averageRating - fullStars);
        const emptyStars = 5 - fullStars - halfStars;

        const stars = [];


        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-star-${i}`}>&#9733;</span>);
        }

        for (let i = 0; i < halfStars; i++) {
            stars.push(<span key={`half-star-${i}`}>&#9734;</span>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-star-${i}`}>&#9734;</span>);
        }

        return stars;
    };

    const { averageRating, totalRatings } = calculateAverageRating();
    const starRating = renderStarRating(averageRating);

    return (
        <div>
            <div>Puntuación: {averageRating}</div>
            <span>{starRating}</span>
            <span>({totalRatings}calificaciones)</span>
        </div>
    );
}

export default ProductRating