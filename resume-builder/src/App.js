import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    linkedin: '',
    summary: '',
    education: [{ institute: '', year: '', degree: '', percentage: '' }],
    experience: [{ company: '', year: '', designation: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
    certificates: [{ name: '', year: '' }],
    currentSkill: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, section) => {
    const { name, value } = e.target;
    const updatedSection = [...formData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    setFormData(prev => ({ ...prev, [section]: updatedSection }));
  };

  const addSection = (section) => {
    let newItem = {};
    if (section === 'education') newItem = { institute: '', year: '', degree: '', percentage: '' };
    else if (section === 'experience') newItem = { company: '', year: '', designation: '' };
    else if (section === 'projects') newItem = { title: '', description: '' };
    else if (section === 'certificates') newItem = { name: '', year: '' };
    
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeSection = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [section]: updatedSection }));
  };

  const handleSkillChange = (e) => {
    setFormData(prev => ({ ...prev, currentSkill: e.target.value }));
  };

  const addSkill = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && formData.currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: ''
      }));
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const resumeRef = useRef();

  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1>Resume Builder</h1>
        
        <div className="form-section">
          <h2>Personal Information</h2>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>
          <input type="url" name="github" placeholder="GitHub Profile URL" value={formData.github} onChange={handleChange} />
          <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" value={formData.linkedin} onChange={handleChange} />
          <textarea name="summary" placeholder="Professional Summary" value={formData.summary} onChange={handleChange}></textarea>
        </div>

        <div className="form-section">
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <input type="text" name="institute" placeholder="Institute" value={edu.institute} 
                onChange={(e) => handleArrayChange(e, index, 'education')} />
              <input type="text" name="year" placeholder="Year" value={edu.year} 
                onChange={(e) => handleArrayChange(e, index, 'education')} />
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} 
                onChange={(e) => handleArrayChange(e, index, 'education')} />
              <input type="text" name="percentage" placeholder="Percentage/CGPA" value={edu.percentage} 
                onChange={(e) => handleArrayChange(e, index, 'education')} />
              <button onClick={() => removeSection('education', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addSection('education')}>Add Education</button>
        </div>

        <div className="form-section">
          <h2>Work Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <input type="text" name="company" placeholder="Company" value={exp.company} 
                onChange={(e) => handleArrayChange(e, index, 'experience')} />
              <input type="text" name="year" placeholder="Year" value={exp.year} 
                onChange={(e) => handleArrayChange(e, index, 'experience')} />
              <input type="text" name="designation" placeholder="Designation" value={exp.designation} 
                onChange={(e) => handleArrayChange(e, index, 'experience')} />
              <button onClick={() => removeSection('experience', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addSection('experience')}>Add Experience</button>
        </div>

        <div className="form-section">
          <h2>Skills</h2>
          <div className="skill-input-container">
            <input 
              type="text" 
              name="currentSkill"
              value={formData.currentSkill}
              placeholder="Add skill and press Enter" 
              onChange={handleSkillChange}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
            />
            <button onClick={addSkill}>Add</button>
          </div>
          <div className="skills-container">
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <span onClick={() => removeSkill(index)}>×</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <input type="text" name="title" placeholder="Project Title" value={project.title} 
                onChange={(e) => handleArrayChange(e, index, 'projects')} />
              <textarea name="description" placeholder="Project Description" value={project.description} 
                onChange={(e) => handleArrayChange(e, index, 'projects')}></textarea>
              <button onClick={() => removeSection('projects', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addSection('projects')}>Add Project</button>
        </div>

        <div className="form-section">
          <h2>Certificates</h2>
          {formData.certificates.map((cert, index) => (
            <div key={index} className="certificate-item">
              <input type="text" name="name" placeholder="Certificate Name" value={cert.name} 
                onChange={(e) => handleArrayChange(e, index, 'certificates')} />
              <input type="text" name="year" placeholder="Year" value={cert.year} 
                onChange={(e) => handleArrayChange(e, index, 'certificates')} />
              <button onClick={() => removeSection('certificates', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addSection('certificates')}>Add Certificate</button>
        </div>
      </div>

      <div className="resume-preview">
        <button className="download-btn" onClick={downloadResume}>
          Download PDF
        </button>
        <div className="resume" ref={resumeRef}>
          <div className="header">
            <h1>{formData.name || 'Your Name'}</h1>
            <p className="designation">Software Developer</p>
            <div className="contact-info">
              <div className="contact-details">
                <p>Email: {formData.email || 'email@example.com'}</p>
                <p>Phone: {formData.phone || '+91 9876543210'}</p>
              </div>
              <div className="contact-details">
                <p>Address: {formData.address || 'Your Address'}</p>
              </div>
              <div className="contact-details">
                <p>GitHub: {formData.github || 'https://github.com/your-username'}</p>
                <p>LinkedIn: {formData.linkedin || 'linkedin.com/in/yourprofile'}</p>
              </div>
            </div>
          </div>
          <div className="content-row">
            <div className="left-column">
              <div className="section">
                <h2>SUMMARY</h2>
                <p>{formData.summary || 'Results-driven software developer with experience in web development. Proficient in JavaScript, React, and Node.js. Strong problem-solving skills and a passion for creating efficient and scalable applications.'}</p>
              </div>

              <div className="section">
                <h2>EDUCATION</h2>
                {formData.education.map((edu, index) => (
                  edu.institute && (
                    <div key={index} className="education-item">
                      <div className="left">
                        <h3>{edu.institute}</h3>
                        <p>{edu.degree}</p>
                      </div>
                      <div className="right">
                        <p>{edu.year}</p>
                        <p>{edu.percentage}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {formData.experience.some(exp => exp.company) && (
                <div className="section">
                  <h2>WORK EXPERIENCE</h2>
                  {formData.experience.map((exp, index) => (
                    exp.company && (
                      <div key={index} className="experience-item">
                        <div className="left">
                          <h3>{exp.company}</h3>
                          <p>{exp.designation}</p>
                        </div>
                        <div className="right">
                          <p>{exp.year}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {formData.certificates.some(cert => cert.name) && (
                <div className="section">
                  <h2>CERTIFICATION</h2>
                  {formData.certificates.map((cert, index) => (
                    cert.name && (
                      <div key={index} className="certificate-item">
                        <h3>{cert.name}</h3>
                        <p>{cert.year}</p>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            <div className="right-column">
              <div className="section achievements-section">
                <h2>KEY ACHIEVEMENTS</h2>
                <div className="achievement-item">
                  <h3>State-Level Volleyball Championship Representation</h3>
                  <p>Achieved Zonal-Level Volleyball Champion title representing the college.</p>
                </div>
                <div className="achievement-item">
                  <h3>State-Level Football Tournament Representation</h3>
                  <p>Represented school at State-Level Football Tournament during intermediate.</p>
                </div>
              </div>

              <div className="section">
                <h2>SKILLS</h2>
                <div className="skills">
                  <div className="skill-category">
                    <h3>Programming Languages</h3>
                    <div className="skills-list">
                      <span className="skill">JavaScript</span>
                      <span className="skill">Python</span>
                      <span className="skill">Java</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3>Web Technologies</h3>
                    <div className="skills-list">
                      <span className="skill">HTML5</span>
                      <span className="skill">CSS3</span>
                      <span className="skill">React</span>
                      <span className="skill">Node.js</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3>Tools & Technologies</h3>
                    <div className="skills-list">
                      <span className="skill">Git</span>
                      <span className="skill">Docker</span>
                      <span className="skill">AWS</span>
                    </div>
                  </div>
                </div>
                {formData.skills.length > 0 && (
                  <div className="skills">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="skill">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              {formData.projects.some(proj => proj.title) && (
                <div className="section">
                  <h2>PROJECTS</h2>
                  {formData.projects.map((proj, index) => (
                    proj.title && (
                      <div key={index} className="project-item">
                        <h3>{proj.title}</h3>
                        <p>{proj.description}</p>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
