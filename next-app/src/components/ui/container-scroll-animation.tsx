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
    <motion.div
      className="max-w-5xl mx-auto w-full border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl"
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        height: '600px',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        marginTop: '20px',
        backgroundColor: '#222222',
        border: '10px solid #444',
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
  );
};
