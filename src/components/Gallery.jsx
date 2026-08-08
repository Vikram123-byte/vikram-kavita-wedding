import { Reveal } from './Reveal'
import { Ornament } from './Decor'
import { wedding } from '../data/wedding'

export default function Gallery() {
  return (
    <section id="gallery" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Darshan</p>
          <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">A glimpse of shubh</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {wedding.gallery.map((frame, i) => (
            <Reveal key={frame.src} delay={i * 0.06}>
              <figure className="group relative aspect-[3/4] overflow-hidden border border-gold/35">
                <img
                  src={frame.src}
                  alt={frame.caption}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: frame.position || 'center 20%' }}
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/90 to-transparent px-3 pb-3 pt-10 text-center text-[10px] uppercase tracking-[0.18em] text-ivory">
                  {frame.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
