export default function NeedANameHero() {
  return (
    <section className="relative min-h-[760px] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="pointer-events-none text-center text-[clamp(88px,18vw,280px)] font-bold leading-[0.9] text-brand-red">
          I NEED
          <br />A NAME
        </h3>
      </div>

      <img
        src="/collie.webp"
        alt="Collie dog"
        className="absolute bottom-3 left-1/2 z-10 w-[min(471px,72vw)] -translate-x-1/2 object-contain md:h-[671px] md:w-[471px]"
      />
    </section>
  );
}
