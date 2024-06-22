const Skills = ({ skills }) => {
    return (
      <div>
        {skills.split(",").map((skill) => (
          <span
            key={skill}
            className="inline-block bg-gray-600 text-white py-1 px-3 mr-2 mb-2 rounded-full "
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };
export default Skills