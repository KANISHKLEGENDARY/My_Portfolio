import { useState, useRef, useEffect, useCallback } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "Python", level: 90, cat: "Languages" },
  { name: "Java", level: 85, cat: "Languages" },
  { name: "C", level: 80, cat: "Languages" },
  { name: "C++", level: 78, cat: "Languages" },
  { name: "JavaScript", level: 88, cat: "Languages" },
  { name: "SQL", level: 82, cat: "Languages" },
  { name: "HTML", level: 92, cat: "Web Development" },
  { name: "CSS", level: 88, cat: "Web Development" },
  { name: "Node.js", level: 85, cat: "Web Development" },
  { name: "Express.js", level: 82, cat: "Web Development" },
  { name: "React.js", level: 90, cat: "Web Development" },
  { name: "Regression", level: 85, cat: "Machine Learning" },
  { name: "Classification", level: 88, cat: "Machine Learning" },
  { name: "Feature Engineering", level: 82, cat: "Machine Learning" },
  { name: "Model Evaluation", level: 86, cat: "Machine Learning" },
  { name: "Pandas", level: 90, cat: "ML Libraries" },
  { name: "NumPy", level: 88, cat: "ML Libraries" },
  { name: "Scikit-Learn", level: 85, cat: "ML Libraries" },
  { name: "Matplotlib", level: 82, cat: "ML Libraries" },
  { name: "Seaborn", level: 80, cat: "ML Libraries" },
  { name: "Jupyter Notebook", level: 90, cat: "Tools" },
  { name: "Git", level: 88, cat: "Tools" },
  { name: "GitHub", level: 90, cat: "Tools" },
  { name: "MySQL", level: 84, cat: "Database" },
  { name: "MongoDB", level: 82, cat: "Database" },
];

const PROJECTS = [
  {
    title: "PassOP — A Secure Password Manager",
    description: [
      "Full-stack password manager with secure credential storage",
      "Real-time UI updates for adding, editing, and deleting passwords",
      "RESTful APIs with MongoDB integration for data persistence",
      "UUID-based system for reliable credential management"
    ],
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "REST APIs", "UUID"],
    featured: true,
    color: "#457b9d",
    emoji: "🔐",
    github: "#",
    live: "#",
  },
  {
    title: "Bharatiya Antariksha Hackathon — Air Pollution Prediction",
    description: [
      "ML pipeline using Random Forest for PM2.5/PM10 prediction",
      "Integrated NASA MERRA-2, ISRO INSAT, and CPCB datasets",
      "Comprehensive preprocessing and feature engineering",
      "Accurate air pollution forecasting for Faridabad region"
    ],
    tech: ["Python", "Random Forest", "Pandas", "Scikit-learn", "NASA MERRA-2", "ISRO INSAT"],
    featured: false,
    color: "#2d6a4f",
    emoji: "🌍",
    github: "#",
    live: "#",
  },
  {
    title: "Air Pollution Forecasting Dashboard (Ongoing R&D Project)",
    description: [
      "Extended hackathon work with Gradient Boosting Regression",
      "Achieved 96% prediction accuracy through optimization",
      "Interactive dashboard for pollutant trend visualization",
      "Carbon credit estimation for environmental impact assessment"
    ],
    tech: ["Python", "Gradient Boosting", "Dashboard", "Data Visualization", "Carbon Credits"],
    featured: false,
    color: "#7209b7",
    emoji: "📊",
    github: "#",
    live: "#",
  },
  {
    title: "Autonomous AI Workflow Engine (Ongoing Capstone Project)",
    description: [
      "Building autonomous AI agent for goal-to-workflow conversion",
      "Architecture combining Open WebUI, LangChain, and Gemini 1.5 Pro",
      "Multimodal perception using Qwen3-VL via Ollama integration",
      "Custom Chrome Extension for automated browser interaction",
      "Sandboxed Python execution environment for script and API running"
    ],
    tech: ["Python", "LangChain", "Gemini 1.5 Pro", "Ollama", "Chrome Extension", "Open WebUI"],
    featured: false,
    color: "#e63946",
    emoji: "🤖",
    github: "#",
    live: "#",
  },
];

const SOCIAL = [
  { name: "GitHub", icon: "GH", url: "https://github.com/KANISHKLEGENDARY" },
  { name: "LinkedIn", icon: "in", url: "https://www.linkedin.com/in/kanishk-garg-7b120936b/" },
];



