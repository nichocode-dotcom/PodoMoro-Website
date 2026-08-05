export default function MenuCard({ title, description, price, image, emojiPlaceholder }) {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col border border-border">
      <div className="h-[200px] overflow-hidden bg-bg-light">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-border/30 hover:scale-105 transition-transform duration-300">
            {emojiPlaceholder}
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-text-main font-heading">{title}</h3>
        <p className="text-text-muted mb-4 text-sm">{description}</p>
        <span className="font-heading text-xl text-primary font-bold mt-auto">{price}</span>
      </div>
    </div>
  );
}
