"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const [scroller, setScroller] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = document.getElementById("view-planilhas");
    setScroller(el);
  }, []);

  if (!scroller) return null;

  return <ScrollCore scroller={scroller} titleComponent={titleComponent}>{children}</ScrollCore>;
};

const ScrollCore = ({ scroller, titleComponent, children }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement>(scroller);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollerRef,
  });
  
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translateTablet = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const translateHeader = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div
      className="flex justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ height: '2000px', padding: '20px', width: '100%' }}
    >
      <div
        className="w-full"
        style={{
          perspective: "1000px",
          position: 'sticky',
          top: '8vh',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
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
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        paddingBottom: '60px',
        position: 'relative',
        zIndex: 20
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
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
          height: '600px',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          marginTop: '20px',
          backgroundColor: '#1b1b1f',
          borderRadius: '30px',
          padding: '20px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div className="overflow-hidden rounded-2xl bg-gray-100" style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
          {children}
        </div>
      </motion.div>
    </>
  );
};
