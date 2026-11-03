import type { ReactNode, SVGProps } from "react";

export type ProgramIconName = "learning" | "skills" | "enterprise" | "livelihoods";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProgramIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: ProgramIconName }) {
  const paths: Record<ProgramIconName, ReactNode> = {
    learning: <><path d="M3.5 5.5c2.3-1 4.5-.6 6.5 1v10c-2-1.6-4.2-2-6.5-1v-10Zm13 0c-2.3-1-4.5-.6-6.5 1v10c2-1.6 4.2-2 6.5-1v-10Z" /><path d="M6 8.2c1-.3 2-.2 3 .3m5-0.3c-1-.3-2-.2-3 .3" /></>,
    skills: <><path d="M10 17.5v-6" /><path d="M10 12c-4.2 0-6.5-2.4-6.5-6.5C7.6 5.5 10 7.8 10 12Zm0-1c0-3.8 2.2-6 6.5-6 .1 4.1-2.1 6.3-6.5 6Z" /><path d="M6.5 17.5h7" /></>,
    enterprise: <><path d="M10 3.2 11.8 7l4.2.5-3.1 2.9.8 4.2-3.7-2-3.7 2 .8-4.2L4 7.5 8.2 7 10 3.2Z" /><path d="M6.5 16.7h7" /></>,
    livelihoods: <><path d="M10 17.5V9" /><path d="M10 11c-4.5 0-6.8-2.1-6.8-6.3C7.5 4.7 10 6.8 10 11Zm0-2c0-4 2.3-6.3 6.8-6.3.1 4.2-2.2 6.3-6.8 6.3Z" /><path d="M5.5 17.5h9" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[name]}
    </svg>
  );
}
