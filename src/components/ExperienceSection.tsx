import { BufferRow } from "./Buffer";
import Winbar from "./Winbar";

const LOG = [
  ["12/2025 – 10/2026", "Flowdia", "Technical Co-Founder"],
  ["06/2025 – 05/2026", "Walla", "Senior Software Engineer"],
  ["06/2024 – 06/2025", "Accredible", "Staff Software Engineer"],
  ["01/2022 – 05/2024", "Accredible", "Technical Team Lead"],
  ["10/2020 – 06/2025", "Bardy", "Technical Co-Founder (side project)"],
  ["02/2020 – 01/2022", "Accredible", "Senior Software Engineer"],
  ["04/2019 – present", "Toptal", "Senior Software Engineer (freelance)"],
  ["01/2019 – 02/2020", "PassApp", "Tech Lead · Cairo, Egypt"],
  ["10/2017 – 01/2019", "Diatomz", "Software Engineer"],
  ["02/2017 – 01/2019", "Verycreatives", "Software Engineer"],
  ["06/2015 – 02/2017", "Appenza Studio", "Software Engineer · Cairo, Egypt"],
];

const TAGS = [
  ["2017", "Benha University, B.Sc. Computer Engineering, Cairo, Egypt"],
  [
    "2014–2015",
    "ACM ICPC: 4 honorable mentions (Arab regional contest 2014 and 2015, Egyptian national contest 2014 and 2015)",
  ],
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="buffer">
      <Winbar name="experience.log" filetype="git log --oneline" />
      <h2 className="sr-only">experience</h2>
      <ul className="list" aria-label="Work history, newest first">
        {LOG.map(([dates, company, role], i) => (
          <BufferRow as="li" key={`${dates}-${company}`} cursor={i === 0} className="gl">
            <span className="gl__star" aria-hidden="true">* </span>
            <span className="gl__date">{dates}</span>
            <span className="gl__co">{company}</span>
            <span className="gl__role"> · {role}</span>
          </BufferRow>
        ))}
      </ul>
      <BufferRow />
      <ul className="list" aria-label="Education and awards">
        {TAGS.map(([when, what]) => (
          <BufferRow as="li" key={when} className="gl">
            <span className="gl__tag">tag {when}</span>
            <span className="gl__role"> {what}</span>
          </BufferRow>
        ))}
      </ul>
    </section>
  );
}
