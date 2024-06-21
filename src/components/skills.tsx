const Skills = ({ skills }) => {
    return (
      <div>
        {skills.split(",").map((skill) => (
          <span
            key={skill}
            className="bg-violet-900  rounded-xl p-1 text-white ml-3  "
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };
export default Skills