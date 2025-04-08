import React from 'react';
import { usePalette, PaletteProvider } from './contexts/PaletteContext';

function TestConsumer() {
  const paletteContext = usePalette();
  
  return (
    <div>
      <h2>Palette Context Test</h2>
      <p>Palette Size: {paletteContext.palette.length}</p>
      <button onClick={paletteContext.generatePalette}>Generate Palette</button>
    </div>
  );
}

export default function ContextTest() {
  return (
    <PaletteProvider>
      <TestConsumer />
    </PaletteProvider>
  );
}