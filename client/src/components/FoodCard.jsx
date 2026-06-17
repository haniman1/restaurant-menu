import StatusBadge from "./StatusBadge";

function FoodCard({ food }) {
  return (
    <div className="food-card bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-500/20 transition-all duration-300">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-3">
        {/* Name + Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold truncate">{food.name}</h3>

          <span className="text-yellow-400 font-bold text-sm ml-2">
            {food.price} ETB
          </span>
        </div>

        {/* Status */}
        <div className="mt-2">
          <StatusBadge status={food.status} />
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