function SkillBar({ name, level, cat, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(level), delay);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  const catColors = {
    Frontend: "#e63946", Backend: "#457b9d", Database: "#2d6a4f",
    Tools: "#f4a261", Languages: "#7209b7",
  };

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontFamily: "'Courier New',monospace", fontSize: 15, color: "#e2e8f0" }}>
          <span style={{ color: catColors[cat] || "#e63946", marginRight: 6 }}>▸</span>{name}
        </span>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "'Courier New',monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          borderRadius: 4,
          background: `linear-gradient(90deg, ${catColors[cat] || "#e63946"}, rgba(255,255,255,0.6))`,
          transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? project.color + "60" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        padding: "1.5rem",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 20px 60px ${project.color}25` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>{project.emoji}</div>

      <h3 style={{
        fontSize: 20, fontWeight: 700, color: "#fff",
        fontFamily: "'Georgia',serif", marginBottom: 10, lineHeight: 1.3,
        textAlign: "left",
      }}>{project.title}</h3>

      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 16, textAlign: "left" }}>
        {Array.isArray(project.description) ? (
          <ul style={{ margin: 0, paddingLeft: 20, textAlign: "left" }}>
            {project.description.map((bullet, index) => (
              <li key={index} style={{ marginBottom: 8, textAlign: "left" }}>{bullet}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, textAlign: "left" }}>{project.description}</p>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, justifyContent: "flex-start" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontSize: 11, padding: "3px 10px",
            background: `${project.color}20`, color: project.color,
            borderRadius: 20, fontFamily: "'Courier New',monospace",
            border: `1px solid ${project.color}40`,
            textAlign: "left",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (section) => {
    setActive(section);
    setMenuOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:kanishk.23@st.niituniversity.com?subject=${subject}&body=${body}`;

    setSent(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      margin: 0,
      padding: 0,
      background: "#080010",
      color: "#e2e8f0",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflowX: "hidden",
      boxSizing: "border-box",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background: #080010; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(69,123,157,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "40%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(114,9,183,0.07) 0%, transparent 70%)" }} />
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(8,0,16,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2.5rem", height: 64, width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          <span style={{ color: "#e63946" }}>&lt;</span>Dev<span style={{ color: "#e63946" }}>/&gt;</span>
        </div>

        {/* Desktop nav — right side */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase",
                color: active === l ? "#e63946" : "rgba(255,255,255,0.5)",
                fontWeight: active === l ? 600 : 400,
                transition: "color 0.2s",
                fontFamily: "'Courier New',monospace",
                padding: "4px 0",
              }}>{l}</button>
            ))}
          </div>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", lineHeight: 1,
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 39,
          background: "rgba(8,0,16,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0.5rem 2rem 1rem",
        }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 15, color: active === l ? "#e63946" : "#e2e8f0",
              padding: "12px 0", fontFamily: "'Courier New',monospace",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, paddingTop: 64, width: "100%" }}>
        <div style={{ textAlign: "center", width: "100%", maxWidth: 860, padding: "0 5%" }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#e63946", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Courier New',monospace" }}>
            Open to Placements & Internships
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.1, fontFamily: "'Georgia',serif", color: "#fff", marginBottom: 24 }}>
            Hi, I'm{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: "#e63946" }}>Kanishk Garg</span>
              <span style={{
                position: "absolute", bottom: -4, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, #e63946, transparent)",
                borderRadius: 2,
              }} />
            </span>
          </h1>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: 40 }}>
            A passionate Computer Science student with an insatiable enthusiasm for learning, eager to tackle real-world challenges through innovative projects and contribute to shaping tomorrow's world with AI and cutting-edge technologies.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{
              padding: "14px 32px", borderRadius: 50,
              background: "#e63946", color: "#fff", border: "none",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 0.5,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 0 30px rgba(230,57,70,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
            >
              View Projects
            </button>
            <button onClick={() => scrollTo("Contact")} style={{
              padding: "14px 32px", borderRadius: 50,
              background: "transparent", color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
            >
              Get in Touch
            </button>
          </div>
          {/* Scroll cue */}
          <div style={{ marginTop: 80, animation: "bounce 2s infinite", color: "rgba(255,255,255,0.2)", fontSize: 20 }}>↓</div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#e63946", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Courier New',monospace" }}>About Me</div>
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, fontFamily: "'Georgia',serif", color: "#fff", marginBottom: 56 }}>
            The story so far.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 56, alignItems: "start" }}>
            {/* Left — avatar centered + bio */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{
                width: 190, height: 190, borderRadius: "50%", marginBottom: 28,
                background: "linear-gradient(135deg, #e63946, #7209b7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 76, flexShrink: 0,
                boxShadow: "0 0 56px rgba(230,57,70,0.3)",
              }}>👨‍💻</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", marginBottom: 6 }}>Kanishk Garg</h3>
              <div style={{ fontSize: 14, color: "#e63946", fontFamily: "'Courier New',monospace", letterSpacing: 1.5, marginBottom: 28 }}>AI/ML Enthusiast · B.Tech CSE</div>
              <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 2, fontSize: 16, marginBottom: 16 }}>
                I'm a 3rd-year B.Tech Computer Science student with a passion for AI/ML and problem-solving. I love applying machine learning algorithms to real-world challenges and building intelligent systems that make a difference. Currently exploring AI/ML internship and full-time placement opportunities.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, justifyContent: "center" }}>
                {["React", "Node.js", "Python", "MongoDB", "C++"].map(tag => (
                  <span key={tag} style={{
                    fontSize: 13, padding: "5px 16px",
                    background: "rgba(230,57,70,0.1)", color: "#e63946",
                    borderRadius: 20, border: "1px solid rgba(230,57,70,0.3)",
                    fontFamily: "'Courier New',monospace",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Right — info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "University", val: "NIIT UNIVERSITY", icon: "🎓" },
                { label: "Degree", val: "B.Tech Computer Science", icon: "📚" },
                { label: "Year", val: "3rd Year · Currently pursuing", icon: "📅" },
                { label: "CGPA", val: "8.73 / 10", icon: "⭐" },
                { label: "Location", val: "Faridabad, Haryana", icon: "📍" },
                { label: "Status", val: "Actively seeking roles", icon: "🚀" },
              ].map((item) => (
                <div key={item.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "20px 18px",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(230,57,70,0.4)"; e.currentTarget.style.background = "rgba(230,57,70,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <span style={{ fontSize: 24, display: "block", marginBottom: 12 }}>{item.icon}</span>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New',monospace", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 16, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5%", position: "relative", zIndex: 1, width: "100%" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#e63946", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Courier New',monospace" }}>Skills</div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Georgia',serif", color: "#fff", marginBottom: 48 }}>
          Tech I work with.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          {["Languages", "Web Development", "Machine Learning", "ML Libraries", "Tools", "Database"].filter((cat) => SKILLS.some((s) => s.cat === cat)).map((cat) => (
            <div key={cat}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, fontFamily: "'Courier New',monospace" }}>{cat}</div>
              {SKILLS.filter((s) => s.cat === cat).map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 150} />
              ))}
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 5%", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#e63946", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Courier New',monospace" }}>Projects</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Georgia',serif", color: "#fff", marginBottom: 56 }}>
            Things I've built.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%", position: "relative", zIndex: 1, width: "100%" }}><div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#e63946", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Courier New',monospace" }}>Contact</div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Georgia',serif", color: "#fff", marginBottom: 12 }}>
          Let's talk.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 40, fontSize: 17 }}>
          Open to internship and full-time SDE roles. Drop a message!
        </p>

        <form onSubmit={handleSubmit}>
          {[
            { key: "name", label: "Your Name", type: "text", placeholder: "Kanishk Garg" },
            { key: "email", label: "Email Address", type: "email", placeholder: "aryan@example.com" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New',monospace", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>{label}</label>
              <input
                type={type} placeholder={placeholder} required
                value={formData[key]}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, color: "#e2e8f0", fontSize: 15,
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onFocus={e => e.target.style.borderColor = "#e63946"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
          ))}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New',monospace", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Message</label>
            <textarea
              placeholder="I'd love to collaborate / I have an internship role..." required rows={5}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: "100%", padding: "14px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, color: "#e2e8f0", fontSize: 15,
                outline: "none", resize: "vertical", boxSizing: "border-box",
                fontFamily: "inherit",
              }}
              onFocus={e => e.target.style.borderColor = "#e63946"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
          <button type="submit" style={{
            width: "100%", padding: "16px", borderRadius: 12,
            background: sent ? "#2d6a4f" : "#e63946",
            color: "#fff", border: "none", fontSize: 15,
            fontWeight: 600, cursor: "pointer",
            transition: "background 0.3s",
          }}>
            {sent ? "✓ Message Sent!" : "Send Message →"}
          </button>
        </form>

        {/* Social links */}
        <div style={{ display: "flex", gap: 16, marginTop: 40, justifyContent: "center" }}>
          {SOCIAL.map((s) => (
            <a key={s.name} href={s.url} style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600,
              textDecoration: "none", transition: "all 0.2s",
              fontFamily: "'Courier New',monospace",
            }}
              onMouseEnter={e => { e.target.style.background = "rgba(230,57,70,0.15)"; e.target.style.borderColor = "#e63946"; e.target.style.color = "#e63946"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}
            >{s.icon}</a>
          ))}
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'Courier New',monospace" }}>
          Crafted with ❤️ · Kanishk Garg · 2026
        </p>
      </footer>

    </div>
  );
}