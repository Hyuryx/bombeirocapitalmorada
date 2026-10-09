const fs = require('fs');
const lines = fs.readFileSync('C:/Users/ErreJota/.gemini/antigravity-ide/brain/6d869bb0-a7a0-4a9d-98c3-4cf78a51b42e/.system_generated/steps/474/content.md', 'utf8').split('\n');
let j = lines.findIndex(l => l.startsWith('{'));
const json = JSON.parse(lines.slice(j).join('\n'));
let code = json.files[0].content;

code = code.replace(
  'src?: string;',
  'src?: string | React.ReactNode;'
);

code = code.replace(
  'src?: string;',
  'src?: string | React.ReactNode;'
);

code = code.replace(
  '<img\n          src={src as string}\n          alt="aceternity logo"\n          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"\n        />',
  `{typeof src === 'string' ? (
          <img
            src={src}
            alt="aceternity logo"
            className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full rounded-lg overflow-hidden bg-[#272729]">
            {src}
          </div>
        )}`
);

fs.mkdirSync('src/components/ui', { recursive: true });
fs.writeFileSync('src/components/ui/macbook-scroll.tsx', code);
