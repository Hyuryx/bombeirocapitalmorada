const fs = require('fs');

function wrapBento() {
  const file = 'src/components/ui/MagicBento.jsx';
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import ElectricBorder')) {
    content = content.replace("import './MagicBento.css';", "import './MagicBento.css';\nimport ElectricBorder, { getBorderColor } from './ElectricBorder';");
  }

  // Inside the loop that renders ParticleCard
  // <ParticleCard key={index} ...> {content} </ParticleCard>
  // We want to replace it with <ElectricBorder color={getBorderColor(baseClassName)} borderRadius={16}><ParticleCard ...>{content}</ParticleCard></ElectricBorder>
  
  const target1 = `<ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onItemClick={() => onItemClick && onItemClick(index)}
              >
                {content}
              </ParticleCard>`;
              
  const replacement1 = `<ElectricBorder color={getBorderColor(baseClassName)} borderRadius={16} key={index}>
              <ParticleCard
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onItemClick={() => onItemClick && onItemClick(index)}
              >
                {content}
              </ParticleCard>
            </ElectricBorder>`;

  content = content.replace(target1, replacement1);

  const target2 = `return (
            <div
              key={index}
              {...cardProps}`;
  
  const replacement2 = `return (
            <ElectricBorder color={getBorderColor(baseClassName)} borderRadius={16} key={index} style={{ height: '100%' }}>
            <div
              {...cardProps}`;
              
  const target3 = `                {content}
              </div>
            </div>
          );`;
          
  const replacement3 = `                {content}
              </div>
            </div>
            </ElectricBorder>
          );`;

  content = content.replace(target2, replacement2);
  content = content.replace(target3, replacement3);

  fs.writeFileSync(file, content);
  console.log('MagicBento wrapped');
}

function wrapBounceCards() {
  const file = 'src/components/BounceCards.jsx';
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import ElectricBorder')) {
    content = content.replace("import './BounceCards.css';", "import './BounceCards.css';\nimport ElectricBorder, { getBorderColor } from './ui/ElectricBorder';");
  }

  // Replace <div className={`bounce-card-container ... with <ElectricBorder>
  const target = `<div
            key={index}
            className={\`bounce-card-container \${additionalClass}\`}`;
            
  const replacement = `<ElectricBorder color={getBorderColor(additionalClass)} borderRadius={16} key={index}>
            <div
            className={\`bounce-card-container \${additionalClass}\`}`;
            
  const targetEnd = `          </div>
        );
      })}`;
      
  const replacementEnd = `          </div>
          </ElectricBorder>
        );
      })}`;
      
  content = content.replace(target, replacement);
  content = content.replace(targetEnd, replacementEnd);
  
  fs.writeFileSync(file, content);
  console.log('BounceCards wrapped');
}

wrapBento();
wrapBounceCards();
