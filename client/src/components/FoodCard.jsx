import StatusBadge from "./StatusBadge";

function FoodCard({ food }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{food.name}</h3>

        <p className="text-yellow-400 font-bold mt-2">{food.price} ETB</p>

        <div className="mt-3">
          <StatusBadge status={food.status} />
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
