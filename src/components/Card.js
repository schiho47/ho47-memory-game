const Card = ({ animal }) => {
  return (
    <div className="card">
      <img className="cardImg" src={animal.path} alt={animal.alt} />
    </div>
  );
};

export default Card;
