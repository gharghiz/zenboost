import React from 'react';
import ProjectCard from '../src/components/ProjectCard';
import { Project } from '../src/types';

const sampleProject: Project = {
  id: 1,
  name: 'ZenBoost Sample Project',
  goalAmount: '10',
  currentAmount: '3',
  deadline: new Date(),
};

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ZenBoost Platform</h1>
      <ProjectCard project={sampleProject} />
    </div>
  );
}