const fs = require('fs');

function wrapCircularCarousel() {
  const file = 'src/components/CircularCarousel.jsx';
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import ElectricBorder')) {
    content = content.replace("import './CircularCarousel.css';", "import './CircularCarousel.css';\nimport ElectricBorder from './ui/ElectricBorder';");
  }

  const target = `{list.map((item, index) => (
                <div
                  key={index}
                  ref={element => {
                    cardRefs.current[index] = element;
                  }}
                  className="circular-carousel__card"`;

  const replacement = `{list.map((item, index) => (
                <ElectricBorder color="#06b6d4" borderRadius={cornerRadius} key={index} style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 'var(--cc-card-w)',
                  height: 'var(--cc-card-h)',
                  marginLeft: 'calc(var(--cc-card-w) * -0.5)',
                  marginTop: 'calc(var(--cc-card-h) * -0.5)'
                }} className="circular-carousel__card-wrapper">
                <div
                  ref={element => {
                    cardRefs.current[index] = element;
                  }}
                  className="circular-carousel__card"
                  style={{ position: 'relative', width: '100%', height: '100%', left: 0, top: 0, margin: 0 }}`;

  const targetEnd = `                  {layout.backfaces && tiles.map(tile => renderTile(item, tile, true, index))}
                </div>
              ))}`;
              
  const replacementEnd = `                  {layout.backfaces && tiles.map(tile => renderTile(item, tile, true, index))}
                </div>
                </ElectricBorder>
              ))}`;

  content = content.replace(target, replacement);
  content = content.replace(targetEnd, replacementEnd);
  
  fs.writeFileSync(file, content);
  console.log('CircularCarousel wrapped');
}

wrapCircularCarousel();
