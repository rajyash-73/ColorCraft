import { usePalette } from "@/contexts/PaletteContext";
import { Toaster } from "@/components/ui/toaster";

function SimpleTestComponent() {
  const { palette, generatePalette } = usePalette();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Palette Test</h1>
      <div className="mb-4">
        <p>Palette size: {palette.length}</p>
      </div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generatePalette}
      >
        Generate Palette
      </button>
      
      <div className="mt-8 flex gap-4">
        {palette.map((color, index) => (
          <div 
            key={index}
            className="w-20 h-20 rounded-md flex items-center justify-center"
            style={{ backgroundColor: color.hex }}
          >
            <span className="text-xs px-2 py-1 bg-white bg-opacity-70 rounded">
              {color.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <SimpleTestComponent />
      <Toaster />
    </div>
  );
}

export default App;
