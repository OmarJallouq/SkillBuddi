import React from "react";
import "../styles/SkillCard.css";



const SkillTag = ({ index, skill, handleRemoveSkill }) => {


    return (
        <li className="tag" key={index}>
        <span className="skill-name">{skill}</span>
        <button className="x-button"
          onClick={() => handleRemoveSkill(skill)}
        >
          {"\u00D7"}
        </button>
      </li>
    );
  };
  
  export default SkillTag;

  /*<li key={index} className="skill-item">
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="remove-skill"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    const newSkill = prompt("Edit skill:", skill); // Simple prompt to edit the skill
                    if (newSkill) {
                      handleEditSkill(skill, newSkill);
                    }
                  }}
                  className="edit-skill"
                >
                  Edit
                </button>
              </li>*/