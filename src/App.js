// App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { worksData } from "./worksData";

const personalInfo = {
  name: "Sara Ebrahim Ali",
  tagline: "Multi-Media Artist • Digital & Traditional Art Specialist",
  faculty: "Faculty of Applied Arts, Helwan University",
  phone: "01124361107",
  email: "saraebrahim@gmail.com",
};

const skillsList = [
  { name: "Digital Painting", level: 95 },
  { name: "Traditional Painting", level: 90 },
  { name: "Abstract Art", level: 88 },
  { name: "Illustration", level: 92 },
  { name: "Logo Design", level: 85 },
  { name: "Mosaic Art", level: 80 },
  { name: "AI Art Generation", level: 75 },
  { name: "Architectural Design", level: 82 },
];

const testimonials = [
  { author: "Dr. Mona H.", role: "Professor", text: "Sara's portfolio shows rare craft and conceptual clarity." },
  { author: "Ahmed K.", role: "Curator", text: "Her installation was one of the strongest student works." },
  { author: "Salma R.", role: "Client", text: "Very professional and responsive — delivered more than expected." },
];

const sectionColors = {
  Home: "linear-gradient(135deg, #8B5A8C 0%, #A67DB8 100%)",
  About: "linear-gradient(135deg, #C490A1 0%, #D4A5A5 100%)",
  Works: "linear-gradient(135deg, #B8A9C9 0%, #D4C5E8 100%)",
  Skills: "linear-gradient(135deg, #E8B4B8 0%, #F4D1D1 100%)",
  Contact: "linear-gradient(135deg, #F2C2C2 0%, #F8D7D7 100%)",
};

