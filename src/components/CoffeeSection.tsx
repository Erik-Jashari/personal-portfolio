export default function CoffeeSection() {
  return (
    <section
      id="coffee"
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/coffee-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="font-display text-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-5xl">
          Behind the Bar
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          Hi again! I worked as a barista and waiter for 2 years, i worked mainly part-time but i also worked full-time during the summer and winter holidays. i learned a lot about customer service, teamwork, and time management. it was a great experience that
          helped me develop my communication skills and ability to work under pressure. Lets say that i know my ways of handling different types of customers and situations, and i am confident in my ability to provide excellent service and create a positive experience for customers.
        </p>
      </div>
    </section>
  );
}
