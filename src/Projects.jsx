import { useFetchProjects } from "./fetchProjects";
const Projects = () => {
  const { loading, projects } = useFetchProjects();
  console.log(loading, projects);
  if (loading) {
    return (
      <section className="projects">
        <h2>Loading, please wait</h2>
      </section>
    );
  }
  return (
    <section className="projects">
      <div className="title">
        <h2>projects</h2>
        <div className="title-underline"></div>
      </div>
      <div className="projects-center">
        {projects &&
          projects.map((project) => {
            const { id, img, url, title } = project;
            return (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noreffer"
                className="project">
                <img src={img} alt={title} className="img" />
                <h3>{title}</h3>
              </a>
            );
          })}
      </div>
    </section>
  );
};

export default Projects;
