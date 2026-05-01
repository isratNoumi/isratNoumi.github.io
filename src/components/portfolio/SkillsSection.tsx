interface SkillItem {
  name: string
  proficiency: number
  group: string
}

function SkillsSection() {
  const skillsData: SkillItem[] = [
    { name: 'React', proficiency: 92, group: 'Frontend' },
    { name: 'Next.js', proficiency: 90, group: 'Frontend' },
    { name: 'TypeScript', proficiency: 88, group: 'Frontend' },
    { name: 'JavaScript', proficiency: 90, group: 'Frontend' },
    { name: 'Tailwind CSS', proficiency: 85, group: 'Frontend' },
    { name: 'Golang', proficiency: 95, group: 'Backend' },
    { name: 'Python', proficiency: 85, group: 'Backend' },
    { name: 'REST APIs', proficiency: 92, group: 'Backend' },
    { name: 'GraphQL', proficiency: 85, group: 'Backend' },
    { name: 'Supabase', proficiency: 88, group: 'Database' },
    { name: 'PostgreSQL', proficiency: 90, group: 'Database' },
    { name: 'MySQL', proficiency: 88, group: 'Database' },
    { name: 'Redis', proficiency: 85, group: 'Database' },
    { name: 'Git/GitHub', proficiency: 92, group: 'DevOps' },
    { name: 'Docker', proficiency: 85, group: 'DevOps' },
    { name: 'Azure', proficiency: 82, group: 'DevOps' },
    { name: 'CI/CD', proficiency: 75, group: 'DevOps' },
    { name: 'LLM Integration', proficiency: 88, group: 'AI/ML' },
    { name: 'RAG Systems', proficiency: 85, group: 'AI/ML' },
    { name: 'GenAI', proficiency: 87, group: 'AI/ML' },
    { name: 'NLP', proficiency: 82, group: 'AI/ML' },
    { name: 'Deep Learning', proficiency: 75, group: 'AI/ML' }
  ]

  const groups = ['Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML']

  const getGroupColor = (group: string) => {
    const colors: { [key: string]: string } = {
      'Frontend': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'Backend': 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
      'Database': 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)',
      'DevOps': 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
      'AI/ML': 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)'
    }
    return colors[group] || 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
  }

  return (
    <section className="skills-section" id="skills">
      <div className="section-wrapper">
        <h2 className="section-heading">Skills & Technologies</h2>
        <p className="section-subtitle">My technical expertise across the full stack and AI ecosystem</p>
        <div className="skills-grid">
          {groups.map(group => (
            <div key={group} className="skill-group" style={{ '--group-gradient': getGroupColor(group) } as React.CSSProperties}>
              <div className="group-header">
                <h3 className="group-title">{group}</h3>
                <div className="skill-count">{skillsData.filter(s => s.group === group).length} skills</div>
              </div>
              <div className="skills-list">
                {skillsData
                  .filter(skill => skill.group === group)
                  .map(skill => (
                    <div key={skill.name} className="skill-badge">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
