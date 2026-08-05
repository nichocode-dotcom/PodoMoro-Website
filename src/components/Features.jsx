import { Utensils, Clock, Star } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-text-main font-heading">50+ Menu</h3>
          <p className="text-sm text-text-muted m-0">
            Mulai dari hidangan klasik favorit hingga kreasi khas kami yang unik, jelajahi beragam menu yang dirancang untuk memuaskan setiap selera.
          </p>
        </div>

        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[#f2a900]/10 text-secondary">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-text-main font-heading">Buka Setiap Hari</h3>
          <p className="text-sm text-text-muted m-0">
            Buka setiap hari 24 Jam Non-Stop. Nikmati hidangan hangat kapan saja Anda inginkan.
          </p>
        </div>

        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary">
            <Star className="w-6 h-6 fill-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-text-main font-heading">Rating 5.0</h3>
          <p className="text-sm text-text-muted m-0">
            Disukai oleh pelanggan kami karena rasa yang luar biasa, lingkungan yang bersih, dan pelayanan yang luar biasa.
          </p>
        </div>

      </div>
    </section>
  );
}