export default function App() {
  const sectionRefs = {
    Home: useRef(null),
    About: useRef(null),
    Works: useRef(null),
    Skills: useRef(null),
    Contact: useRef(null),
  };

  const [activeSection, setActiveSection] = useState("Home");
  const [worksSection, setWorksSection] = useState("Abstract Art");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const typingPhrases = ["Digital Artist", "Traditional Painter", "Abstract Artist", "Multi-Media Creator", "AI Art Explorer"];

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.5 };
    const observers = Object.entries(sectionRefs).map(([name, ref]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(name);
          }
        });
      }, options);
      obs.observe(ref.current);
      return obs;
    }).filter(Boolean);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let forward = true;
    let mounted = true;

    function tick() {
      if (!mounted) return;
      const phrase = typingPhrases[phraseIndex];
      if (forward) {
        charIndex++;
        if (charIndex > phrase.length) {
          forward = false;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          forward = true;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        }
      }
      setTyped(phrase.slice(0, charIndex));
      setTimeout(tick, forward ? 100 : 40);
    }

    tick();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestiIndex(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionStyle = {
    scrollSnapAlign: "start",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6rem 2rem 4rem 2rem",
    position: "relative",
    marginBottom: "2rem",
  };

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "Inter, system-ui, sans-serif",
      background: sectionColors[activeSection] || "#fff",
      transition: "background 0.7s ease",
      color: "#2D1B2E",
    }}>
      <AnimatePresence>
        {isLoading && <SplashScreen name={personalInfo.name} tagline={personalInfo.tagline} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((Object.keys(sectionRefs).indexOf(activeSection) + 1) / Object.keys(sectionRefs).length) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: 4,
              background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
              zIndex: 100,
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          />

          {/* Header */}
          <header style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 70,
            display: "flex",
            gap: 16,
            padding: "12px 20px",
            borderRadius: 50,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            maxWidth: "90%",
          }}>
            {["Home", "About", "Works", "Skills", "Contact"].map(s => (
              <motion.span
                key={s}
                onClick={() => scrollToSection(sectionRefs[s])}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: 14,
                  color: activeSection === s ? "#8B5A8C" : "#666",
                  fontWeight: activeSection === s ? 700 : 500,
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 20,
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </motion.span>
            ))}
          </header>

          <FloatingParticles />

          <main style={{ scrollSnapType: "y mandatory", height: "100vh", overflowY: "auto" }}>

            {/* Home Section */}
            <section ref={sectionRefs.Home} style={sectionStyle}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{
                maxWidth: 1000,
                display: "grid",
                gridTemplateColumns: "1fr 350px",
                gap: 40,
                width: "100%",
                padding: "0 2rem",
              }}>
                <div>
                  <h1 style={{
                    fontSize: "3rem",
                    margin: 0,
                    lineHeight: 1.1,
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}>
                    {personalInfo.name}
                  </h1>
                  <p style={{
                    marginTop: 12,
                    opacity: 0.9,
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}>
                    {personalInfo.faculty}
                  </p>
                  <p style={{
                    fontSize: "1.2rem",
                    marginTop: 16,
                    color: "#fff",
                  }}>
                    I am <strong style={{ color: "#fff" }}>{typed}</strong>
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ marginLeft: 8, color: "#fff" }}>|</motion.span>
                  </p>
                  <p style={{
                    marginTop: 16,
                    opacity: 0.9,
                    color: "#fff",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}>
                    I create digital art, traditional paintings, abstract compositions, and explore AI-generated art — bridging traditional techniques with modern innovation.
                  </p>
                  <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
                    <motion.button
                      onClick={() => scrollToSection(sectionRefs.Works)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "14px 28px",
                        borderRadius: 25,
                        background: "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                        color: "#fff",
                        border: "2px solid rgba(255,255,255,0.4)",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 16,
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                      }}
                    >
                      🎨 View Works
                    </motion.button>
                  </div>

                </div>

                <div>
                  <div style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.2)"
                  }}>
                    <img src={worksData[0].image} alt={worksData[0].title} style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover"
                    }} />
                    <div style={{
                      padding: 16,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(20px)"
                    }}>
                      <strong style={{ color: "#2D1B2E" }}>{worksData[0].title}</strong>
                      <p style={{ margin: "8px 0 0 0", opacity: 0.7, fontSize: 14, color: "#2D1B2E" }}>
                        {worksData[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* About Section */}
            <section ref={sectionRefs.About} style={{ ...sectionStyle, padding: "8rem 2rem 6rem 2rem", marginBottom: "4rem" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{
                maxWidth: 1000,
                display: "grid",
                gridTemplateColumns: "1fr 350px",
                gap: 40,
                width: "100%",
                padding: "0 2rem",
              }}>
                <div>
                  <motion.h2 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{
                    fontSize: "2.5rem",
                    marginBottom: 16,
                    textAlign: "left",
                    background: "linear-gradient(135deg, #8B5A8C 0%, #A67DB8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    About Me
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    textAlign: "left"
                  }}>
                    I’m Sara — I study Decoration at Helwan University. I specialize in creating diverse artistic works spanning digital painting, traditional art, abstract compositions, mosaic work, and cutting-edge AI-generated art. My passion lies in exploring the intersection of traditional artistic techniques with modern digital innovation.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: 24 }}>
                    <h3 style={{ marginBottom: 12, color: "#2D1B2E" }}>Experience & Exhibitions</h3>
                    <ul style={{ paddingLeft: 20, textAlign: "left" }}>
                      <li style={{ marginBottom: 8 }}><strong>2024</strong> — Selected work – Student Exhibition</li>
                      <li style={{ marginBottom: 8 }}><strong>2023</strong> — Design workshop participant</li>
                      <li style={{ marginBottom: 8 }}><strong>2022</strong> — Started decoration studies at Helwan</li>
                    </ul>
                  </motion.div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 16,
                    padding: 20,
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#2D1B2E" }}>🏆 Awards</h4>
                    <ul style={{ margin: 0, paddingLeft: 16, opacity: 0.8, color: "#2D1B2E" }}>
                      <li style={{ marginBottom: 4 }}>Student Exhibition — 2024</li>
                      <li style={{ marginBottom: 4 }}>Design Workshop — 2023</li>
                    </ul>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 16,
                    padding: 20,
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                  }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#2D1B2E" }}>🎯 Interests</h4>
                    <p style={{ margin: 0, opacity: 0.8, color: "#2D1B2E" }}>Sketching, material experiments, exhibition layouts, 3D modeling.</p>
                  </motion.div>
                </div>

              </motion.div>
            </section>

            {/* Works Section */}
            <section ref={sectionRefs.Works} style={{ ...sectionStyle, padding: "8rem 2rem 6rem 2rem", marginBottom: "4rem" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 1400, padding: "0 2rem", margin: "0 auto" }}>
                <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: 24 }}>Selected Works</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
                  {["Abstract Art","Digital Painting","Traditional Painting","Contemporary Mosaic","Logo Design","AI Art","Other Works"].map(s => (
                    <motion.button
                      key={s}
                      onClick={() => setWorksSection(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "12px 20px",
                        borderRadius: 25,
                        border: "none",
                        cursor: "pointer",
                        background: worksSection === s ? "rgba(139,90,140,0.8)" : "rgba(255,255,255,0.15)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s ease",
                        boxShadow: worksSection === s ? "0 4px 15px rgba(139,90,140,0.3)" : "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 28,
                  paddingBottom: 40
                }}>
                  {worksData.filter(w => w.section === worksSection).map(work => (
                    <WorkCard key={work.id} work={work} onClick={() => { setSelectedWork(work); setModalOpen(true); }} />
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Skills Section */}
            <section ref={sectionRefs.Skills} style={{ ...sectionStyle, padding: "8rem 2rem 6rem 2rem", marginBottom: "4rem" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 1000, padding: "0 2rem" }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 32 }}>Skills & Tools</h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 20,
                }}>
                  {skillsList.map(skill => (
                    <motion.div key={skill.name} whileHover={{ scale: 1.02, y: -5 }} style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(20px)",
                      padding: 24,
                      borderRadius: 20,
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: "1.1rem", color: "#2D1B2E" }}>{skill.name}</strong>
                        <span style={{ opacity: 0.8, fontWeight: 600, color: "#2D1B2E" }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: 12, background: "rgba(139, 90, 140, 0.2)", borderRadius: 10, marginTop: 16, overflow: "hidden" }}>
                        <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #8B5A8C, #A67DB8)", borderRadius: 10 }} initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1.2 }} />
                      </div>
                      <p style={{ marginTop: 12, opacity: 0.8, fontSize: 14, color: "#2D1B2E" }}>
                        {skill.name === "Digital Painting" && "Tools: Photoshop, Procreate, Illustrator"}
                        {skill.name === "Traditional Painting" && "Tools: Oil, Acrylic, Watercolor, Canvas"}
                        {skill.name === "Abstract Art" && "Tools: Mixed Media, Acrylic, Digital"}
                        {skill.name === "Illustration" && "Tools: Procreate, Illustrator, Traditional Media"}
                        {skill.name === "Logo Design" && "Tools: Illustrator, Photoshop, Figma"}
                        {skill.name === "Mosaic Art" && "Tools: Ceramic, Glass, Mixed Materials"}
                        {skill.name === "AI Art Generation" && "Tools: Midjourney, DALL-E, Stable Diffusion"}
                        {skill.name === "Architectural Design" && "Tools: AutoCAD, SketchUp, 3D Modeling"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Contact Section */}
            <section ref={sectionRefs.Contact} style={{ ...sectionStyle, padding: "8rem 2rem 6rem 2rem", marginBottom: "2rem" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "1fr 350px", gap: 40, padding: "0 2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2.5rem", marginBottom: 16 }}>Contact & Testimonials</h2>
                  <p style={{ opacity: 0.9, fontSize: "1.1rem" }}>Interested in collaborating? Send a message — I reply quickly.</p>
                  <div style={{
                    marginTop: 24,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(20px)",
                    padding: 24,
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}>
                    <ContactForm personalInfo={personalInfo} />
                  </div>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.5rem" }}>💬 What people say</h3>
                  <div style={{ marginTop: 20 }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={testiIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(20px)",
                        padding: 24,
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.3)",
                        minHeight: 160,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        color: "#2D1B2E",
                      }}>
                        <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: 1.6 }}>"{testimonials[testiIndex].text}"</p>
                        <footer style={{ marginTop: 16, opacity: 0.8, fontSize: 14 }}>— {testimonials[testiIndex].author}, {testimonials[testiIndex].role}</footer>
                      </motion.div>
                    </AnimatePresence>
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                      <button onClick={() => setTestiIndex(i => i === 0 ? testimonials.length - 1 : i - 1)} style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}>← Prev</button>
                      <button onClick={() => setTestiIndex(i => (i + 1) % testimonials.length)} style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        background: "linear-gradient(45deg, #fa709a, #fee140)",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}>Next →</button>
                    </div>
                    <div style={{
                      marginTop: 24,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(20px)",
                      padding: 20,
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      color: "#2D1B2E"
                    }}>
                      <strong>📞 Phone</strong><br />{personalInfo.phone}<br />
                      <strong>✉️ Email</strong><br />{personalInfo.email}
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

          </main>

          {modalOpen && selectedWork && (
            <ModalWork selectedWork={selectedWork} onClose={() => setModalOpen(false)} />
          )}
        </>
      )}
    </div>
  );
}

