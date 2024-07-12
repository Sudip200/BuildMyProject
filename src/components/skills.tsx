const Skills = ({ skills }) => {
    return (
      <div>
        {skills.split(",").map((skill) => (
          <span
            key={skill}
            className="inline-block bg-violet-900 text-[min(2vw,.8rem)] py-1 px-3 mr-2 mb-2 rounded-full "
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };
export default Skills