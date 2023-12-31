import { Group, condensedGroup } from '@/hooks/models';
import { Icons } from '@/models/icons';
import ProjectCard from '@components/common/ProjectCard';
import { Dispatch, SetStateAction } from 'react';
import Tilt from 'react-parallax-tilt';

const ProjectList = ({
  projects,
  showNewProject,
}: {
  projects: condensedGroup[];
  showNewProject: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-row flex-wrap transition-all duration-300 ease-in-out pb-11">
      {projects.map((item, indx) => (
        <ProjectCard key={item.id} {...item} />
      ))}
      <Tilt
        tiltReverse={true}
        glareMaxOpacity={0}
        transitionSpeed={5000}
        className={`relative rounded-lg mr-4 mt-4 bg-[#22222253] cursor-pointer overflow-hidden w-80 h-44 hover:bg-[#2222229e] flex items-center justify-center border-2 border-gray-600`}>
        <div
          onClick={() => showNewProject(true)}
          className="w-full h-full relative z-10 flex flex-col items-center justify-center p-5 cursor-pointer rounded-xl">
          <Icons.Plus className="text-6xl text-gray-300" />
          <h1 className="mt-2">Add Project</h1>
        </div>
      </Tilt>
    </div>
  );
};

export default ProjectList;
