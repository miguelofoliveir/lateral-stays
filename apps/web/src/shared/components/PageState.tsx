interface PageStateProps {
  title: string;
  description: string;
}

export const PageState = ({ title, description }: PageStateProps) => (
  <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
    <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
  </section>
);
