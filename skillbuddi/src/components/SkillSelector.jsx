// src/components/SkillSelector.jsx
import React, { useState } from "react";

const SkillSelector = ({ skills, setSkills }) => {
  const [customSkill, setCustomSkill] = useState("");
  const predefinedSkills = ["JavaScript", "React", "Node.js", "Python", "SQL"];

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill)) {
      addSkill(customSkill);
      setCustomSkill("");
    }
  };

  return (
    <div>
      <h3>Skills</h3>
      <div>
        {predefinedSkills.map((skill) => (
          <button key={skill} onClick={() => addSkill(skill)}>
            {skill}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add a custom skill"
        value={customSkill}
        onChange={(e) => setCustomSkill(e.target.value)}
      />
      <button onClick={handleCustomSkill}>Add Skill</button>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillSelector;
