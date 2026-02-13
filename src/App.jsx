import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import profileImg from "./assets/profile.png";
import faviconImg from "./assets/favicon.png";
import { motion } from "framer-motion";

const DATA = {
  name: "Divyansh Kaushal",
  role: "• ML Engineer • Software Developer • Quantum Robotics Enthusiast",
  tagline:
    "Student by journey, ML engineer by passion, quantum robotics thinker by vision.",
  location: "Amethi, Uttar Pradesh, India",
  email: "divyanshkaushal3200@gmail.com",
  links: {
    github: "https://github.com/DIVY3200",
    linkedin: "https://www.linkedin.com/in/divyansh-kaushal-165494230/",
    resume:
      "https://docs.google.com/document/d/1DoSge1k3mVL3lDOEyW2mz50NEiA2YTwO/edit?usp=sharing&ouid=105773074638200693037&rtpof=true&sd=true",
  },
  highlights: [
    "5⭐ on HackerRank",
    "Gate 2025 CS-DA: AIR 7217",
    "CodeChef Silver • Rank 897 (Starter 121)",
  ],

  skills: [
    { group: "Languages", items: ["Python", "C++"] },
    { group: "Data Analytics", items: ["MySQL", "Excel", "Power BI"] },
    {
      group: "AI/ML",
      items: [
        "OpenCV",
        "CNN",
        "ANN",
        "NLP",
        "Supervised and Unsupervised Learning and various models",
        "Reinforcement Learning",
      ],
    },
    { group: "Quantum Robotics", items: ["QML", "QAI", "QNN"] },
  ],

  projects: [
    {
      title: "Plant Disease Detection",
      desc:
        "Engineered a Plant Disease Detection system over 92% accuracy, reducing crop diagnosis time by 60% for farmer using tensorflow, Streamlit, Sklearn and Matplotlib",
      tags: ["Tensorflow", "Streamlit", "Sklearn", "Matplotlib"],
      links: {
        github: "https://github.com/DIVY3200/Diseases-Detection-in-Plant",
        live: "https://divyanshkaushal-plant-diseases.streamlit.app/",
      },
      featured: true,
    },
    {
      title: "Crowd Management System usng AI and ML",
      desc:
        "Developed an AI-powered crowd monitoring model using computer vision to detect and count individuals in real time, helping authorities manage large gatherings efficiently.",
      tags: ["OpenCV"],
      links: {
        github:
          "https://github.com/DIVY3200/Crowd-Management-System-Using-AI-and-ML",
        live: "https://github.com/DIVY3200/Crowd-Management-System-Using-AI-and-ML",
      },
      featured: true,
    },
    {
      title: "Weather Monitoring System",
      desc:
        "Integrated the OpenWeatherMap API to fetch real-time weather data, improving data delivery speed by 25%.",
      tags: ["Node.js", "Express.js", "MySQL", "Restful APIs"],
      links: {
        github: "https://github.com/DIVY3200/Real-Time-Data-Processing",
        live: "https://github.com/DIVY3200/Real-Time-Data-Processing",
      },
    },
    {
      title: "Ecommerce Dashboard using powerBI",
      desc:
        "Blinkit Data dashboard using PowerBI, providing real-time insights into sales, inventory, and customer behavior, leading to a 15% increase in operational efficiency.",
      tags: ["PowerBI", "MySQL", "Excel"],
      links: {
        github: "https://github.com/DIVY3200/SQL-Python-Ecommerce-project",
        live: "https://github.com/DIVY3200/SQL-Python-Ecommerce-project",
      },
    },
    {
      title: "Remote Sensing using QML",
      desc:
        "Explored Quantum neural networks(QNN) for image classification on the EUROSAT Earth observation dataset, achieving accuracy comparable to classical CNNs.",
      tags: ["Qiskit", "Pytorch", "QNN"],
      links: { github: "https://github.com/DIVY3200/Remote-Sensing-Using-QML", live: "https://github.com/DIVY3200/Remote-Sensing-Using-QML" },
    },
  ],

  experience: [
    {
      org: "Bluestock Fintech",
      role: "Software Engineer Intern",
      time: "15/08/24 - 15/10/24",
      points: [
        "Led a team of 9 engineers to develop an IPO web application using Django and rest Framework.",
        "Build a responsive frontend with HTML, CSS, javaScript, Bootstrap 5, postgreSQL.",
      ],
    },
  ],

  education: [
    {
      time: "2025 – present",
      title: "Master – ABV-IIITM Gwalior",
      desc:
        "M.Tech in Autonomous System and Machine Intelligence. Building a strong base in AI, ML and Quantum Robotics through projects and Mentorship.",
    },
    {
      time: "2021 – 2025",
      title: "Bachelor – PSIT Kanpur",
      desc:
        "B.Tech in Computer Science & Engineering (AI/ML). Built a strong base in DSA, ML, and software engineering through projects and problem solving.",
    },
    {
      time: "2020",
      title: "Intermediate – SJS Public School",
      desc:
        "Completed Class XII (CBSE) with 80.6%. Focused on core STEM subjects and discipline through academics + sports.",
    },
  ],

  achievements: [
    "Secure 3rd position in One Minute Show(2014)",
    "Contributed in Amazon ML Challenge and Walmart Sparkathon",
    "CodeChef Silver Badge • Rank 897 (Starter 121)",
    "District Cricket Team Captain (2019) — led a team of 11 players",
  ],
};

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    
    if (!els.length) return;

    const NAV_OFFSET = 90;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const best = visible.sort((a, b) => {
          const aDist = Math.abs(a.boundingClientRect.top - NAV_OFFSET);
          const bDist = Math.abs(b.boundingClientRect.top - NAV_OFFSET);
          return aDist - bDist;
        })[0];

        if (best?.target?.id) setActive(best.target.id);
      },
      {
        root: null,
        rootMargin: `-${NAV_OFFSET}px 0px -60% 0px`,
        threshold: 0.01,
      }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  useEffect(() => {
  const root = document.documentElement;

  const setTouch = () => (root.dataset.input = "touch");
  const setMouse = () => (root.dataset.input = "mouse");

  root.dataset.input = window.matchMedia("(hover: none)").matches ? "touch" : "mouse";

  window.addEventListener("touchstart", setTouch, { passive: true });
  window.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") setMouse();
    else setTouch();
  });

  const blurOnTouchClick = () => {
    if (root.dataset.input === "touch") {
      const el = document.activeElement;
      if (el && (el.tagName === "A" || el.tagName === "BUTTON")) el.blur();
    }
  };
  window.addEventListener("click", blurOnTouchClick, true);

  return () => {
    window.removeEventListener("touchstart", setTouch);
    window.removeEventListener("click", blurOnTouchClick, true);
  };
}, []);

  return active;
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function IconLink({ href, label }) {
  return (
    <a className="iconLink" href={href} target="_blank" rel="noreferrer">
      {label} <span className="arrow">↗</span>
    </a>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateY: -8 },
  show: { opacity: 1, y: 0, rotateY: 0 },
};

