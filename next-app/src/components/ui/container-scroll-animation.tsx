"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const el =
      (document.querySelector("#view-planilhas .main-content") as HTMLElement) ||
      document.getElementById("view-planilhas");
    setScroller(el);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <ScrollCore
      scroller={scroller}
      isMobile={isMobile}
      titleComponent={titleComponent}
    >
      {children}
    </ScrollCore>
  );
};

const ScrollCore = ({
  scroller,
  isMobile,
  titleComponent,
  children,
}: {
  scroller: HTMLElement | null;
  isMobile: boolean;
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement | null>(scroller);

  useEffect(() => {
    scrollerRef.current = scroller;
  }, [scroller]);

  // Desktop scroll-driven transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translateTablet = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const translateHeader = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Mobile automatic lift animation
  const [isLifted, setIsLifted] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    let timer: NodeJS.Timeout;
    const triggerAnimation = () => {
      setIsLifted(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsLifted(true);
      }, 100);
    };

    const planilhasEl = document.getElementById("view-planilhas");
    if (planilhasEl) {
      const isVisible =
        planilhasEl.classList.contains("active") ||
        planilhasEl.style.display !== "none";
      if (isVisible) {
        triggerAnimation();
      }

      const observer = new MutationObserver(() => {
        const activeNow =
          planilhasEl.classList.contains("active") &&
          planilhasEl.style.display !== "none";
        if (activeNow) {
          triggerAnimation();
        }
      });

      observer.observe(planilhasEl, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });

      const onTabChanged = (e: any) => {
        if (e.detail?.targetId === "view-planilhas") {
          triggerAnimation();
        }
      };
      window.addEventListener("tabChanged", onTabChanged);

      return () => {
        clearTimeout(timer);
        observer.disconnect();
        window.removeEventListener("tabChanged", onTabChanged);
      };
    } else {
      triggerAnimation();
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Mobile view: auto-animated lifting tablet, no huge 2000px scroll container
  if (isMobile) {
    return (
      <div
        className="flex justify-center relative p-2"
        ref={containerRef}
        style={{
          width: "100%",
          padding: "10px 4px 40px 4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="w-full"
          style={{
            perspective: "1000px",
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isLifted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              textAlign: "center",
              paddingBottom: "16px",
              position: "relative",
              zIndex: 20,
            }}
            className="div max-w-5xl mx-auto text-center"
          >
            {titleComponent}
          </motion.div>

          <MobileCard isLifted={isLifted}>{children}</MobileCard>
        </div>
      </div>
    );
  }

  // Desktop view: scroll-driven 3D perspective lifting
  return (
    <div
      className="flex justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ height: "2000px", padding: "20px", width: "100%" }}
    >
      <div
        className="w-full"
        style={{
          perspective: "1000px",
          position: "sticky",
          top: "8vh",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Header translate={translateHeader} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translateTablet} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
        paddingBottom: "60px",
        position: "relative",
        zIndex: 20,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const MobileCard = ({
  isLifted,
  children,
}: {
  isLifted: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      <style>{`
        @keyframes tabletNeonBreathe {
          0%, 100% {
            border-color: rgba(255, 26, 26, 0.35);
            box-shadow:
              0 0 6px rgba(255, 26, 26, 0.25),
              0 0 15px rgba(255, 26, 26, 0.12);
          }
          50% {
            border-color: rgba(255, 26, 26, 0.85);
            box-shadow:
              0 0 10px rgba(255, 26, 26, 0.5),
              0 0 22px rgba(255, 26, 26, 0.25);
          }
        }
        .tablet-neon-frame {
          border: 2px solid rgba(255, 26, 26, 0.45);
          animation: tabletNeonBreathe 3s ease-in-out infinite;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
      <motion.div
        className="tablet-neon-frame max-w-5xl mx-auto w-full"
        initial={{ rotateX: 28, scale: 0.74, y: 35, opacity: 0.85 }}
        animate={
          isLifted
            ? { rotateX: 0, scale: 0.96, y: 0, opacity: 1 }
            : { rotateX: 28, scale: 0.74, y: 35, opacity: 0.85 }
        }
        transition={{
          duration: 1.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "center bottom",
          height: "540px",
          maxWidth: "100%",
          width: "100%",
          margin: "0 auto",
          marginTop: "10px",
          backgroundColor: "#1b1b1f",
          borderRadius: "22px",
          padding: "12px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="overflow-hidden bg-gray-100"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "14px",
          }}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <>
      <style>{`
        @keyframes tabletNeonBreathe {
          0%, 100% {
            border-color: rgba(255, 26, 26, 0.35);
            box-shadow:
              0 0 6px rgba(255, 26, 26, 0.25),
              0 0 15px rgba(255, 26, 26, 0.12);
          }
          50% {
            border-color: rgba(255, 26, 26, 0.85);
            box-shadow:
              0 0 10px rgba(255, 26, 26, 0.5),
              0 0 22px rgba(255, 26, 26, 0.25);
          }
        }
        .tablet-neon-frame {
          border: 2px solid rgba(255, 26, 26, 0.45);
          animation: tabletNeonBreathe 3s ease-in-out infinite;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .tablet-neon-frame:hover {
          box-shadow:
            0 0 12px rgba(255, 26, 26, 0.65),
            0 0 25px rgba(255, 26, 26, 0.35) !important;
          border-color: #ff1a1a !important;
        }
      `}</style>
      <motion.div
        className="tablet-neon-frame max-w-5xl mx-auto w-full rounded-[30px]"
        style={{
          rotateX: rotate,
          scale,
          height: "600px",
          maxWidth: "1000px",
          width: "100%",
          margin: "0 auto",
          marginTop: "20px",
          backgroundColor: "#1b1b1f",
          borderRadius: "30px",
          padding: "20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="overflow-hidden rounded-2xl bg-gray-100"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};
