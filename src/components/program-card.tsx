import { ArrowIcon, ProgramIcon, type ProgramIconName } from "@/components/icons";

type ProgramCardProps = {
  title: string;
  description: string;
  icon: ProgramIconName;
  number: string;
};

export function ProgramCard({ title, description, icon, number }: ProgramCardProps) {
  return (
    <article className="program-card">
      <div className="program-card__topline">
        <span className={`program-card__icon${icon === "livelihoods" ? " program-card__icon--sage" : ""}`}><ProgramIcon name={icon} /></span>
        <span className="program-card__number">{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="program-card__arrow" aria-hidden="true"><ArrowIcon /></span>
    </article>
  );
}