// ————————————————————————————— components below —————————————————————————————

function WorkCard({ work, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.3)",
        position: "relative",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease-out",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={work.image}
          alt={work.title}
          style={{
            width: "100%",
            height: 240,
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onError={(e) => {
            e.target.style.background = "#f0f0f0";
            e.target.style.display = "flex";
            e.target.style.alignItems = "center";
            e.target.style.justifyContent = "center";
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(135deg, rgba(139,90,140,0.92), rgba(166,125,184,0.88))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            textAlign: "center",
            color: "#fff",
            backdropFilter: "blur(12px)"
          }}
        >
          <h4 style={{ margin: "0 0 12px 0", fontSize: "1.4rem", fontWeight: 700, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            {work.title}
          </h4>
          <p style={{ margin: 0, opacity: 0.95, fontSize: 14, lineHeight: 1.6, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            {work.description}
          </p>
          <div style={{
            marginTop: 20,
            padding: "12px 24px",
            background: "rgba(255,255,255,0.25)",
            borderRadius: 25,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            cursor: "pointer"
          }}>
            👁️ View Details
          </div>
        </motion.div>
      </div>
      <div style={{ padding: 24 }}>
        <span style={{
          background: "linear-gradient(135deg, rgba(139,90,140,0.1), rgba(166,125,184,0.1))",
          color: "#8B5A8C",
          padding: "6px 12px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          border: "1px solid rgba(139,90,140,0.2)"
        }}>
          {work.section}
        </span>
        <h3 style={{
          margin: "12px 0 8px 0",
          fontSize: "1.3rem",
          color: "#2D1B2E",
          fontWeight: 600,
          lineHeight: 1.3
        }}>
          {work.title}
        </h3>
        <p style={{
          margin: 0,
          opacity: 0.8,
          fontSize: 14,
          lineHeight: 1.5,
          color: "#2D1B2E"
        }}>
          {work.description}
        </p>
      </div>
    </motion.div>
  );
}

function ContactForm({ personalInfo }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent — thank you! 🎉");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 3000);
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontSize: 14, opacity: 0.9, fontWeight: 600, color: "#2D1B2E" }}>Name</label>
      <input
        required
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        placeholder="Your name"
        style={{ width: "100%", padding: 14, marginTop: 8, borderRadius: 12, border: "1px solid rgba(139, 90, 140, 0.3)", background: "rgba(255,255,255,0.8)", color: "#2D1B2E", fontSize: 16 }}
      />
      <label style={{ fontSize: 14, marginTop: 16, opacity: 0.9, fontWeight: 600, color: "#2D1B2E" }}>Email</label>
      <input
        required
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        placeholder="your.email@example.com"
        style={{ width: "100%", padding: 14, marginTop: 8, borderRadius: 12, border: "1px solid rgba(139, 90, 140, 0.3)", background: "rgba(255,255,255,0.8)", color: "#2D1B2E", fontSize: 16 }}
      />
      <label style={{ fontSize: 14, marginTop: 16, opacity: 0.9, fontWeight: 600, color: "#2D1B2E" }}>Message</label>
      <textarea
        required
        rows={4}
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
        placeholder="Tell me about your project..."
        style={{ width: "100%", padding: 14, marginTop: 8, borderRadius: 12, border: "1px solid rgba(139, 90, 140, 0.3)", background: "rgba(255,255,255,0.8)", color: "#2D1B2E", fontSize: 16 }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" style={{ padding: "12px 20px", borderRadius: 12, background: "linear-gradient(45deg, #fa709a, #fee140)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>✉️ Send Message</button>
        <button type="button" onClick={() => { setFormData({ name: "", email: "", message: "" }); setStatus(null); }} style={{ padding: "12px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontWeight: 600 }}>🔄 Reset</button>
      </div>
      {status && <p style={{ marginTop: 12, color: "#2D1B2E", fontSize: 16, fontWeight: 600 }}>{status}</p>}
    </form>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    }}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: "rgba(255,255,255,0.6)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </div>
  );
}

function SplashScreen({ name, tagline }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #8B5A8C 0%, #A67DB8 50%, #C490A1 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        overflow: "hidden",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
        style={{
          fontSize: "4rem",
          marginBottom: "2rem",
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
        }}
      >
        🎨
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          fontSize: "3.5rem",
          fontWeight: 700,
          margin: 0,
          marginBottom: "1rem",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          fontSize: "1.3rem",
          margin: 0,
          opacity: 0.9,
          fontWeight: 300,
          letterSpacing: "0.5px"
        }}
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1,1.5,1], opacity: [0.5,1,0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)"
              }}
            />
          ))}
        </div>
        <motion.p animate={{ opacity: [0.5,1,0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.9rem",
          margin: 0,
          fontWeight: 300
        }}>
          Loading Portfolio...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function ModalWork({ selectedWork, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.9)",
          zIndex: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          backdropFilter: "blur(10px)"
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "100%",
            maxWidth: 900,
            maxHeight: "90vh",
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
          }}
          onClick={e => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              fontSize: 28,
              cursor: "pointer",
              color: "#fff",
              width: 44,
              height: 44,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10
            }}
          >×</motion.button>

          {/* Only show image, no description panel */}
          <img
            src={selectedWork.image}
            alt={selectedWork.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#000"
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
