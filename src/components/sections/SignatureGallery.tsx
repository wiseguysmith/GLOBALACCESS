"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";

const photographs = [
  { src: "/images/briggs-fairway.webp", title: "The course", detail: "Briggs Ranch · Hole 2", alt: "A sweeping aerial view of the second hole, fairway, and bunkers at Briggs Ranch" },
  { src: "/images/briggs-veranda.webp", title: "A different pace", detail: "The clubhouse veranda", alt: "Warm evening light across the stone arches and seating on the Briggs Ranch veranda" },
  { src: "/images/briggs-casita.webp", title: "Room to unwind", detail: "The on-site casitas", alt: "A Southwestern-style Briggs Ranch casita overlooking the golf course" },
  { src: "/images/briggs-garden.webp", title: "Beyond the fairway", detail: "The garden at dusk", alt: "String lights illuminate a garden seating area beneath trees at Briggs Ranch" },
];

export function SignatureGallery() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const image = photographs[active];

  function open(index: number, button: HTMLButtonElement) {
    opener.current = button;
    setActive(index);
    dialog.current?.showModal();
  }

  return (
    <>
      <div className="sg-gallery" aria-label="Briggs Ranch photographs">
        {photographs.map((photo, index) => (
          <button key={photo.src} className="sg-gallery-item" onClick={e => open(index, e.currentTarget)} aria-label={`Enlarge ${photo.title}: ${photo.detail}`}>
            <span className="sg-gallery-photo"><Image src={photo.src} alt={photo.alt} fill quality={80} sizes="(min-width: 1000px) 30vw, 78vw"/><Expand size={17} aria-hidden="true"/></span>
            <span className="sg-gallery-caption"><span>{photo.title}</span><small>{photo.detail}</small></span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="sg-lightbox" onClose={() => opener.current?.focus()} onKeyDown={e => {
        if (e.key === "ArrowRight") setActive((active + 1) % photographs.length);
        if (e.key === "ArrowLeft") setActive((active + photographs.length - 1) % photographs.length);
      }} aria-label="Briggs Ranch photo viewer">
        <div className="sg-lightbox-top"><p>{image.title} <span>— {image.detail}</span></p><button onClick={() => dialog.current?.close()} aria-label="Close photo viewer"><X/></button></div>
        <div className="sg-lightbox-image"><Image src={image.src} alt={image.alt} fill quality={80} sizes="90vw"/></div>
        <div className="sg-lightbox-bottom"><button onClick={() => setActive((active + photographs.length - 1) % photographs.length)} aria-label="Previous photograph"><ArrowLeft/></button><p aria-live="polite">{active + 1} / {photographs.length}</p><button onClick={() => setActive((active + 1) % photographs.length)} aria-label="Next photograph"><ArrowRight/></button></div>
      </dialog>
    </>
  );
}
