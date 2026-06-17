import Navbar from "../components/Navbar";
import restaurantData from "../datas/restaurantData";

export default function About() {
  const { features, about, contact, social } = restaurantData;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Background Blur */}
        <div className="w-[500px] h-[500px] rounded-full absolute top-20 left-1/2 -translate-x-1/2 blur-[180px] bg-yellow-500/10"></div>

        {/* Header */}
        <div className="text-center pt-16 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
            About Our Restaurant
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{about}</p>
        </div>

        {/* Main Section */}
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <img
            className="w-full max-w-md rounded-2xl shadow-xl object-cover"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant"
          />

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">
              Why Choose Us
            </h2>

            <p className="text-slate-400 mt-4">
              We focus on quality food, great service, and a welcoming
              atmosphere.
            </p>

            <div className="mt-10 space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
                    {f.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{f.title}</h3>
                    <p className="text-slate-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-slate-300">
              <div>
                <p>📍 Address: {contact.address}</p>

                <p className="mt-2">
                  📞 Phone:{" "}
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-yellow-400 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>

              <div>
                <p>
                  📧 Email:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-yellow-400 hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>

                <p className="mt-2">🕒 Open: {contact.openHours.weekdays}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <a href={social.instagram} className="social-btn">
                Instagram
              </a>

              <a href={social.facebook} className="social-btn">
                Facebook
              </a>

              <a href={social.tiktok} className="social-btn">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
