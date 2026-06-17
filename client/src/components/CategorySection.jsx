import FoodCard from "./FoodCard";

function CategorySection({ title, foods }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
