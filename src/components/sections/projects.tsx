import * as React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Section from '../content/section'
import data from '../../static/data/projects.json'

const ProjectsSection: React.FC = () => (
  <Section title="Projects">
    {data.map((project, index) => {
      return (
        <div className="projects-block" key={index}>
          <h4 className="title">{project.title}</h4>
          <p className="description">{project.description}</p>
          <div className="links">
            <OutboundLink href={project.projectUrl} rel="noopener noreferrer" target="_blank" className="url">
              Github
            </OutboundLink>
            {project.demoUrl && (
              <OutboundLink href={project.demoUrl} rel="noopener noreferrer" target="_blank" className="url">
                Demo
              </OutboundLink>
            )}
          </div>
        </div>
      )
    })}
  </Section>
)

export default ProjectsSection
