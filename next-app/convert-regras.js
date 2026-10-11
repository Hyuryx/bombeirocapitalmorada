const fs = require('fs');

const file = 'src/components/ReactRegrasGallery.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import CircularGallery from './CircularGallery';", "import CircularCarousel from './CircularCarousel';");

content = content.replace("image: generateImage(rule),", "src: generateImage(rule),");

const target = `<CircularGallery
        bend={1}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.05}
        font="bold 30px sans-serif"
        scrollSpeed={2}
        items={items}
      />`;

const replacement = `<CircularCarousel
        items={items}
        preset="cylinder"
        intro="rise"
        cardWidth={400}
        aspectRatio={0.8}
        speed={14}
        captions={false}
        gap={25}
        tilt={-5}
        curve={1}
        perspective={2500}
        autoplay="drift"
        interval={3}
        direction="left"
        momentum={0.6}
        snap
        pauseOnHover
        focusOnClick
        draggable
        parallax={0.3}
        stretch={0.5}
        fadeColor="#000000"
        depthFade={0.55}
        innerShade={0.6}
        cornerRadius={12}
      />`;

content = content.replace(target, replacement);

fs.writeFileSync(file, content);
console.log('Regras converted to CircularCarousel');
