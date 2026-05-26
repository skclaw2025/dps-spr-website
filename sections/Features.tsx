const features = [
  "Smart Classrooms",
  "Experienced Faculty",
  "Technology Enabled Campus",
  "Sports Excellence",
  "Safe Environment",
  "Holistic Development"
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-2 transition"
            >
              <h3 className="text-2xl font-bold">
                {item}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}