import FoodCard from "./FoodCard";

function CategorySection({ title, foods }) {
  // 3D TILT HANDLERS (for hover animation)
  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateY =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
    const rotateX =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleTiltLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food, index) => (
          <div
            key={food.id}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            style={{
              transition: "transform 0.15s ease-out",
              animation: `card-rise-3d 0.6s ease-out ${index * 0.07}s both`,
              transformStyle: "preserve-3d",
            }}
          >
            <FoodCard food={food} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes card-rise-3d {
          from {
            opacity: 0;
            transform: perspective(900px) rotateX(-25deg) translateY(40px) scale3d(0.92, 0.92, 0.92);
          }
          to {
            opacity: 1;
            transform: perspective(900px) rotateX(0deg) translateY(0) scale3d(1, 1, 1);
          }
        }
      `}</style>
    </section>
  );
}

export default CategorySection;
