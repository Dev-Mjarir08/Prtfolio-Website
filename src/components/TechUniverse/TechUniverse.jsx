import { skills } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { DigitalTree } from '../Hero/DigitalTree.jsx';

export function TechUniverse() {
  return (
    <section id="tech" className="section-root tech-section">
      <SectionTitle
        eyebrow="Tech Stack Universe"
        title="Tools orbiting one product center."
        copy="The stack moves around the same trunk: useful interfaces, maintainable systems, and reliable deployment."
      />
      <div className="tech-universe">
        <div className="universe-tree">
          <DigitalTree compact />
        </div>
        {[0, 1, 2].map((ring) => (
          <div key={ring} className={`orbit-ring orbit-ring-${ring}`}>
            {skills
              .filter((_, index) => index % 3 === ring)
              .map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <span key={skill.name} className="orbit-planet" style={{ '--i': index, '--count': 3 }}>
                    <Icon />
                    <small>{skill.name}</small>
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </section>
  );
}
