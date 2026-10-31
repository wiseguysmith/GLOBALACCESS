import { Plus } from "lucide-react";
import { JsonLd } from "@/lib/jsonld";

export interface FaqItem {
  q: string;
  a: string;
}

/** Native disclosure-based FAQ — accessible and JavaScript-free. */
export function Faq({ items, withSchema = true }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="border-t border-navy/15">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-navy/15">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus
                aria-hidden="true"
                className="size-5 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-45"
                strokeWidth={1.5}
              />
            </summary>
            <p className="max-w-3xl pb-7 leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
      {withSchema ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      ) : null}
    </>
  );
}