export default function App() {
  const [result, setResult] = useState("");
  const sectionIds = [
    "about",
    "journey",
    "skills",
    "projects",
    "achievements",
    "contact",
  ];
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const allTags = useMemo(() => {
    const s = new Set();
    DATA.projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    return DATA.projects.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = tag === "All" || p.tags.includes(tag);
      return matchQuery && matchTag;
    });
  }, [query, tag]);

  const onContactSubmit = async (e) => {
  e.preventDefault();
  setResult("Sending...");

  const formData = new FormData(e.currentTarget);

  // ✅ add access key
  formData.append("access_key", "d6dd747a-f030-4207-a36f-20cffcaa7305");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const text = await res.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      // if JSON parsing fails, keep data as null
    }

    if (res.ok && data?.success) {
      setResult("✅ Form Submitted Successfully");
      e.currentTarget.reset();
    } else {
      setResult(data?.message || `❌ Error (${res.status})`);
      console.log("Web3Forms response:", text);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setResult("✅ Submitted");
  }
};


const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  setMenuOpen(false);
};

  const typingRef = useRef(null);
  useEffect(() => {
    const words = ["AI/ML", "DSA", "Quantum Robotics", "Computer Vision", "Data Analytics"];
    let w = 0,
      i = 0,
      dir = 1;
    const tick = () => {
      const word = words[w];
      i += dir;
      if (i >= word.length + 6) dir = -1;
      if (i <= 0) {
        dir = 1;
        w = (w + 1) % words.length;
      }
      if (typingRef.current)
        typingRef.current.textContent = word.slice(0, Math.min(i, word.length));
    };
    const t = setInterval(tick, 85);
    return () => clearInterval(t);
  }, []);

  

  return (
    <div className="app">
      <header className="navWrap">
  <nav className="nav">
    <button
      className="brand"
      onClick={() => scrollTo("home")}
      aria-label="Go home"
    >
      <span>
        <img src={faviconImg} alt="Logo" className="brandLogo" />
      </span>
    </button>

    <div className="navLinks">
      {sectionIds.map((id) => (
        <button
          key={id}
          className={`navBtn ${active === id ? "active" : ""}`}
          onClick={() => scrollTo(id)}
        >
          {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
        </button>
      ))}
    </div>

    <div className="navRight">
      <button
        className="themeBtn"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {theme === "dark" ? "☾" : "☀"}
      </button>

      <button
        className="cta"
        aria-label="Contact us"
        title="Contact us"
        onClick={() => scrollTo("contact")}
      >
        Contact Us
      </button>

      <button
        className="menuBtn"
        aria-label="Open menu"
        title="Menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </div>
  </nav>

  <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
    {sectionIds.map((id) => (
      <button
        key={id}
        className={`mobileLink ${active === id ? "active" : ""}`}
        onClick={() => scrollTo(id)}
      >
        {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
      </button>
    ))}
  </div>
</header>


      <main>
        {/* HERO */}
        <motion.section
          id="home"
          className="section hero"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="heroGrid">
            <div className="heroLeft">
              <div className="chip">“Judges a book by its cover.”</div>
              <h1>
                I’m <span className="grad">{DATA.role}</span>
              </h1>
              <p className="muted">{DATA.tagline}</p>

              <div className="typingRow">
                <span className="dot" />
                <span className="typingLabel">Focused on</span>
                <span className="typing" ref={typingRef} />
              </div>

              <div className="heroBtns">
                <button className="btn primary" onClick={() => scrollTo("projects")}>
                  View Projects
                </button>
                <a className="btn ghost" href={DATA.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>

              <div className="miniStats">
                {DATA.highlights.map((h) => (
                  <motion.div
                    className="statCard"
                    key={h}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  >
                    <span className="statGlow" />
                    <span className="statText">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="heroRight">
              <motion.div
                className="avatarCard"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="avatarRingWrap">
                  <span className="ringDot dot1" />
                  <span className="ringDot dot2" />
                  <span className="ringDot dot3" />
                  <div className="avatarRing">
                    <div className="avatar">
                      <img src={profileImg} alt="Divyansh Kaushal" className="avatarImg" />
                    </div>
                  </div>
                </div>


                <div className="avatarMeta">
                  <div className="avatarName">{DATA.name}</div>
                  <div className="row">
                    <span className="label">Location</span>
                    <span className="value">{DATA.location}</span>
                  </div>
                  <div className="row">
                    <span className="label">Email</span>
                    <span className="value">{DATA.email}</span>
                  </div>
                  <div className="row links">
                    <IconLink href={DATA.links.github} label="GitHub" />
                    <IconLink href={DATA.links.linkedin} label="LinkedIn" />
                    <IconLink href={DATA.links.resume} label="Resume" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="orbit"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="orb orb1" />
                <div className="orb orb2" />
                <div className="orb orb3" />
                <div className="core">∑</div>
              </motion.div>
            </div>
          </div>
          <div className="sectionDivider" />
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              About <span className="grad">Me</span>
            </h2>
          </div>

          <motion.div
            className="card aboutCard"
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <h3>Who I am</h3>
              <p className="muted">
                I am a Computer Science engineer and aspiring ML engineer passionate about building
                intelligent, real-world solutions. My work spans AI/ML, software development, and
                emerging quantum technologies, with hands-on experience in computer vision,
                data-driven systems, and scalable web applications. I recently completed my B.Tech
                in Computer Science & Engineering (AI/ML) and am pursuing an M.Tech in Autonomous
                Systems and Machine Intelligence from ABV-IIITM Gwalior, further strengthening my
                focus on advanced intelligent and quantum-inspired systems. I enjoy solving complex
                algorithmic problems and continuously exploring innovations in autonomous
                technologies.
              </p>
            </div>
          </motion.div>
          <div className="sectionDivider" />
        </motion.section>

        {/* JOURNEY */}
        <motion.section
          id="journey"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              My <span className="grad">Journey</span>
            </h2>
          </div>

          <div className="journeyGrid">
            {/* Education */}
            <div>
              <h3 className="journeyColTitle">Education</h3>
              <div className="timeline">
                {DATA.education.map((ed) => (
                  <div className="tItem" key={ed.title}>
                    <motion.div
                      className="tCard"
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                      <div className="tTime">📅 {ed.time}</div>
                      <div className="tHeading">{ed.title}</div>
                      <div className="tDesc">{ed.desc}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="journeyColTitle">Experience</h3>
              <div className="timeline">
                {DATA.experience.map((ex) => (
                  <div className="tItem" key={ex.org}>
                    <motion.div
                      className="tCard"
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                      <div className="tTime">📅 {ex.time}</div>
                      <div className="tHeading">
                        {ex.role} — {ex.org}
                      </div>
                      <div className="tDesc">
                        <ul className="tList">
                          {ex.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sectionDivider" />
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              My <span className="grad">Skills</span>
            </h2>
          </div>

          <div className="grid3">
            {DATA.skills.map((s) => (
              <motion.div
                className="card"
                key={s.group}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <h3>{s.group}</h3>
                <div className="pillWrap">
                  {s.items.map((it) => (
                    <Pill key={it}>{it}</Pill>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="sectionDivider" />
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              My <span className="grad">Projects</span>
            </h2>
          </div>

          <div className="controls">
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects (e.g., ML, React, DBMS)…"
            />
            <select className="select" value={tag} onChange={(e) => setTag(e.target.value)}>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid2">
            {filtered.map((p) => (
              <motion.article
                className={`card projectCard ${p.featured ? "featured" : ""}`}
                key={p.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="projectTop">
                  <h3>{p.title}</h3>
                  {p.featured && <span className="badge">Featured</span>}
                </div>
                <p className="muted">{p.desc}</p>
                <div className="pillWrap">
                  {p.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
                <div className="projectLinks">
                  <a className="btn tiny ghost" href={p.links.github} target="_blank" rel="noreferrer">
                    Code
                  </a>
                  <a className="btn tiny primary" href={p.links.live} target="_blank" rel="noreferrer">
                    Live
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="sectionDivider" />
        </motion.section>

        {/* ACHIEVEMENTS */}
        <motion.section
          id="achievements"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              My <span className="grad">Achievements</span>
            </h2>
          </div>

          <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ul className="list">
              {DATA.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </motion.div>
          <div className="sectionDivider" />
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="journeyHead">
            <h2 className="journeyTitle">
              Contact <span className="grad">Me</span>
            </h2>
          </div>

          <div className="contactCenter">
            <motion.div
              className="card contactCard"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3>Messege Me</h3>

              <form className="form" onSubmit={onContactSubmit}>
                <input className="input" name="name" placeholder="Your name" required />
                <input className="input" name="email" placeholder="Your email" type="email" required />

                <div className="phoneRow">

                  <input
                    className="input phoneInput"
                    name="phone"
                    placeholder="Mobile number"
                    type="tel"
                    inputMode="numeric"
                    pattern="+[0-9]{7,15}"
                    title="Enter 7–15 digits. You can start with + (e.g. +91"
                    required
                  />
                </div>

                <textarea className="textarea" name="message" placeholder="Your message" rows="5" required />

                <button className="btn primary" type="submit">
                  Send Message
                </button>

                {result && <span className="muted">{result}</span>}
              </form>

            </motion.div>
          </div>
          <div className="sectionDivider" />
        </motion.section>

        <footer className="footer">
          <span className="muted">© {new Date().getFullYear()} {DATA.name}</span>

          <div className="footerSocials">
            <a href="https://www.linkedin.com/in/divyansh-kaushal-165494230/" target="_blank" rel="noreferrer" title="LinkedIn">
              <span className="socialIcon"><i className="fa-brands fa-linkedin"></i></span>
            </a>
            <a href="https://www.instagram.com/idivyanshkaushal/" target="_blank" rel="noreferrer" title="Instagram">
              <span className="socialIcon"><i className="fa-brands fa-instagram"></i></span>
            </a>
            <a href="https://www.codechef.com/users/dk3200" target="_blank" rel="noreferrer" title="CodeChef">
              <span className="socialIcon"><i className="fa-solid fa-computer"></i></span>
            </a>
            <a href="https://leetcode.com/u/DK_3200/" target="_blank" rel="noreferrer" title="LeetCode">
              <span className="socialIcon"><i className="fa-solid fa-diamond"></i></span>
            </a>
          </div>

          <span className="muted">Made by Divyansh Kaushal</span>
        </footer>
      </main>
    </div>
  );
}
